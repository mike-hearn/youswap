import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import styles from './styles';

const YoutubeControls = React.createClass({
  mixins: [PureRenderMixin],
  togglePlayPause: function togglePlayPause() {
    const playStatus = this.props.playStatus;
    // If it's paused, stopped or unstarted - play it
    if ([-1, 2, 5].indexOf(playStatus) > -1) {
      this.props.changePlayingStatus(1);
      // If it's playing, pause it
    } else if (playStatus === 1) {
      this.props.changePlayingStatus(2);
    }
  },
  render: function render() {
    return (
      <div className={styles.container}>
        <button className={styles.playButton} onClick={this.togglePlayPause}>Toggle Play</button>
      </div>
    );
  }
});

export default YoutubeControls;
