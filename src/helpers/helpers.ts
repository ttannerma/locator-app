import L from 'leaflet';

/**
 * Decodes base64 string to string format
 * @param encodedStr
 * @returns decoded string
 */
export const decodeBase64 = (encodedStr: string) => {
  try {
    const decoded = atob(encodedStr);
    return decoded;
  } catch (error) {
    console.error('Error decoding base64:', error);
  }
};

/**
 * Reads stream and returns it in string format
 * @param res Response object from API
 * @returns decoded stream in string format
 */
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

/**
 * GETs locations from API, decodes it and returns the decoded message in JSON
 * @returns Decoded message in JSON
 */
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

/**
 * Gets distance between user and entity
 * @param entityLocation
 * @param userLocation
 * @returns Distance in kilometers with two decimals
 */
export const getDistanceFromUser = (
  entityLocation: State.Location,
  userLocation?: State.Location
) => {
  if (!userLocation) {
    return null;
  }
  const entityLoc = L.latLng(entityLocation.lat, entityLocation.long);
  const userLoc = L.latLng(userLocation.lat, userLocation.long);
  const distance = entityLoc.distanceTo(userLoc); // distance in meters
  return (distance / 1000).toFixed(2); // convert to kilometers with two decimals
};

/**
 * Sort locations by users distance
 * @param locations entity locations
 * @param userLocation
 * @returns sorted locations
 */
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
