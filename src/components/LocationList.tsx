import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EntityDetails from './EntityDetails';
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
      }}
    >
      {userLocation &&
        sortedLocations.map((loc, i) => (
          <EntityDetails
            location={loc}
            nth={i}
            key={`entity_details_${loc.id}`}
          />
        ))}
    </div>
  );
};

export default LocationList;
