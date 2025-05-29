import React, { useState } from "react";
import {IonPage,IonContent,IonInput,IonButton,IonLabel,IonCheckbox,IonAlert,} from "@ionic/react";
import {createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,OAuthProvider,} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../backend/firebaseConfig";
import HeaderHome from "../components/HeaderHome";
import { useHistory } from "react-router-dom";
import { eye, eyeOff } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import "./Register.css";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [googleMessage, setGoogleMessage] = useState("");
  const [facebookMessage, setFacebookMessage] = useState("");
  const [microsoftMessage, setMicrosoftMessage] = useState("");

  const history = useHistory();

  const handleRegister = async () => {
    if (
      !nombres ||
      !apellidos ||
      !fechaNacimiento ||
      !departamento ||
      !ciudad ||
      !correo ||
      !celular ||
      !password
    ) {
      setAlertHeader("Error");
      setAlertMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowAlert(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setAlertHeader("Error");
      setAlertMessage("El formato del email es incorrecto.");
      setIsSuccess(false);
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertHeader("Error");
      setAlertMessage("La contraseña debe tener al menos 6 caracteres.");
      setIsSuccess(false);
      setShowAlert(true);
      return;
    }

    if (!terminosAceptados) {
      setAlertHeader("Advertencia");
      setAlertMessage("Debes aceptar los términos y condiciones.");
      setIsSuccess(false);
      setShowAlert(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombres,
        apellidos,
        fechaNacimiento,
        departamento,
        ciudad,
        correo,
        celular,
        uid: user.uid,
        fecha_registro: new Date(),
        proveedor: "correo",
      });

      await auth.signOut();

      setAlertHeader("¡Éxito!");
      setAlertMessage("¡Usuario registrado con éxito!");
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error: any) {
      console.error("Error al registrar:", error);
      setAlertHeader("Error");
      setAlertMessage(`Error: ${error.message}`);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          nombres: user.displayName?.split(" ")[0] || "",
          apellidos: user.displayName?.split(" ").slice(1).join(" ") || "",
          correo: user.email || "",
          celular: "",
          ciudad: "",
          departamento: "",
          fechaNacimiento: "",
          uid: user.uid,
          fecha_registro: new Date(),
          proveedor: "google",
        });
      }

      setAlertHeader("¡Éxito!");
      setAlertMessage("¡Registro con Google exitoso!");
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("Inicio de sesión con Google cancelado por el usuario.");
        setGoogleMessage("Inicio de sesión con Google cancelado.");
        return;
      }

      console.error("Error en Google Sign-in:", error);
      setAlertHeader("Advertencia");
      setAlertMessage("Cerraste la ventana para iniciar con Google. Inténtalo nuevamente.");
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleFacebookRegister = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          nombres: user.displayName?.split(" ")[0] || "",
          apellidos: user.displayName?.split(" ").slice(1).join(" ") || "",
          correo: user.email || "",
          celular: "",
          ciudad: "",
          departamento: "",
          fechaNacimiento: "",
          uid: user.uid,
          fecha_registro: new Date(),
          proveedor: "facebook",
        });
      }

      setAlertHeader("¡Éxito!");
      setAlertMessage("¡Registro con Facebook exitoso!");
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("Inicio de sesión con Facebook cancelado por el usuario.");
        setFacebookMessage("Inicio de sesión con Facebook cancelado.");
        return;
      }

      console.error("Error en Facebook Sign-in:", error);
      setAlertHeader("Advertencia");
      setAlertMessage("Cerraste la ventana para iniciar con Facebook. Inténtalo nuevamente.");
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleMicrosoftRegister = async () => {
    const provider = new OAuthProvider("microsoft.com");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "usuarios", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          nombres: user.displayName?.split(" ")[0] || "",
          apellidos: user.displayName?.split(" ").slice(1).join(" ") || "",
          correo: user.email || "",
          celular: "",
          ciudad: "",
          departamento: "",
          fechaNacimiento: "",
          uid: user.uid,
          fecha_registro: new Date(),
          proveedor: "microsoft",
        });
      }

      setAlertHeader("¡Éxito!");
      setAlertMessage("¡Registro con Microsoft exitoso!");
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("Inicio de sesión con Microsoft cancelado por el usuario.");
        setMicrosoftMessage("Inicio de sesión con Microsoft cancelado.");
        return;
      }

      console.error("Error en Microsoft Sign-in:", error);
      setAlertHeader("Advertencia");
      setAlertMessage("Cerraste la ventana para iniciar con Microsoft. Inténtalo nuevamente.");
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="register-content" style={{ padding: "1rem" }}>
        <HeaderHome />

        <div className="register-container">
          <div className="register-form">
            <h2>
              ¡Comienza a hacer parte de <br />
              la comunidad <span className="highlight">peluda</span>!
            </h2>

            <IonInput
              className="register-input"
              placeholder="  Nombres"
              value={nombres}
              onIonChange={(e) => setNombres(e.detail.value!)}
            />
            <IonInput
              className="register-input"
              placeholder="  Apellidos"
              value={apellidos}
              onIonChange={(e) => setApellidos(e.detail.value!)}
            />
            <IonLabel className="fech">Fecha de nacimiento</IonLabel>
            <IonInput
              className="register-input"
              type="date"
              value={fechaNacimiento}
              onIonChange={(e) => setFechaNacimiento(e.detail.value!)}
            />
            <IonInput
              className="register-input"
              placeholder="  Departamento"
              value={departamento}
              onIonChange={(e) => setDepartamento(e.detail.value!)}
            />
            <IonInput
              className="register-input"
              placeholder="  Ciudad"
              value={ciudad}
              onIonChange={(e) => setCiudad(e.detail.value!)}
            />
            <IonInput
              className="register-input"
              placeholder="  Correo electrónico"
              type="email"
              value={correo}
              onIonChange={(e) => setCorreo(e.detail.value!)}
            />
            <IonInput
              className="register-input"
              placeholder="  Celular"
              type="tel"
              value={celular}
              onIonChange={(e) => setCelular(e.detail.value!)}
            />
            <div className="password-container">
              <IonInput
                className="register-input password-input"
                placeholder="  Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
              <IonCheckbox
                checked={terminosAceptados}
                onIonChange={(e) => setTerminosAceptados(e.detail.checked)}
              />
              <IonLabel style={{ marginLeft: "0.5rem" }}>
                <a href="#">He leído y acepto términos y condiciones</a>
              </IonLabel>
            </div>

            <IonButton className="submit-button" onClick={handleRegister}>
              ENVIAR
            </IonButton>

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <IonLabel className="divider-text">o regístrate con</IonLabel>
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src="/src/assets/google.jpg"
                  alt="Google"
                  style={{ width: "40px", cursor: "pointer" }}
                  onClick={handleGoogleRegister}
                />
                <img
                  src="/src/assets/facebook1.jpg"
                  alt="Facebook"
                  style={{ width: "40px", cursor: "pointer" }}
                  onClick={handleFacebookRegister}
                />
                <img
                  src="/src/assets/microsoft.png"
                  alt="Microsoft"
                  style={{ width: "40px", cursor: "pointer" }}
                  onClick={handleMicrosoftRegister}
                />
              </div>
              {googleMessage && (
                <IonLabel color="warning" style={{ display: "block", marginTop: "0.5rem" }}>
                  {googleMessage}
                </IonLabel>
              )}
              {facebookMessage && (
                <IonLabel color="warning" style={{ display: "block", marginTop: "0.5rem" }}>
                  {facebookMessage}
                </IonLabel>
              )}
              {microsoftMessage && (
                <IonLabel color="warning" style={{ display: "block", marginTop: "0.5rem" }}>
                  {microsoftMessage}
                </IonLabel>
              )}
            </div>
          </div>

          <div className="register-image">
            <img src="/src/assets/perrito.png" alt="Perrito" />
          </div>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            if (isSuccess) {
              history.push("/login");
            }
          }}
          header={alertHeader}
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
