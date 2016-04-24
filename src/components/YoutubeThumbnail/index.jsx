import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import styles from './styles';

const YoutubeThumbnail = React.createClass({
  mixins: [PureRenderMixin],
  render: function render() {
    return (
      <div className={styles.container}>
        <div className={styles.gradientOverlay} />
        <img
          className={styles.ytThumbnail}
          src={this.props.thumbnail}
        />
        <p className={styles.ytTitle}>{this.props.title}</p>
      </div>
    );
  }
});

export default YoutubeThumbnail;
