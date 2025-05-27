import React from 'react';
import './FooterHome.css';

const FooterHome: React.FC = () => {
  return (
    <footer className="footer-container">
      {/* Sección Superior */}
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/src/assets/logo.png" alt="Logo DulceMente de Pelos" className="footer-logo-large" />
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Nosotros</h4>
            <ul>
              <li><a href="#">DOP Colombia</a></li>
              <li><a href="#">Beneficios</a></li>
              <li><a href="#">Sucursales</a></li>
              <li><a href="#">Plan de Fidelidad DOP</a></li>
              <li><a href="#">Trabaja con Nosotros</a></li>
            </ul>
            <h5>Visita también</h5>
            <ul>
              <li><a href="#">DOP armario</a></li>
              <li><a href="#">Blog DOP</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Tienda online</h4>
            <ul>
              <li><a href="#">Ofertas</a></li>
              <li><a href="#">Tarjeta Regalo</a></li>
              <li><a href="#">Formas de Entrega</a></li>
              <li><a href="#">Hub de tutoriales</a></li>
              <li><a href="#">Envío Programado</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#">Adopciones</a></li>
              <li><a href="#">Colegio y Hotel Canino</a></li>
              <li><a href="#">Baño y Peluquería</a></li>
              <li><a href="#">Hotel Miau</a></li>
              <li><a href="#">Pequeño aliado médico</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Políticas</h4>
            <ul>
              <li><a href="#">Aviso de privacidad</a></li>
              <li><a href="#">Políticas De Envío</a></li>
              <li><a href="#">Cambios y Devoluciones</a></li>
              <li><a href="#">Garantías De Productos</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">TyC dinámicas Comerciales</a></li>
              <li><a href="#">TyC Tarjetas Regalo</a></li>
              <li><a href="#">TyC del plan de fidelidad</a></li>
              <li><a href="#">TyC Rappi</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección Media - Métodos de pago */}
      <div className="footer-middle">
        <span>¡Haz tus compras con estos Medios de Pago!</span>
        <div className="payment-logos">
          <img src="/src/assets/visa.jpg" alt="Visa" />
          <img src="/src/assets/mastercard.png" alt="Mastercard" />
          <img src="/src/assets/americanexpress.png" alt="American Express" />
          <img src="/src/assets/pse.png" alt="PSE" />
          <img src="/src/assets/nequi.jpg" alt="Nequi" />
          <img src="/src/assets/mercadopago.png" alt="Mercado Pago" />
        </div>
        <span>Pago 100% seguros con Mercado Pago</span>
      </div>

      {/* Sección Inferior */}
      <div className="footer-bottom">
        <div className="footer-bottom-logo">
          <img src="/src/assets/logo.png" alt="Logo pequeño" className="footer-logo-small" />
        </div>
        <div className="footer-bottom-links">
          <a href="#">Responsabilidad Social</a>
          <a href="#">Nosotros</a>
          <a href="#">Contáctanos</a>
        </div>
        <div className="footer-social-icons">
        <a href="https://www.instagram.com/dulcemente_depelos?igsh=MXdwNGxpZGZ3cnB5ZA==" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/instagram.png" alt="Instagram" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/facebook.png" alt="Facebook" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/youtube.png" alt="YouTube" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/tiktok.png" alt="TikTok" />
        </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;