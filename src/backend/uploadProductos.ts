import { doc, setDoc } from "firebase/firestore";
import { db } from "../backend/firebaseConfig";

export const agregarProductosConId = async () => {
  const productos = [
    {
      id: 2,
      data: {
        nombre: "Cupcakes",
        descripcion: "Los cupcakes para perros y gatos son una opción más pequeña y práctica para consentir a las mascotas con un postre saludable. Al igual que los pasteles, se elaboran con ingredientes naturales y seguros, como harina de avena, plátano, manzana, pollo o salmón, dependiendo del sabor. Están diseñados para ser fácilmente digeribles y pueden decorarse con cremas naturales a base de yogur o mantequilla de maní sin azúcar. Estos bocadillos son ideales para premiar a las mascotas en ocasiones especiales o como un regalo ocasional, ya que aportan sabor y nutrición sin riesgos para su salud.",
        imagen: "https://i.postimg.cc/fyvWdSBT/cupcakes.jpg", 
        nuevo: true,
        rating: 0,
        precio: 25000
      }
    },
    {
      id: 3,
      data: {
        nombre: "Galletas caseritas",
        descripcion: "Las galletas para perros y gatos son snacks crujientes y saludables que pueden utilizarse como premios o recompensas en el entrenamiento. Se elaboran con ingredientes naturales como harina de avena, zanahoria, calabaza, pollo o atún, dependiendo de la variante. No contienen conservantes artificiales ni azúcares añadidos, lo que las hace seguras para el consumo frecuente. Su textura crujiente ayuda a la salud dental de las mascotas, contribuyendo a la limpieza de sus dientes mientras disfrutan de un sabor delicioso. Algunas versiones incluyen ingredientes funcionales, como cúrcuma o linaza, para beneficiar la digestión y el pelaje",
        imagen: "https://i.postimg.cc/85c7wmnY/galletas.jpg",
        nuevo: false,
        rating: 0,
        precio: 15000
      }
    },
    {
      id: 4,
      data: {
        nombre: "Gomitas de colágeno",
        descripcion: "Las gomitas de colágeno para perros y gatos son suplementos masticables diseñados para mejorar la salud de la piel, el pelaje y las articulaciones de las mascotas. Están formuladas con colágeno hidrolizado, que ayuda a fortalecer las articulaciones y mantener la elasticidad de la piel. Además, pueden incluir ingredientes como biotina, omega-3 y vitamina E, que favorecen un pelaje brillante y fuerte. Su textura blanda y su sabor atractivo hacen que sean fáciles de consumir incluso para mascotas de edad avanzada o con problemas dentales. Son una excelente opción para mantener la movilidad y la salud general de perros y gatos de todas las edades",
        imagen: "https://i.postimg.cc/m2fQZKn2/gomas.jpg", 
        nuevo: false,
        rating: 0,
        precio: 20000
      }
    }
  ];

  try {
    for (const producto of productos) {
      await setDoc(
        doc(db, "productos", producto.id.toString()),
        producto.data
      );
      console.log(`Producto ${producto.data.nombre} agregado con ID: ${producto.id}`);
    }
  } catch (error) {
    console.error("Error al agregar productos:", error);
  }
};
