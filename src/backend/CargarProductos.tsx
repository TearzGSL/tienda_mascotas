import { useEffect } from 'react';
import { agregarProductosConId } from '../backend/uploadProductos'; 

export default function CargarProductos() {
  useEffect(() => {
    agregarProductosConId();
  }, []);

  return <div>Subiendo productos...</div>;
}