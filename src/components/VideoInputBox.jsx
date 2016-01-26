import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const VideoInputBox = React.createClass({
  propTypes: {
    fetchSearchResults: React.PropTypes.func,
    type: React.PropTypes.string,
  },
  mixins: [PureRenderMixin],
  fetchSearchResults: function fetchSearchResults(q) {

    // Stop if the video is currently playing
    Object.keys(this.props.players).map(
      (key) => this.props.players[key].stopVideo()
    );

    const videoOrAudio = this.props.type;
    this.props.fetchSearchResults(q, videoOrAudio);
  },
  render: function render() {
    return (
      <div>
        <input
          type="text"
          ref="video_textbox"
          onChange={this.fetchSearchResults}
          placeholder={'Search for an ' + this.props.type + ' track'}
        />
      </div>
    );
  }
});

export default VideoInputBox;
