import React, { useState } from "react";
import {IonContent,IonInput,IonButton,IonPage,IonIcon,IonToast,IonLoading,} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import HeaderHome from "../components/HeaderHome";
import "./Login.css";
import { useHistory } from "react-router-dom";
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,} from "firebase/auth";
import { auth } from "../backend/firebaseConfig";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      history.push("/home");
    } catch (error: any) {
      setLoading(false);
      setToastMessage("Error: " + error.message);
      setShowToast(true);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
      history.push("/home");
    } catch (error: any) {
      setLoading(false);
      setToastMessage("Error con Google: " + error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">

        <HeaderHome />

        <div className="login-wrapper">
          <div className="login-box">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="login-logo"
            />
            <h2>Iniciar sesión</h2>

            <IonInput
              placeholder="Dirección de correo electrónico"
              type="email"
              className="login-input"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />

            <div className="password-wrapper">
              <IonInput
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                className="login-input"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <p
              className="forgot-password"
              style={{
                cursor: "pointer",
                color: "#007bff",
                textDecoration: "underline",
              }}
              onClick={() => history.push("/forgot-password")}
            >
              ¿Has olvidado la contraseña?
            </p>

            <IonButton expand="block" className="login-button" onClick={handleLogin}>
              INICIAR SESIÓN
            </IonButton>

            <p className="or-text">o iniciar sesión con</p>

            <div className="social-login">
              <img src="/src/assets/facebook1.jpg" alt="Facebook" />
              <img
                src="/src/assets/google.jpg"
                alt="Google"
                onClick={handleGoogleLogin}
                style={{ cursor: "pointer" }}
              />
              <img src="/src/assets/microsoft.png" alt="Microsoft" />
            </div>

            <p
              className="create-account"
              style={{
                cursor: "pointer",
                color: "#007bff",
                textDecoration: "underline",
              }}
              onClick={() => history.push("/register")}
            >
              Crear una cuenta
            </p>
          </div>
        </div>

        <IonLoading isOpen={loading} message={"Iniciando sesión..."} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;