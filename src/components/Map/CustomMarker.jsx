import React from "react";
import { Marker, Popup } from "react-leaflet";
import { IconLocation } from "./IconLocation"

class CustomMarker extends React.Component {
  render() {
    const { position } = this.props; 

    return (
      <Marker position={position} icon={IconLocation}>
          <Popup>
              Latitud: {position[0]} <br />
              Longitud: {position[1]}
          </Popup>
      </Marker>
    );
  }
}

export default CustomMarker;