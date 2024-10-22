import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { update } from '../redux/locationsSlice';
const LocationList = () => {
  const locations = useSelector((state: RootState) => state.locations);
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

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      result += decoder.decode(value, { stream: true });
    }

    // Parse the result string into JSON
    const jsonData = JSON.parse(result);

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

  return <div>{}</div>;
};

export default LocationList;
