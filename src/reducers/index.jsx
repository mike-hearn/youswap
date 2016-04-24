import { fromJS } from 'immutable';
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  CHANGE_PLAYING_STATUS,
} from '../actions';

const initialVideoId = 'zTs5zjSXnvs';
const initialAudioId = 'cneoivROlDo';
const initialState = fromJS({
  videoSearch: 'Mandy Moore - Candy',
  audioSearch: 'DMX - Rough Riders',
  videoId: initialVideoId,
  audioId: initialAudioId,
  playStatus: 2,
});

function reducer(state = initialState, action) {
  let returnState;

  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return state;

    case RECEIVE_SEARCH_RESULTS:
      if (action.videoOrAudio === 'video') {
        returnState = state.merge({
          videoTitle: action.title,
          videoId: action.videoId,
          videoThumbnail: action.videoThumbnail,
        });
      } else {
        returnState = state.merge({
          audioTitle: action.title,
          audioId: action.videoId,
          audioThumbnail: action.videoThumbnail,
        });
      }
      return returnState;

    case CHANGE_PLAYING_STATUS:
      return state.merge({ playStatus: action.newStatus });

    default:
      return state;
  }
}

export default reducer;
