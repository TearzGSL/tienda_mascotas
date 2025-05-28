import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../backend/firebaseConfig';
import { useParams } from 'react-router-dom';
import './CupcakeDetail.css';

import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

interface Producto {
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
          setProducto(doc.data() as Producto);
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
                  <IonButton color="primary" shape="round">COMPRAR</IonButton>
                  <span className="price">${producto.precio.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default CupcakeDetail;
