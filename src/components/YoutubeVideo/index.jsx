import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import YouTubeIframeLoader from 'youtube-iframe';

import styles from './styles';

const YoutubeVideo = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    videoId: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],
  getInitialState: function getInitialState() {
    return {player: {}};
  },
  componentDidMount: function componentDidMount() {
    this.initializeYtObject();
  },
  componentDidUpdate: function componentDidUpdate() {
    const player = this.ytPlayerObject;
    const playStatus = this.props.playStatus;

    if (playStatus === 2) {
      player.pauseVideo();
    } else if (playStatus === 1) {
      player.playVideo();
    } else if (playStatus === 6) {
      this.ytPlayerObject.cueVideoById(this.props.videoId);
    }

    const playerState = player.getPlayerState();
    if (this.props.playStatus !== playerState) {
      // this.ytPlayerObject.cueVideoById(this.props.videoId);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.videoId !== this.props.videoId) {
      this.props.changePlayingStatus(6);
    }
  },
  // Initialize an empty object, which will hold the ytPlayer object upon
  // initialization.
  ytPlayerObject: {},
  initializeYtObject: function initializeYtObject() {
    const props = this.props;
    const handlePlayerStateChange = this.handlePlayerStateChange;

    const onPlayerReady = (event) => {
      event.target.setVolume((props.muted) ? 0 : 100);
      this.ytPlayerObject = event.target;
    };


    let YTPlayer = {};
    YouTubeIframeLoader.load(function newIframe(YT) {
      YTPlayer = new YT.Player(`yt_${props.type}`, {
        height: props.height,
        width: props.width,
        videoId: props.videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': handlePlayerStateChange,
        },
        playerVars: {
        },
      });
    });

    return YTPlayer;
  },
  handlePlayerStateChange: function handleStateChange() {
    let playerState = this.ytPlayerObject.getPlayerState();

    // TODO: Remove console.log statement after debugging (2016-03-26 16:46:20)
    console.log(playerState);

    if (this.props.playStatus !== playerState) {
      this.props.changePlayingStatus(playerState);
    }
  },
  render: function render() {
    const youtubeId = `yt_${this.props.type}`;
    return (
      <div className={styles.youtubePlayer}>
        <div id={youtubeId}>
        </div>
      </div>
    );
  }
});

export default YoutubeVideo;
