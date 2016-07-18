import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import YoutubeVideo from '../../components/YoutubeVideo';
import YoutubeControls from '../../components/YoutubeControls';
import VideoAudioInputContainer from '../../containers/VideoAudioInputContainer';

import '../../shared/styles';
import styles from './styles';

import '../../static/youswap-logo.svg'

const App = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function getInitialState() {
    return {
      ytPlayer: {}
    };
  },
  componentDidMount: function componentDidMount() {
    document.title = 'YouSwap - Tagline';
  },
  setPlayerObject: function setPlayerObject(object, type) {
    const ytPlayer = this.state.ytPlayer;
    ytPlayer[type] = object;
    this.setState({ ytPlayer });
  },
  render: function render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>
          { <img className={styles.titleImage} src="https://f001.backblaze.com/file/testbucket-ymq8ddaa/youswap-logo.svg" /> }
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
          setPlayerObject={this.setPlayerObject}
          setClipDuration={this.props.setClipDuration}
          muted
        />
        <YoutubeVideo
          type="audio"
          width="100%"
          height="0"
          videoId={this.props.audioId}
          playStatus={this.props.playStatus}
          changePlayingStatus={this.props.changePlayingStatus}
          setPlayerObject={this.setPlayerObject}
          setClipDuration={this.props.setClipDuration}
        />
        <YoutubeControls
          videoPlayer={this.props.ytVideoObject}
          audioPlayer={this.props.ytAudioObject}
          playStatus={this.props.playStatus}
          changePlayingStatus={this.props.changePlayingStatus}
          clipVideoDuration={this.props.clipAudioDuration}
          clipAudioDuration={this.props.clipAudioDuration}
          ytPlayer={this.state.ytPlayer}
        />
      </div>
    );
  }
});

export default App;
