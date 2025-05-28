import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../backend/firebaseConfig';
import { useParams, useHistory } from 'react-router-dom';
import './CupcakeDetail.css';

import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

import { useCart } from '../backend/CartContext';
import { useAuth } from '../backend/AuthContext';

interface Producto {
  id?: string;  // id ahora opcional
  nombre: string;
  descripcion: string;
  imagen: string;
  nuevo: boolean;
  rating: number;
  precio: number;
  slug: string;
}

const CupcakeDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        if (!slug) {
          setProducto(null);
          setLoading(false);
          return;
        }

        const q = query(collection(db, 'productos'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as Omit<Producto, 'id'>;
          setProducto({ id: doc.id, ...data });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [slug]);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    if (producto && producto.id) {
      addToCart({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      });
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    alert('Función de compra próximamente');
  };

  const renderStars = () => {
    if (!producto) return null;

    const fullStars = Math.floor(producto.rating);
    const halfStar = producto.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <IonIcon key={`full-${i}`} icon={star} color="warning" />
        ))}
        {halfStar && <IonIcon icon={starHalf} color="warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <IonIcon key={`empty-${i}`} icon={starOutline} color="warning" />
        ))}
      </>
    );
  };

  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="cupcake-detail-content">
        <div className="cupcake-main">
          {loading ? (
            <div className="loading-container">
              <IonSpinner name="crescent" />
            </div>
          ) : !producto ? (
            <p>Producto no encontrado.</p>
          ) : (
            <div className="product-detail-wrapper">
              <div className="product-card">
                {producto.nuevo && <div className="new-label">¡Nuevo!</div>}
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-image"
                  />
                )}
                <div className="star-row static">
                  {renderStars()}
                </div>
                <p className="product-title">{producto.nombre}</p>
              </div>

              <div className="product-description-container">
                <h2 className="product-heading">{producto.nombre}</h2>
                <div className="star-rating">
                  {renderStars()}
                  <span>({producto.rating})</span>
                </div>
                <p className="product-description">{producto.descripcion}</p>
                <div className="product-actions">
                  <IonButton color="primary" shape="round" onClick={handleBuyNow}>
                    Comprar
                  </IonButton>
                  <IonButton
                    color="secondary"
                    shape="round"
                    onClick={handleAddToCart}
                  >
                    Añadir al carrito
                  </IonButton>
                  <span className="price">${producto.precio.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <IonAlert
          isOpen={showLoginAlert}
          onDidDismiss={() => {
            setShowLoginAlert(false);
            history.push('/login');
          }}
          header="Atención"
          message="Debes iniciar sesión primero."
          buttons={['OK']}
        />

        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default CupcakeDetail;
