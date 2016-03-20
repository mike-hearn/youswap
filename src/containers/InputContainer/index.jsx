import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import VideoInputBox from '../../components/VideoInputBox';
import YoutubeThumbnail from '../../components/YoutubeThumbnail';
import styles from './styles.css';

const InputContainer = React.createClass({
  render: function render() {
    return (
      <div className={styles.normal}>
        <p>Search For Your {
          this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)
        }</p>
        <VideoInputBox
          type={this.props.type}
          fetchSearchResults={this.props.fetchSearchResults}
        />
        <YoutubeThumbnail
          thumbnail={this.props.thumbnail}
          title={this.props.title}
        />
      </div>
    );
  }
});

export default InputContainer;
