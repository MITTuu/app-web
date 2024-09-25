import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import CustomMarker from "./CustomMarker";

class MapView extends React.Component {
  render() {
    const { position } = this.props;

    return (
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker position={position}></CustomMarker>
      </MapContainer>
    );
  }
}

export default MapView;