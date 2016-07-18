import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import InputContainer from '../InputContainer';

import styles from './styles';

const VideoAudioInputContainer = React.createClass({
  mixins: [PureRenderMixin],
  render: function render() {
    return (
      <div className={styles.container}>
        <InputContainer
          type="video"
          fetchSearchResults={this.props.fetchSearchResults}
          youtubeId={this.props.videoId}
          title={this.props.videoTitle}
          search={this.props.videoSearchLabel}
        />
        <InputContainer
          type="audio"
          fetchSearchResults={this.props.fetchSearchResults}
          youtubeId={this.props.audioId}
          title={this.props.audioTitle}
          search={this.props.audioSearchLabel}
        />
      </div>
    );
  }
});

export default VideoAudioInputContainer;
