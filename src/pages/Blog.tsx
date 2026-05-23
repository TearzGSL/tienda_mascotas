import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './Blog.css';
import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

import usuario from '../assets/usuario.png';
import perfil1 from '../assets/perropastel.jpg';
import perfil2 from '../assets/perrogalletas.jpg';

const Blog: React.FC = () => {
  const comentarios = [
    {
      id: 1,
      nombre: 'Jonathan Díaz',
      tiempo: '5 meses ago',
      estrellas: 5,
      titulo: 'Excelente producto',
      texto: 'A mi mascota le encantan estas galletas porque son muy crujientes y saludables.',
      fotoPerfil: usuario,
      fotoMascota: perfil1
    },
    {
      id: 2,
      nombre: 'Sara Ruiz',
      tiempo: '7 meses ago',
      estrellas: 5,
      titulo: 'Excelente producto',
      texto: 'Rocky los cumplió muy feliz gracias a dulcemente de pelos.',
      fotoPerfil: usuario,
      fotoMascota: perfil2
    }
  ];

  return (
    <IonPage>
      <HeaderHome />
      <IonContent className="fondo-blanco" fullscreen>
        <div className="contenedor-central">
          <h2 className="titulo">Blog De Nuestros Clientes</h2>

          <div className="tabs">
            <span className="tab activo">Comentarios</span>
            <span className="tab">Calificar Producto</span>
          </div>

          <div className="comentarios">
            {comentarios.map((c) => (
              <div key={c.id} className="comentario-card">
                <div className="contenido-comentario">
                  <div className="usuario-info">
                    <img src={c.fotoPerfil} alt="Perfil" className="avatar" />
                    <div>
                      <p className="nombre">{c.nombre} <span className="tiempo">{c.tiempo}</span></p>
                      <div className="estrellas">
                        {'★'.repeat(c.estrellas)}{'☆'.repeat(5 - c.estrellas)}
                      </div>
                      <p className="titulo-comentario">{c.titulo}</p>
                      <p className="texto-comentario">{c.texto}</p>
                    </div>
                  </div>
                  <img src={c.fotoMascota} alt="Mascota" className="imagen-mascota" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='footer-separado'>
          <FooterHome />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Blog;