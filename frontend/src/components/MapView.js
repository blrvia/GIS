import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const categoryColors = {
  X: '#1f78b4',
  Y: '#33a02c',
  Z: '#e31a1c',
  J: '#ff7f00',
  K: '#6a3d9a',
  L: '#b15928',
  M: '#a6cee3',
  N: '#b2df8a',
  O: '#fb9a99',
  P: '#fdbf6f',
  Q: '#cab2d6',
  R: '#ffff99',
};

const MapView = ({ parcels }) => {
  if (!parcels) return null;

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    let popupContent = `<b>Survey No:</b> ${props.survey_no}<br/>
                        <b>Category:</b> ${props.category}<br/>
                        <b>Department:</b> ${props.department_id}`;
    layer.bindPopup(popupContent);
  };

  const style = (feature) => ({
    fillColor: categoryColors[feature.properties.category] || '#888',
    weight: 1,
    color: 'black',
    fillOpacity: 0.6,
  });

  return (
    <MapContainer
      style={{ height: '600px', width: '100%' }}
      center={[19.076, 72.8777]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      <GeoJSON data={parcels} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default MapView;

