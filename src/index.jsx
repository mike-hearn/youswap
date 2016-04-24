import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { bindActionCreators, createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './containers/App';
import * as actions from './actions';
import reducer from './reducers';


function mapStateToProps(state) {
  return {
    videoTitle: state.get('videoTitle'),
    audioTitle: state.get('audioTitle'),
    videoId: state.get('videoId'),
    audioId: state.get('audioId'),
    playStatus: state.get('playStatus'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('app')
);

