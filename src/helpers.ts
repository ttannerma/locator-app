import L from 'leaflet';

export const decodeBase64 = (encodedStr: string) => {
  try {
    // Decode the base64 string to readable text
    const decoded = atob(encodedStr);
    return decoded;
  } catch (error) {
    console.error('Error decoding base64:', error);
  }
};

export const readStream = async (res: Response) => {
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

export const fetchLocations = async () => {
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

  const jsonData = JSON.parse(streamData);

  if (jsonData.message) {
    const decodedMessage = decodeBase64(jsonData.message);
    const decodedMessageInJson = JSON.parse(decodedMessage ?? '');

    if (decodedMessageInJson && decodedMessageInJson.length > 0) {
      return decodedMessageInJson;
    }
  }
};

export const getDistanceFromUser = (
  entityLocation: State.Location,
  userLocation?: State.Location
) => {
  if (!userLocation) {
    return null;
  }
  const entityLoc = L.latLng(entityLocation.lat, entityLocation.long);
  const userLoc = L.latLng(userLocation.lat, userLocation.long);
  const distance = entityLoc.distanceTo(userLoc);
  return (distance / 1000).toFixed(2);
};

export const getSortedLocationsByUserDistance = (
  locations: State.Location[],
  userLocation?: State.Location
) => {
  if (!userLocation) {
    return [];
  }

  const copy = [...locations];

  return copy.sort(
    (a, b) =>
      Math.floor(Number(getDistanceFromUser(a, userLocation))) -
      Math.floor(Number(getDistanceFromUser(b, userLocation)))
  );
};
