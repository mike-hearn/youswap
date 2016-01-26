import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const YoutubeThumbnail = React.createClass({
  mixins: [PureRenderMixin],
  render: function render() {
    return (
      <div>
        <img src={this.props.thumbnail} width="100" />
      </div>
    );
  }
});

export default YoutubeThumbnail;
