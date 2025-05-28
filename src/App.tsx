import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SobreNosotros from './pages/SobreNosotros';
import Blog from './pages/Blog';
import Productos from './pages/Productos';
import Sucursales from './pages/Sucursales';
import AdminTools from './backend/AdminTools';
import CupcakeDetail from './products/CupcakeDetail'; 
import PrivateRoute from './backend/PrivateRoute';
import Carrito from './pages/Carrito';
import Pagar from './pages/Pagar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/sobrenosotros">
          <SobreNosotros />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route exact path="/productos">
          <Productos />
        </Route>
        <Route exact path="/sucursales">
          <Sucursales />
        </Route>
        <Route exact path="/admin">
          <AdminTools />
        </Route>
        <Route exact path="/producto/:slug">
          <CupcakeDetail />
        </Route>
        <PrivateRoute exact path="/carrito" component={Carrito} />
        <PrivateRoute exact path="/pagar" component={Pagar} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
