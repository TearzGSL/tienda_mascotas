import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonText
} from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Sucursales.css';
import HeaderHome from "../components/HeaderHome";
import FooterHome from '../components/FooterHome';

interface StoreData {
  [key: string]: string[];
}

const storeCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Tienda Centro': { lat: 4.60971, lng: -74.08175 },
  'Tienda Norte': { lat: 4.67677, lng: -74.04835 },
  'Tienda Sur': { lat: 4.60971, lng: -74.15 },
  'Tienda Principal': { lat: 4.43889, lng: -75.23221 },
  'Tienda Centro Comercial': { lat: 4.438, lng: -75.232 },
  'Tienda Poblado': { lat: 6.21015, lng: -75.57239 },
  'Tienda Envigado': { lat: 6.17546, lng: -75.59496 },
  'Tienda Norte (Barranquilla)': { lat: 10.96854, lng: -74.78132 },
  'Tienda Centro (Barranquilla)': { lat: 10.96854, lng: -74.80325 },
};

const storeAddresses: { [key: string]: string } = {
  'Tienda Centro': 'Cra. 7 #12-34, Bogotá',
  'Tienda Norte': 'Calle 120 #10-15, Bogotá',
  'Tienda Sur': 'Av. Caracas #45-60 Sur, Bogotá',
  'Tienda Principal': 'Calle 60 #6-21, Ibagué',
  'Tienda Centro Comercial': 'Centro Comercial Multicentro, Ibagué',
  'Tienda Poblado': 'Calle 10 #43A-45, Medellín',
  'Tienda Envigado': 'Carrera 43 #30 Sur-15, Envigado',
  'Tienda Norte (Barranquilla)': 'Cra. 46 #82-50, Barranquilla',
  'Tienda Centro (Barranquilla)': 'Cra. 45 #30-50, Barranquilla',
};

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Sucursales: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [extraInfo, setExtraInfo] = useState<string>('');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestStore, setNearestStore] = useState<string>('');

  const cities: string[] = ['Bogotá', 'Ibagué', 'Medellín', 'Barranquilla'];

  const stores: StoreData = {
    Bogotá: ['Tienda Centro', 'Tienda Norte', 'Tienda Sur'],
    Ibagué: ['Tienda Principal', 'Tienda Centro Comercial'],
    Medellín: ['Tienda Poblado', 'Tienda Envigado'],
    Barranquilla: ['Tienda Norte (Barranquilla)', 'Tienda Centro (Barranquilla)'],
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no es soportada por tu navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        findNearestStore(coords);
      },
      (error) => {
        alert('Error al obtener la ubicación: ' + error.message);
      }
    );
  };

  const getDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestStore = (userLocation: { lat: number; lng: number }) => {
    let minDistance = Infinity;
    let closestStore = '';

    Object.entries(storeCoordinates).forEach(([storeName, coords]) => {
      const dist = getDistance(userLocation, coords);
      if (dist < minDistance) {
        minDistance = dist;
        closestStore = storeName;
      }
    });

    setNearestStore(closestStore);
  };

  const handleCityChange = (event: CustomEvent) => {
    const city = event.detail.value;
    setSelectedCity(city);
    setSelectedStore('');
    setExtraInfo('');
  };

  const handleStoreChange = (event: CustomEvent) => {
    const store = event.detail.value;
    setSelectedStore(store);
    setExtraInfo(storeAddresses[store] || '');
  };

  const openGoogleMaps = () => {
    if (selectedStore && storeCoordinates[selectedStore]) {
      const { lat, lng } = storeCoordinates[selectedStore];
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <IonPage>
        <HeaderHome />
      <IonContent>
        <div className="store-locator-section">
          <div className="content-wrapper">
            <div className="header-content">
              <h1 className="main-title">
                ESTAMOS A TU LADO. ENCUENTRA AQUÍ TU TIENDA MÁS CERCANA.
              </h1>
              <p className="description">
                Encuentra nuestras tiendas disponibles en Bogotá, Ibagué, Medellín y Barranquilla. 
                Seguiremos creciendo con nuevas aperturas en el área y en el resto del país. 
                A través de nuestra página web también podrás comprar a todo el país.
              </p>
            </div>

            <div className="selectors-container">
              <div className="selector-wrapper">
                <IonItem className="custom-select-item" lines="none">
                  <IonSelect
                    value={selectedCity}
                    placeholder="Selecciona tu ciudad"
                    onIonChange={handleCityChange}
                    interface="popover"
                    className="custom-select"
                  >
                    {cities.map((city) => (
                      <IonSelectOption key={city} value={city}>
                        {city}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>

              <div className="selector-wrapper">
                <IonItem 
                  className={`custom-select-item ${!selectedCity ? 'disabled' : ''}`}
                  lines="none"
                >
                  <IonSelect
                    value={selectedStore}
                    placeholder="Selecciona tu tienda"
                    onIonChange={handleStoreChange}
                    interface="popover"
                    className="custom-select"
                    disabled={!selectedCity}
                  >
                    {selectedCity && stores[selectedCity]?.map((store) => (
                      <IonSelectOption key={store} value={store}>
                        {store}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>

              <div className="selector-wrapper">
                <IonItem
                  className={`custom-select-item address-button ${!extraInfo ? 'disabled' : ''}`}
                  lines="none"
                  button={!!extraInfo}
                  detail={false}
                  onClick={() => {
                    if (extraInfo) openGoogleMaps();
                  }}
                >
                  <IonInput
                    value={extraInfo}
                    readonly
                    className="custom-select"
                    placeholder="Dirección de la tienda"
                  />
                </IonItem>
              </div>

              <div className="selector-wrapper">
                <IonButton expand="block" onClick={handleGetLocation}>
                  Encontrar tienda más cercana a mí
                </IonButton>
              </div>

              {userCoords && (
                <div className="location-info-container">
                  <IonText className="location-info">
                    <p>
                      <span className="label-text">Tu ubicación:</span>{' '}
                      <span className="value-text">Lat {userCoords.lat.toFixed(4)}, Lng {userCoords.lng.toFixed(4)}</span>
                    </p>
                    {nearestStore && (
                      <p>
                        <span className="label-text">Tienda más cercana:</span>{' '}
                        <span className="value-text">{nearestStore}</span>
                      </p>
                    )}
                  </IonText>
                </div>
              )}

              {userCoords && (
                <div className="map-container">
                  <MapContainer
                    center={[userCoords.lat, userCoords.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[userCoords.lat, userCoords.lng]} icon={customIcon}>
                      <Popup>Estás aquí</Popup>
                    </Marker>

                    {nearestStore && storeCoordinates[nearestStore] && (
                      <Marker
                        position={[
                          storeCoordinates[nearestStore].lat,
                          storeCoordinates[nearestStore].lng
                        ]}
                        icon={customIcon}
                      >
                        <Popup>{nearestStore}</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterHome />
      </IonContent>
    </IonPage>
  );
};

export default Sucursales;

