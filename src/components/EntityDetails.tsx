import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getDistanceFromUser, readStream } from '../helpers/helpers';

interface Props {
  location: State.Location;
  nth: number;
}

const EntityDetails = ({ location, nth }: Props) => {
  const [entityDetails, setEntityDetails] =
    useState<State.EntityDetails | null>(null);

  const { userLocation } = useSelector((state: RootState) => state.locations);

  /**
   * Fetches entity details by id and updates the data to component state.
   * @param id entity id
   * @returns void
   */
  const fetchEntityDetails = async (id: number) => {
    const res = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${id}.json`,
      {
        method: 'GET',
      }
    );

    if (res.body) {
      const streamData = await readStream(res);

      if (!streamData) {
        return null;
      }
      const JsonEntityData = JSON.parse(streamData);

      setEntityDetails(JsonEntityData);
    }

    return null;
  };

  useEffect(() => {
    fetchEntityDetails(location.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {entityDetails && (
        <div className="entity-details-wrapper">
          <div className="entity-details-image-wrapper">
            <p className="nth">{`${nth + 1}.`}</p>
            <img
              src={entityDetails.image}
              width="50"
              height="50"
              className="entity-image"
            />
          </div>
          <div>
            <p className="bold">{entityDetails.name}</p>
            <p>
              Distance from user: {getDistanceFromUser(location, userLocation)}
              &nbsp;km
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityDetails;
