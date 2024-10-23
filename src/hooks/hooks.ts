import { useEffect } from 'react';
import { readStream, decodeBase64 } from '../helpers/helpers';
import { useDispatch } from 'react-redux';
import { update } from '../redux/locationsSlice';

/**
 * Fetches locations and adds them to redux state.
 */
export const useGetAndSetLocations = (url: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
        });

        if (!res.body) {
          return;
        }

        const streamData = await readStream(res);

        if (!streamData) {
          return;
        }

        const jsonData = JSON.parse(streamData);

        if (jsonData.message) {
          const decodedMessage = decodeBase64(jsonData.message);
          const decodedMessageInJson = JSON.parse(decodedMessage ?? '');

          if (decodedMessageInJson && decodedMessageInJson.length > 0) {
            dispatch(update(decodedMessageInJson));
          }
        }
      } catch (err) {
        console.log('error:', err);
      }
    };

    fetchData();
  }, [dispatch, url]);
};
