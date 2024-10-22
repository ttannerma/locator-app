import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getDistanceFromUser, readStream } from '../helpers';

interface Props {
  location: State.Location;
}

const EntityMarker = ({ location }: Props) => {
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
  }, [userLocation]);

  return (
    <div
      style={{
        border: '1px solid black',
      }}
    >
      <p>Id: {location.id}</p>
      {entityDetails && (
        <Fragment>
          <p>Name: {entityDetails.name}</p>
          <p>
            Distance to user: {getDistanceFromUser(location, userLocation)} km
          </p>
          <img src={entityDetails.image} width="50" height="50" />
        </Fragment>
      )}
    </div>
  );
};

export default EntityMarker;
