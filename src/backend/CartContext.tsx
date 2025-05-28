import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc,query,where,onSnapshot} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useAuth } from './AuthContext';

export interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartContextProps {
  productos: ProductoCarrito[];
  addToCart: (producto: ProductoCarrito) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (id: string, cantidad: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps>({
  productos: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  updateQuantity: async () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);

  useEffect(() => {
    if (!user) {
      setProductos([]);
      return;
    }

    const productosRef = collection(db, 'carritos', user.uid, 'productos');

    const unsubscribe = onSnapshot(productosRef, (snapshot) => {
      const carritoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ProductoCarrito, 'id'>)
      }));
      setProductos(carritoData);
    }, (error) => {
      console.error("Error escuchando cambios del carrito:", error);
    });

    return () => unsubscribe();

  }, [user]);

  const addToCart = async (producto: ProductoCarrito) => {
    if (!user) return;

    const productosRef = collection(db, 'carritos', user.uid, 'productos');
    const q = query(productosRef, where('id', '==', producto.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const currentCantidad = (docSnap.data().cantidad || 0) as number;
      const docRef = doc(db, 'carritos', user.uid, 'productos', docSnap.id);
      await updateDoc(docRef, { cantidad: currentCantidad + producto.cantidad });
    } else {
      await addDoc(productosRef, producto);
    }
  };

  const removeFromCart = async (id: string) => {
    if (!user) return;
    try {
      const productosRef = collection(db, 'carritos', user.uid, 'productos');
      const q = query(productosRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = doc(db, 'carritos', user.uid, 'productos', docId);
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error("Error eliminando producto del carrito:", error);
    }
  };

  const updateQuantity = async (id: string, cantidad: number) => {
    if (!user) return;
    if (cantidad < 1) return;
    try {
      const productosRef = collection(db, 'carritos', user.uid, 'productos');
      const q = query(productosRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = doc(db, 'carritos', user.uid, 'productos', docId);
        await updateDoc(docRef, { cantidad });
      }
    } catch (error) {
      console.error("Error actualizando cantidad del carrito:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      const productosRef = collection(db, 'carritos', user.uid, 'productos');
      const snapshot = await getDocs(productosRef);
      const promises = snapshot.docs.map(docItem =>
        deleteDoc(doc(db, 'carritos', user.uid, 'productos', docItem.id))
      );
      await Promise.all(promises);
    } catch (error) {
      console.error("Error limpiando carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ productos, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
