import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import L, { LatLngExpression } from 'leaflet';

type Location = {
  id: number;
  lat: number;
  long: number;
};

interface Props {
  location: Location;
}

const EntityMarker = ({ location }: Props) => {
  const [entityDetails, setEntityDetails] = useState<any>(null);

  const { userLocation } = useSelector((state: RootState) => state.locations);

  console.log('entityDetails', entityDetails);

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

  const readStream = async (res: Response) => {
    const reader = res?.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let done = false;

    if (!reader) {
      return null;
    }

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      result += decoder.decode(value, { stream: true });
    }
    return result;
  };

  const getDistanceFromUser = () => {
    if (!userLocation) {
      return null;
    }
    const entityLoc = L.latLng(location.lat, location.long);
    const userLoc = L.latLng(userLocation.lat, userLocation.long);
    const distance = entityLoc.distanceTo(userLoc);
    return (distance / 1000).toFixed(2);
  };

  useEffect(() => {
    fetchEntityDetails(location.id);
  }, []);

  return (
    <div
      style={{
        border: '1px solid black',
      }}
    >
      <p>Id: {location.id}</p>
      {entityDetails && (
        <>
          <p>Name: {entityDetails.name}</p>
          <p>Distance to user: {getDistanceFromUser()} km</p>
          <img src={entityDetails.image} width="50" height="50" />
        </>
      )}
    </div>
  );
};

export default EntityMarker;
