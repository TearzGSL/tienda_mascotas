import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import './Productos.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../backend/firebaseConfig'; 

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  nuevo: boolean;
  rating: number;
  precio: number;
  slug: string;
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="stars" aria-label={`Rating: ${rating} de 5 estrellas`}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="#FACC15" />
      ))}
      {hasHalf && <FaStarHalfAlt key="half-star" color="#FACC15" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#FACC15" />
      ))}
    </div>
  );
};

const Productos: React.FC = () => {
  const history = useHistory();
  const [productos, setProductos] = useState<Producto[]>([]);

  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productosData: Producto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productosData.push({
          id: doc.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          imagen: data.imagen,
          nuevo: data.nuevo,
          rating: data.rating,
          precio: data.precio,
          slug: data.slug
        });
      });

      setProductos(productosData);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleClick = (slug: string) => {
    history.push(`/producto/${slug}`);
  };

  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="productos-content">
        <h2 className="productos-title">
          Snacks para tus<br />mascotas
        </h2>
        <div className="productos-grid">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="producto-card"
              onClick={() => handleClick(producto.slug)}
              style={{ cursor: 'pointer' }}
            >
              {producto.nuevo && <span className="nuevo-label">¡Nuevo!</span>}
              <img
                src={producto.imagen}
                alt={`Imagen de ${producto.nombre}`}
                className="producto-img"
              />
              <StarRating rating={producto.rating} />
              <p className="producto-nombre">{producto.nombre}</p>
            </div>
          ))}
        </div>
        <div className="footer-separado">
          <FooterHome />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Productos;
