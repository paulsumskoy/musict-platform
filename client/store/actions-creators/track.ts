import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('/api/tracks');
      console.log({ response });
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: e,
      });
    }
  };
};
