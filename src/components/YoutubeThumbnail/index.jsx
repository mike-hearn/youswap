import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import styles from './styles';

const YoutubeThumbnail = React.createClass({
  mixins: [PureRenderMixin],
  render: function render() {
    return (
      <div className={styles.container}>
        <img
          className={styles.ytThumbnail}
          src={this.props.thumbnail}
        />
      </div>
    );
  }
});

export default YoutubeThumbnail;
