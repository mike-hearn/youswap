import {fromJS} from 'immutable';
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_PLAYER,
} from '../actions';

const initialVideoId = 'NkVsJGl5d6E';
const initialAudioId = 'ThlhSnRk21E';
const initialState = fromJS({
  ytVideoObject: {},
  ytAudioObject: {},
  videoSearch: 'Mandy Moore - Candy',
  audioSearch: 'DMX - Rough Riders',
  videoId: 'NkVsJGl5d6E',
  audioId: 'ThlhSnRk21E',
  videoThumbnail: `https://i.ytimg.com/vi/${initialVideoId}/mqdefault.jpg`,
  audioThumbnail: `https://i.ytimg.com/vi/${initialAudioId}/mqdefault.jpg`,
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
