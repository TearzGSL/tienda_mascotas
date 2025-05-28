import { useEffect } from 'react';
import { subirProductos } from '../backend/uploadProductos'; // ajusta la ruta si es necesario

export default function CargarProductos() {
  useEffect(() => {
    subirProductos();
  }, []);

  return <div>Subiendo productos...</div>;
}