import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addUserLocation } from '../redux/locationsSlice';

/**
 * Handles setting user location when clicking map
 */
const MapEvents = () => {
  const dispatch = useDispatch();
  useMapEvents({
    click: (location) => {
      dispatch(
        addUserLocation({
          id: -1,
          lat: location.latlng.lat,
          long: location.latlng.lng,
        })
      );
    },
  });
  return null;
};

const WorldMap = () => {
  const { locations, userLocation } = useSelector(
    (state: RootState) => state.locations
  );

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: 500 }}
      >
        <MapEvents />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {userLocation &&
          locations.map((loc) => (
            <Marker position={[loc.lat, loc.long]} key={`${loc.id}`}/>

          ))}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.long]}>
            <Popup>This is you</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
