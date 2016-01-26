import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import VideoInputBox from '../../components/VideoInputBox.jsx';
import YoutubeThumbnail from '../../components/YoutubeThumbnail.jsx';
import styles from './styles.css';

const InputContainer = React.createClass({
  render: function() {
    return (
      <div styles={styles.normal}>
        <p>
          Input Your {
            this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)
          }
        </p>
        <VideoInputBox
          type={this.props.type}
          fetchSearchResults={this.props.fetchSearchResults}
          players={this.props.players}
        />
        <YoutubeThumbnail
          thumbnail={this.props.thumbnail}
        />
      </div>
    );
  }
});

export default InputContainer;
