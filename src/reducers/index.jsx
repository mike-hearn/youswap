import {fromJS} from 'immutable';
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_PLAYER,
} from '../actions';

const initialVideoID = 'WwBdNXt6wO4';
const initialState = fromJS({
  // TODO: Initialize the ytVideoObject here? (2016-03-20 12:00:43)
  ytVideoObject: {},
  ytAudioObject: {},
  videoSearch: 'Mandy Moore - Candy',
  audioSearch: 'DMX - Rough Riders',
  videoId: initialVideoID,
  audioId: initialVideoID,
  videoThumbnail: `https://i.ytimg.com/vi/${initialVideoID}/mqdefault.jpg`,
  audioThumbnail: `https://i.ytimg.com/vi/${initialVideoID}/mqdefault.jpg`,
});

function reducer(state = initialState, action) {
  let returnState;

  switch (action.type) {
  case REQUEST_SEARCH_RESULTS:
    return state;

  case RECEIVE_SEARCH_RESULTS:
    if (action.videoOrAudio === 'video') {
      returnState = state.merge({
        'videoTitle': action.title,
        'videoId': action.videoId,
        'videoThumbnail': action.videoThumbnail,
      });
    } else {
      returnState = state.merge({
        'audioTitle': action.title,
        'audioId': action.videoId,
        'audioThumbnail': action.videoThumbnail,
      });
    }
    return returnState;

  case SET_PLAYER:
    if (action.videoOrAudio === 'video') {
      returnState = state.set('ytVideoObject', action.ytObject);
    } else {
      returnState = state.set('ytAudioObject', action.ytObject);
    }
    return returnState;

  default:
    return state;
  }
}

export default reducer;
