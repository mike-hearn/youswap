import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import YouTubeIframeLoader from 'youtube-iframe';

import styles from './styles.scss';

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

    switch (playStatus) {
      case 1: // Playing state
        player.playVideo();
        this.props.setClipDuration(player.getDuration(), this.props.type);
        break;
      case 2: // Paused state
        player.pauseVideo();
        break;
      case 6: // Custom state meaning a new video has been selected
        player.cueVideoById(this.props.videoId);
        break;
      case 0: // Custom state meaning a new video has been selected
        player.stopVideo();
        break;
      default:
        break;
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
  initializeYtObject: function initializeYtObject() {
    const props = this.props;
    const handlePlayerStateChange = this.handlePlayerStateChange;

    const onPlayerReady = (event) => {
      event.target.setVolume((props.muted) ? 0 : 100);
      this.ytPlayerObject = event.target;
      this.props.setPlayerObject(event.target, this.props.type);
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
          'controls': 0,
        },
      });
    });
  },
  handlePlayerStateChange: function handleStateChange() {
    let playerState = this.ytPlayerObject.getPlayerState();

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
