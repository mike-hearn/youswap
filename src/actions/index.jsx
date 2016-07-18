import fetch from 'isomorphic-fetch';

export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const CHANGE_PLAYING_STATUS = 'CHANGE_PLAYING_STATUS';
export const SAVE_CLIP_DURATION = 'SAVE_CLIP_DURATION';

export function requestSearchResults(query) {
  return {
    type: REQUEST_SEARCH_RESULTS,
    query
  };
}

export function receieveSearchResults(query, json, videoOrAudio) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    query,
    videoOrAudio,
    title: json.items[0].snippet.title,
    videoId: json.items[0].id.videoId,
  };
}

export function changePlayingStatus(newStatus) {
  return {
    type: CHANGE_PLAYING_STATUS,
    newStatus
  };
}

export function fetchSearchResults(q, videoOrAudio) {
  const query = q.target.value;
  return dispatch => {
    dispatch(requestSearchResults(query));
    return fetch(`https://content.googleapis.com/youtube/v3/search?maxResults=5&part=snippet&q=${query}&type=video&videoEmbeddable=true&key=AIzaSyCxAlFNYB1nJZA0MofWcHEuHGdCNqM_yhI`)
    .then(response => response.json())
    .then(json => dispatch(receieveSearchResults(query, json, videoOrAudio)));
  };
}

export function setClipDuration(duration, clipType) {
  return {
    type: SAVE_CLIP_DURATION,
    duration,
    clipType
  };
}
