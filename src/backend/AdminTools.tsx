import React from "react";
import { agregarProductosConId } from "../backend/uploadProductos"; 

const AdminTools = () => {
  const handleSubirProductos = async () => {
    await agregarProductosConId();
    alert("¡Productos subidos exitosamente!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleSubirProductos}>Subir productos a Firestore</button>
    </div>
  );
};

export default AdminTools;
