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
import L from 'leaflet';
import userIconImage from '../assets/user-icon.png';
import entityIconImage from '../assets/entity-icon.png';

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

const CustomIcon = (imgPath: string) => {
  return L.Icon.extend({
    options: {
      iconUrl: imgPath,
      iconSize: [38, 40],
      iconAnchor: [22, 40],
      popupAnchor: [-3, -30],
    },
  });
};

const WorldMap = () => {
  const { locations, userLocation } = useSelector(
    (state: RootState) => state.locations
  );

  const UserIcon = CustomIcon(userIconImage);
  const EntityIcon = CustomIcon(entityIconImage);

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
            <Marker
              position={[loc.lat, loc.long]}
              icon={new EntityIcon()}
              key={`${loc.id}`}
            />
          ))}

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.long]}
            icon={new UserIcon()}
          >
            <Popup>This is you</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
