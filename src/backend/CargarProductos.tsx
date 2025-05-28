import { useEffect } from 'react';
import { subirProductos } from '../backend/uploadProductos'; 

export default function CargarProductos() {
  useEffect(() => {
    subirProductos();
  }, []);

  return <div>Subiendo productos...</div>;
}