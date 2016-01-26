import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import YoutubeVideo from '../components/YoutubeVideo.jsx';
import YoutubeControls from '../components/YoutubeControls.jsx';
import InputContainer from '../containers/InputContainer';

const App = React.createClass({
  mixins: [PureRenderMixin],
  setPlayerObject: function(object, type) {
    if (type === 'video') {
      this.players.video = object;
    } else {
      this.players.audio = object;
    }
  },
  players: {
    audio: {},
    video: {}
  },
  render: function render() {
    return (
      <div>
        <h2>...</h2>
        <InputContainer
          type="video"
          fetchSearchResults={this.props.fetchSearchResults}
          thumbnail={this.props.videoThumbnail}
          players={this.players}
        />
        <InputContainer
          type="audio"
          fetchSearchResults={this.props.fetchSearchResults}
          thumbnail={this.props.audioThumbnail}
          players={this.players}
        />
        <YoutubeVideo
          player={this.players.video}
          allPlayers={this.players}
          type="video"
          width="640"
          height="360"
          videoId={this.props.videoId}
          onReady={this.setPlayerObject}
          muted
        />
        <YoutubeVideo
          player={this.players.audio}
          allPlayers={this.players}
          type="audio"
          width="640"
          height="0"
          videoId={this.props.audioId}
          onReady={this.setPlayerObject}
        />
        <YoutubeControls
          players={this.players}
        />
      </div>
    );
  }
});

export default App;
