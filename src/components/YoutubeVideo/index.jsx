import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';
import YouTubeIframeLoader from 'youtube-iframe';

const YoutubeVideo = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    videoId: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],
  componentDidMount: function componentDidMount() {
    this.initializeYtObject();
  },
  componentDidUpdate() {
    this.props.player.cueVideoById(this.props.videoId, 0);
  },
  initializeYtObject: function() {
    const props = this.props;

    const onPlayerReady = (event) => {
      event.target.setVolume((props.muted) ? 0 : 100);
      props.setPlayer(event.target, props.type);
    }

    YouTubeIframeLoader.load(function newIframe(YT) {
      const YTPlayer = new YT.Player(`yt_${props.type}`, {
        height: props.height,
        width: props.width,
        videoId: props.videoId,
        events: {
          'onReady': onPlayerReady,
        },
        playerVars: {
          'controls': 0
        },
      });
    });
  },
  render: function render() {
    const youtubeId = `yt_${this.props.type}`;
    return (
      <div>
        <div id={youtubeId}>
        </div>
      </div>
    );
  }
});

export default YoutubeVideo;
