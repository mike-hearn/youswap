import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import VideoInputBox from '../../components/VideoInputBox';
import YoutubeThumbnail from '../../components/YoutubeThumbnail';

import styles from './styles';

const InputContainer = React.createClass({
  render: function render() {
    return (
      <div className={styles.normal}>
        <YoutubeThumbnail
          thumbnail={`https://i.ytimg.com/vi/${this.props.youtubeId}/mqdefault.jpg`}
          title={this.props.title}
        />
        <VideoInputBox
          type={this.props.type}
          fetchSearchResults={this.props.fetchSearchResults}
        />
      </div>
    );
  }
});

export default InputContainer;
