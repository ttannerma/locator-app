import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EntityMarker from './EntityMarker';
import { useGetAndSetLocations } from '../hooks';
import { getSortedLocationsByUserDistance } from '../helpers';

const LocationList = () => {
  const { locations, userLocation } = useSelector(
    (state: RootState) => state.locations
  );

  useGetAndSetLocations(
    'https://aseevia.github.io/star-wars-frontend/data/secret.json'
  );

  const sortedLocations = getSortedLocationsByUserDistance(
    locations,
    userLocation
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        border: '1px solid red',
      }}
    >
      {userLocation &&
        sortedLocations.map((loc) => (
          <EntityMarker location={loc} key={`entity_marker_${loc.id}`} />
        ))}
    </div>
  );
};

export default LocationList;
