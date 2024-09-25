import L from "leaflet";
import iconUrl from "../../assets/img/icon.svg";

export const IconLocation = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconUrl,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});