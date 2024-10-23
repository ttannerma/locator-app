import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import EntityDetails from './EntityDetails';
import { useGetAndSetLocations } from '../hooks/hooks';
import { getSortedLocationsByUserDistance } from '../helpers/helpers';

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

  if (!userLocation) {
    return <h1 className="guide-text">Click on the map to view entities!</h1>;
  }

  return (
    <div className="entity-list-wrapper">
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
