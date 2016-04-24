import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import YoutubeVideo from '../../components/YoutubeVideo';
import YoutubeControls from '../../components/YoutubeControls';
import VideoAudioInputContainer from '../../containers/VideoAudioInputContainer';

import '../../shared/styles';
import styles from './styles';

const App = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function componentDidMount() {
    document.title = 'YouSwap - Tagline';
  },
  render: function render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>
          { <img className={styles.titleImage} src="http://localhost:8081/Youswap%20Heading%20Logo.svg" /> }
        </h1>
        <p className={styles.subtitle}>Combine video from one clip with audio from another.</p>
        <VideoAudioInputContainer {...this.props} />
        <YoutubeVideo
          type="video"
          width="100%"
          height="360"
          videoId={this.props.videoId}
          playStatus={this.props.playStatus}
          changePlayingStatus={this.props.changePlayingStatus}
          muted
        />
        <YoutubeVideo
          type="audio"
          width="100%"
          height="0"
          videoId={this.props.audioId}
          playStatus={this.props.playStatus}
          changePlayingStatus={this.props.changePlayingStatus}
        />
        <YoutubeControls
          videoPlayer={this.props.ytVideoObject}
          audioPlayer={this.props.ytAudioObject}
          playStatus={this.props.playStatus}
          changePlayingStatus={this.props.changePlayingStatus}
        />
      </div>
    );
  }
});

export default App;
