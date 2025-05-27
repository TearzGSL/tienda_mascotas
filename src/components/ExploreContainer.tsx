import React from 'react';
import './ExploreContainer.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../backend/AuthContext';

const ExploreContainer: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  return (
    <div className="home-body">
      <div className="bienvenida">
        <h1>
          {user ? `Bienvenido, ${user.displayName || user.email}` : 'Bienvenido'}
        </h1>
        <p>Gracias por visitarnos 🐾</p>
      </div>
      <div className="row">
        <div className="col">
          <div className="pata-container">
            <img
              src="/src/assets/huella.jpg"
              alt="Pata decorativa"
              className="pata-img"
            />
          </div>
        </div>

        <div className="col">
          <div className="cachorro-container">
            <img
              src="/src/assets/perrito.png"
              alt="Cachorro saludando"
              className="cachorro-img"
            />
          </div>
        </div>
      </div>
      <div className="botones-container">
        <button className="boton" onClick={() => history.push('/productos')}>
          Comprar
        </button>
        <button className="boton" onClick={() => history.push('/sobrenosotros')}>
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ExploreContainer;
