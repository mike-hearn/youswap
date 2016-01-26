import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const YoutubeVideo = React.createClass({
  mixins: [PureRenderMixin],
  togglePlayPause: function() {
    const players = [this.props.players.video, this.props.players.audio];

    // If cued, play
    if (this.props.players.video.getPlayerState() === 5) {
      players.map(p => p.playVideo());
    }

    // If playing, pause
    if (this.props.players.video.getPlayerState() === 1) {
      players.map(p => p.pauseVideo());
    }

    // If paused, play
    if (this.props.players.video.getPlayerState() === 2) {
      players.map(p => p.playVideo());
    }
  },
  render: function() {
    return (
      <div>
        <button onClick={this.togglePlayPause}>Toggle Play</button>
        <button>Restart</button>
      </div>
    );
  }
});

export default YoutubeVideo;
