var React = require('react');
var $ = require('jquery');
var YouTubeIframeLoader = require('youtube-iframe');

var InputBox = React.createClass({
  render: function render() {
    return (
      <div><input type="text" ref="videosearch" onChange={this.handleChange} /></div>
    );
  },
  handleChange: function handleChange() {
    const searchTerm = this.refs.videosearch.getDOMNode().value;
    $.ajax({
      url: 'https://content.googleapis.com/youtube/v3/search?maxResults=5&part=snippet&q=' + searchTerm + '&type=video&videoEmbeddable=true&key=AIzaSyCxAlFNYB1nJZA0MofWcHEuHGdCNqM_yhI',
      success: function success(data) {
        var videoId = data.items[0].id.videoId;
      },
    });
  },
});

var OverallControls = React.createClass({
  render: function render() {
    return (
      <div onClick={this.handleClick}>Play / Pause / Restart</div>
    );
  },
  handleClick: function handleClick() {
    var videoPlayers = this.props.videoPlayers;
    for (var key in videoPlayers) {
      if (videoPlayers.hasOwnProperty(key)) {
        videoPlayers[key].pauseVideo();
      }
    }
  },
});

var YoutubeVideo = React.createClass({
  propTypes: {
    containerName: React.PropTypes.string.isRequired,
  },
  componentDidMount: function componentDidMount() {
    var that = this;

    YouTubeIframeLoader.load(function(YT) {
      var newPlayer = new YT.Player(that.props.containerName, {
        width: '640',
        height: '390',
        videoId: that.props.videoId,
        playerVars: {
          'autoplay': 1,
        },
        events: {
          'onReady': onPlayerReady,
        },
      });

      function onPlayerReady(event) {
        if (that.props.muted === "true") {
          event.target.mute();
        }
        else {
          event.target.unMute();
          event.target.setVolume(100);
        }
      }

      that.props.videoPlayers[that.props.containerType] = newPlayer;
    });
  },
  render: function render() {
    return (
      <div>
        <InputBox videoPlayers={this.props.videoPlayers}/>
        <div id={this.props.containerName}></div>
      </div>
    );
  },
});

var YouSwapApp = React.createClass({
  getInitialState: function getInitialState() {
    return {
      videoPlayers: {
        video: {},
        audio: {},
      },
    };
  },
  render: function render() {
    return (
      <div className="row">
        <OverallControls videoPlayers={this.state.videoPlayers} />
        <h2>Video</h2>
        <YoutubeVideo
          containerName="video_container"
          containerType="video"
          videoPlayers={this.state.videoPlayers}
          videoId="M7lc1UVf-VE"
          muted="true"
        />
        <h2>Audio</h2>
        <YoutubeVideo
          containerName="audio_container"
          containerType="audio"
          videoPlayers={this.state.videoPlayers}
          videoId="M7lc1UVf-VE"
          muted="false"
        />
      </div>
    );
  },
});

module.exports = YouSwapApp;
