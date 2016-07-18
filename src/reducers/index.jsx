import { fromJS } from 'immutable';
import {
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  CHANGE_PLAYING_STATUS,
  SAVE_CLIP_DURATION,
} from '../actions';

const initialVideoId = 'C-u5WLJ9Yk4';
const initialAudioId = 'ThlhSnRk21E';
const initialState = fromJS({
  videoSearchLabel: 'Britney Spears - ...Baby One More Time',
  audioSearchLabel: 'DMX - Ruff Ryders Anthem',
  videoId: initialVideoId,
  audioId: initialAudioId,
  videoTitle: 'Search for a video track',
  audioTitle: 'Search for an audio track',
  playStatus: 2,
});

function reducer(state = initialState, action) {
  let returnState;

  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return state.merge({
        videoSearchLabel: 'Search for a video track',
        audioSearchLabel: 'Search for an audio track',
      });

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

    case SAVE_CLIP_DURATION:
      if (action.clipType === "video") {
         returnState = state.merge({ clipVideoDuration: action.duration });
      } else {
        returnState = state.merge({ clipAudioDuration: action.duration });
      }
      return returnState;

    default:
      return state;
  }
}

export default reducer;
