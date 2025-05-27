import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import {
  cartOutline,
  searchOutline,
  homeOutline,
  newspaperOutline,
  locationOutline,
  personCircle,
  logOutOutline,
} from 'ionicons/icons';
import './HeaderHome.css';
import { useAuth } from '../backend/AuthContext';

const HeaderHome: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [showPopover, setShowPopover] = useState(false);
  const [event, setEvent] = useState<MouseEvent | undefined>(undefined);

  const handleLogout = async () => {
    await logout();
    setShowPopover(false);
    history.push('/login');
  };

  return (
    <div className="header-home">
      {/* Sección superior */}
      <section className="header-top-section">
        {/* Logo */}
        <div className="header-logo-container">
          <img
            src="/src/assets/logo.png"
            alt="Dulcemente ¡de pelos!"
            className="header-logo"
          />
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar alimentos, marcas, mascotas..."
            className="search-input"
          />
          <button aria-label="Buscar" className="search-button">
            <IonIcon icon={searchOutline} className="search-icon" />
          </button>
        </div>

        {/* Acciones de usuario */}
        <div className="user-actions-container">
          {/* Carrito */}
          <div className="cart-button">
            <IonIcon icon={cartOutline} className="cart-icon" />
            <span className="cart-total">$0</span>
          </div>

          {/* Si el usuario está logueado */}
          {user ? (
            <>
              <button
                onClick={(e: any) => {
                  setEvent(e.nativeEvent);
                  setShowPopover(true);
                }}
                className="auth-button"
              >
                <IonIcon icon={personCircle} className="user-icon" />
              </button>

              <IonPopover
                isOpen={showPopover}
                event={event}
                onDidDismiss={() => setShowPopover(false)}
              >
                <IonList>
                  <IonItem lines="none">
                    <IonLabel>{user.displayName || user.email}</IonLabel>
                  </IonItem>
                  <IonItem button onClick={handleLogout}>
                    <IonIcon icon={logOutOutline} slot="start" />
                    <IonLabel>Cerrar sesión</IonLabel>
                  </IonItem>
                </IonList>
              </IonPopover>
            </>
          ) : (
            <>
              <button onClick={() => history.push('/register')} className="auth-button">
                Regístrate
              </button>
              <button onClick={() => history.push('/login')} className="auth-button">
                Ingresa
              </button>
            </>
          )}
        </div>
      </section>

      {/* Barra de navegación inferior */}
      <nav className="bottom-nav">
        <ul className="nav-list">
          {[
            { label: 'Home', icon: homeOutline, href: '/home' },
            { label: 'Productos', icon: cartOutline, href: '/productos' },
            { label: 'Blog', icon: newspaperOutline, href: '/blog' },
            { label: 'Sucursales', icon: locationOutline, href: '/sucursales' },
          ].map(({ label, icon, href }) => (
            <li key={label} className="nav-item" onClick={() => history.push(href)}>
              <div className="nav-item-content">
                <IonIcon icon={icon} className="nav-icon" />
                {label}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderHome;

