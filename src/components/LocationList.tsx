import { useEffect, useState } from 'react';

const LocationList = () => {
  const [locations, setLocations] = useState([]);

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
        setLocations(decodedMessageInJson);
      }
    }
  };

  useEffect(() => {
    fetchLocations();
  });

  return <div>{}</div>;
};

export default LocationList;
