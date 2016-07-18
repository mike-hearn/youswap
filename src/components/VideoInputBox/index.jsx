import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import styles from './styles';

const VideoInputBox = React.createClass({
  propTypes: {
    fetchSearchResults: React.PropTypes.func,
    type: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],
  fetchSearchResults: function fetchSearchResults(q) {
    const videoOrAudio = this.props.type;
    this.props.fetchSearchResults(q, videoOrAudio);
  },
  render: function render() {
    function displayIcon(type) {
      return (type === 'video') ?
        <img className={styles.icon} src="https://f001.backblaze.com/file/testbucket-ymq8ddaa/video-camera-icon.svg" /> :
        <img className={styles.icon} src="https://f001.backblaze.com/file/testbucket-ymq8ddaa/audio-icon.svg" />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {displayIcon(this.props.type)}
          <input
            className={styles.input}
            type="text"
            ref="video_textbox"
            onChange={this.fetchSearchResults}
            placeholder={this.props.search}
          />
        </div>
        <p>{this.props.title ? this.props.title : `Search for ${this.props.type} track`}</p>
      </div>
    );
  }
});

export default VideoInputBox;
