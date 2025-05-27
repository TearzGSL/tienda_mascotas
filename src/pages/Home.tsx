import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderHome from '../components/HeaderHome';
import FooterHome from '../components/FooterHome'; // Importa el Footer
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage style={{ backgroundColor: '#FBE587' }}>
      <IonHeader>
        <IonToolbar style={{ padding: 0, minHeight: 'auto' }}>
          <HeaderHome />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ backgroundColor: '#ffffff' }}>
        <ExploreContainer />
        <FooterHome /> {/* Aquí se agrega el footer */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
