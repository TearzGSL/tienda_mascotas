import React, { useMemo } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
} from '@ionic/react';
import {
  addOutline,
  removeOutline,
  cartOutline,
  trashOutline,
} from 'ionicons/icons';

import HeaderHome from '../components/HeaderHome';
import FooterHome from '../components/FooterHome';

import './Carrito.css';

import { useCart } from '../backend/CartContext';
import { useAuth } from '../backend/AuthContext';
import { useHistory } from 'react-router-dom'; // ✅ Importar useHistory

const Carrito: React.FC = () => {
  const { user } = useAuth();
  const nombreUsuario = user?.displayName || user?.email || 'Invitado';

  const { productos, addToCart, removeFromCart, updateQuantity } = useCart();
  const history = useHistory(); // ✅ Hook para redirección

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

  // ✅ Redirigir al checkout
  const onPagar = () => {
    history.push('/pagar');
  };

  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="ion-padding">
        <h1 className="titulo-principal">Compras, {nombreUsuario}</h1>

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
                      <IonButton size="small" onClick={() => onDecrementar(producto.id)}>
                        <IonIcon icon={removeOutline} />
                      </IonButton>
                      <IonInput readonly value={producto.cantidad} className="quantity-input" />
                      <IonButton size="small" onClick={() => onIncrementar(producto.id)}>
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

            <IonCard>
              <IonCardContent>
                <h2>Resumen</h2>
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <h3>Total a pagar: ${subtotal.toLocaleString()}</h3>
                <IonButton expand="block" color="primary" onClick={onPagar}>
                  Pagar
                </IonButton>
              </IonCardContent>
            </IonCard>
          </>
        )}
        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default Carrito;
