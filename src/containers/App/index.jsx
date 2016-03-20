import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import YoutubeVideo from '../../components/YoutubeVideo';
import YoutubeControls from '../../components/YoutubeControls';
import VideoAudioInputContainer from '../../containers/VideoAudioInputContainer';

import styles from './styles.css';

const App = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function componentDidMount() {
    document.title = 'YouSwap - Tagline';
  },
  render: function render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>...</h1>
        <p>Video from one, audio from another.</p>
        <VideoAudioInputContainer {...this.props} />
        <YoutubeVideo
          player={this.props.ytVideoObject}
          type="video"
          width="640"
          height="360"
          videoId={this.props.videoId}
          setPlayer={this.props.setYtPlayer}
          muted
        />
        <YoutubeVideo
          player={this.props.ytAudioObject}
          type="audio"
          width="640"
          height="0"
          videoId={this.props.audioId}
          setPlayer={this.props.setYtPlayer}
        />
        <YoutubeControls
          videoPlayer={this.props.ytVideoObject}
          audioPlayer={this.props.ytAudioObject}
        />
      </div>
    );
  }
});

export default App;
