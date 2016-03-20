import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const YoutubeControls = React.createClass({
  mixins: [PureRenderMixin],
  togglePlayPause: function() {
    const players = [this.props.videoPlayer, this.props.audioPlayer];

    // If cued, play
    if (this.props.videoPlayer.getPlayerState() === 5) {
      players.map(p => p.playVideo());
    }

    // If playing, pause
    if (this.props.videoPlayer.getPlayerState() === 1) {
      players.map(p => p.pauseVideo());
    }

    // If paused, play
    if (this.props.videoPlayer.getPlayerState() === 2) {
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

export default YoutubeControls;
