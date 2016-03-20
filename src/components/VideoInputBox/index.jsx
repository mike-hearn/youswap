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
    return (
      <div>
        <input
          className={styles.input}
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
