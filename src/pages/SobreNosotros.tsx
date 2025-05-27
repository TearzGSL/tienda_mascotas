import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './SobreNostros.css';
import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

const SobreNosotros: React.FC = () => {
  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="fondo-blanco">
        <div className="container">
          <div className="header">
            <img src="/src/assets/perros.jpg" alt="Mascotas" className="pets-image" />
            <div className="text-section">
              <h2 className="title">Dulcemente de pelos</h2>
              <p className="description">
                Encuentra nuestras tiendas disponibles en Bogotá, Ibagué,
                Medellín y Barranquilla. Seguiremos creciendo con nuevas
                sucursales para estar más cerca de todo el país. A través
                de nuestra página web también podrás comprar a todo el país.
              </p>
            </div>
          </div>

          <div className="bottom-section">
            <div className="mission">
              <h3 className="subtitle">Misión</h3>
              <p className="description">
                Encuentra nuestras tiendas disponibles en Bogotá, Ibagué,
                Medellín y Barranquilla. Seguiremos creciendo con nuevas
                sucursales para estar más cerca de todo el país. A través
                de nuestra página web también podrás comprar a todo el país.
              </p>
            </div>

            <div className="vision">
              <h3 className="subtitle">Visión</h3>
              <p className="description">
                Encuentra nuestras tiendas disponibles en Bogotá, Ibagué,
                Medellín y Barranquilla. Seguiremos creciendo con nuevas
                sucursales para estar más cerca de todo el país. A través
                de nuestra página web también podrás comprar a todo el país.
              </p>
            </div>
          </div>
        </div>
        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default SobreNosotros;
