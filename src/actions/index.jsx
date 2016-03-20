import fetch from 'isomorphic-fetch';

export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const SET_PLAYER = 'SET_PLAYER';

export function requestSearchResults(query) {
  return {
    type: REQUEST_SEARCH_RESULTS,
    query
  };
}

export function receieveSearchResults(query, json, videoOrAudio) {
  console.log(query);
  console.log(json);
  return {
    type: RECEIVE_SEARCH_RESULTS,
    query,
    videoOrAudio,
    title: json.items[0].snippet.title,
    videoId: json.items[0].id.videoId,
    videoThumbnail: json.items[0].snippet.thumbnails.medium.url,
  };
}

export function setYtPlayer(ytObject, type) {
  return {
    type: SET_PLAYER,
    ytObject,
    videoOrAudio: type,
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

