import React, { useState, useMemo } from 'react';
import {IonPage,IonContent,IonInput,IonButton} from '@ionic/react';
import { useCart } from '../backend/CartContext';
import HeaderHome from '../components/HeaderHome';
import './Pagar.css';

import visa from '../assets/visa.jpg';
import master from '../assets/mastercard.png';
import american from '../assets/americanexpress.png';
import pse from '../assets/pse.png';
import nequi from '../assets/nequi.jpg';
import mercado from '../assets/mercadopago.png';

const metodos = [
  { value: 'visa', label: 'Visa', img: visa },
  { value: 'mastercard', label: 'Mastercard', img: master },
  { value: 'amex', label: 'American Express', img: american },
  { value: 'pse', label: 'PSE', img: pse },
  { value: 'nequi', label: 'Nequi', img: nequi },
  { value: 'mercadopago', label: 'MercadoPago', img: mercado },
];

const Pagar: React.FC = () => {
  const { productos, clearCart } = useCart();
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const total = useMemo(() => {
    return productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }, [productos]);

  const handleConfirmarCompra = () => {
    if (!direccion) {
      alert('Por favor ingresa la dirección de envío');
      return;
    }
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    alert(`Compra confirmada!\nTotal: $${total.toLocaleString()}\nEnvío a: ${direccion}\nPago con: ${metodoPago}`);
    clearCart();
  };

  return (
    <IonPage>
        <HeaderHome/>
      <IonContent className="ion-padding pagar-content">
        <div className="pagar-container">
          <h1 className="titulo">Pago de pedido</h1>

          <div className="productos-lista">
            {productos.map((producto) => (
              <div className="producto-item" key={producto.id}>
                <div className="imagen-col">
                  <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
                </div>
                <div className="info-col">
                  <h2>{producto.nombre}</h2>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p>Precio unitario: ${producto.precio.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="resumen-total">
            <h2>Total a pagar: ${total.toLocaleString()}</h2>
          </div>
          <h3 className="metodo-pago-text">Seleccione su método de pago haciendo click sobre la imagen</h3>

          <div className="metodos-pago">
            {metodos.map((m) => (
              <img
                key={m.value}
                src={m.img}
                alt={m.label}
                className={`metodo-img ${metodoPago === m.value ? 'selected' : ''}`}
                onClick={() => setMetodoPago(m.value)}
              />
            ))}
          </div>

          {metodoPago && (
            <div className="direccion-form">
              <h3>Ingrese su dirección de envío</h3>
              <IonInput
                value={direccion}
                placeholder="Ej. Calle Falsa 123"
                onIonChange={(e) => setDireccion(e.detail.value!)}
              />
            </div>
          )}

          <IonButton expand="block" onClick={handleConfirmarCompra}>
            Confirmar Compra
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Pagar;
