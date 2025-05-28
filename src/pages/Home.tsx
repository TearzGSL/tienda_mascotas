import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderHome from '../components/HeaderHome';
import FooterHome from '../components/FooterHome';

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
        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default Home;
