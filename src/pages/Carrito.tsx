import React, { useMemo, useState,  useEffect, MouseEvent as ReactMouseEvent } from 'react';
import {IonPage,IonContent,IonCard,IonCardContent,IonButton,IonIcon,IonImg,IonInput,IonLabel,} from '@ionic/react';
import {addOutline,removeOutline,cartOutline,trashOutline,} from 'ionicons/icons';
import HeaderHome from '../components/HeaderHome';
import './Carrito.css';
import { useCart } from '../backend/CartContext';
import { useAuth } from '../backend/AuthContext';
import { useHistory } from 'react-router-dom';
import { db } from '../backend/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Carrito: React.FC = () => {
  const { user } = useAuth();
  const [nombreUsuario, setNombreUsuario] = useState('');


  const { productos, addToCart, removeFromCart, updateQuantity } = useCart();
  const history = useHistory();

  const subtotal = useMemo(() => {
    return productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  }, [productos]);

  const onIncrementar = (id: string) => {
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      updateQuantity(id, producto.cantidad + 1);
    }
  };

  const onDecrementar = (id: string) => {
    const producto = productos.find((p) => p.id === id);
    if (producto && producto.cantidad > 1) {
      updateQuantity(id, producto.cantidad - 1);
    }
  };

  const onEliminar = (id: string) => {
    removeFromCart(id);
  };

  const onPagar = () => {
    history.push('/pagar');
  };

  useEffect(() => {
    const fetchNombre = async () => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreUsuario(data.nombres?.trim() || 'Usuario');
        }
      }
    };
    fetchNombre();
  }, [user]);

  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="ion-padding">
        <h1 className="titulo-principal">
          Compras, <span className="usuario-nombre">{nombreUsuario}</span>
        </h1>

        {productos.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <IonIcon icon={cartOutline} style={{ fontSize: '64px', color: '#ccc' }} />
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar tu compra.</p>
          </div>
        ) : (
          <>
            {productos.map((producto) => (
              <IonCard key={producto.id}>
                <IonCardContent className="cart-item-grid">
                  <div className="left-column">
                    <IonImg src={producto.imagen} className="product-image" />
                  </div>
                  <div className="right-column">
                    <IonLabel>
                      <h2>{producto.nombre}</h2>
                      <p>
                        <strong>${producto.precio.toLocaleString()}</strong>
                      </p>
                    </IonLabel>
                    <div className="quantity-controls">
                      <IonButton size="small" color="warning" onClick={() => onDecrementar(producto.id)}>
                        <IonIcon icon={removeOutline} />
                      </IonButton>
                      <IonInput readonly value={producto.cantidad} className="quantity-input" />
                      <IonButton size="small" color="warning" onClick={() => onIncrementar(producto.id)}>
                        <IonIcon icon={addOutline} />
                      </IonButton>
                      <IonButton size="small" color="danger" onClick={() => onEliminar(producto.id)}>
                        <IonIcon icon={trashOutline} />
                      </IonButton>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
            <IonCard className="resumen-card">
              <IonCardContent>
                <div className="resumen-info">
                  <h2 className="resumen-titulo"><strong>Resumen</strong></h2>
                  <p className="resumen-texto">Subtotal: ${subtotal.toLocaleString()}</p>
                  <h3 className="resumen-total">Total a pagar: ${subtotal.toLocaleString()}</h3>
                </div>
                <IonButton className="btn-pagar" color="primary" onClick={onPagar}>
                  Pagar
                </IonButton>
              </IonCardContent>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Carrito;