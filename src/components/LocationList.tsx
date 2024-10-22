import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { update } from '../redux/locationsSlice';
import EntityMarker from './EntityMarker';

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
    const streamDataToJson = JSON.parse(streamData);

    console.log('entity details', streamDataToJson);
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

const LocationList = () => {
  const { locations, userLocation } = useSelector(
    (state: RootState) => state.locations
  );
  const dispatch = useDispatch();

  console.log('locations', locations);

  const decodeBase64 = (encodedStr: string) => {
    try {
      // Decode the base64 string to readable text
      const decoded = atob(encodedStr);
      return decoded;
    } catch (error) {
      console.error('Error decoding base64:', error);
    }
  };

  const fetchLocations = async () => {
    const res = await fetch(
      'https://aseevia.github.io/star-wars-frontend/data/secret.json',
      {
        method: 'GET',
      }
    );

    if (!res.body) {
      return;
    }

    const streamData = await readStream(res);

    if (!streamData) {
      return null;
    }

    // Parse the result string into JSON
    const jsonData = JSON.parse(streamData);

    if (jsonData.message) {
      const decodedMessage = decodeBase64(jsonData.message);
      const decodedMessageInJson = JSON.parse(decodedMessage ?? '');

      if (decodedMessageInJson && decodedMessageInJson.length > 0) {
        dispatch(update(decodedMessageInJson));
      }
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        border: '1px solid red',
      }}
    >
      {userLocation && locations.map((loc) => <EntityMarker location={loc} />)}
    </div>
  );
};

export default LocationList;
