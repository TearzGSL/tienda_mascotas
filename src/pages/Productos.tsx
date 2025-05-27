import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import './Productos.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

type Producto = {
  id: number;
  nombre: string;
  imagen: string;
  nuevo: boolean;
  rating: number;
};

const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Pastel de cumpleaños',
    imagen: '/src/assets/pastel.jpg',
    nuevo: true,
    rating: 4.5,
  },
  {
    id: 2,
    nombre: 'Cupcakes',
    imagen: '/src/assets/cupcakes.jpg',
    nuevo: true,
    rating: 0,
  },
  {
    id: 3,
    nombre: 'Galletas caseritas',
    imagen: '/src/assets/galletas.jpg',
    nuevo: false,
    rating: 0,
  },
  {
    id: 4,
    nombre: 'Gomitas de colágeno',
    imagen: '/src/assets/gomas.jpg',
    nuevo: false,
    rating: 0,
  },
];

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

  const handleClick = (id: number) => {
    history.push(`/producto/${id}`);
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
              onClick={() => handleClick(producto.id)}
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
