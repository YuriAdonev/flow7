import React, { Component } from 'react';
import Icon from '@atlaskit/icon';

const customGlyph = () => (
  <svg width="10" height="18" viewBox="0 0 10 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.98828 11.25V3.76172H2.01172V11.25H7.98828ZM7.98828 0.773438C8.38672 0.773438 8.73828 0.925781 9.04297 1.23047C9.34766 1.51172 9.5 1.85156 9.5 2.25V12.7617C9.5 13.1602 9.34766 13.5117 9.04297 13.8164C8.73828 14.0977 8.38672 14.2383 7.98828 14.2383H2.01172C1.61328 14.2383 1.26172 14.0977 0.957031 13.8164C0.652344 13.5117 0.5 13.1602 0.5 12.7617V2.25C0.5 1.85156 0.652344 1.5 0.957031 1.19531C1.26172 0.890625 1.61328 0.738281 2.01172 0.738281L7.98828 0.773438ZM2.01172 17.2617V15.75H7.98828V17.2617H2.01172Z"/>
  </svg>
);

class DevicesIcon extends Component {
  render() {
    return <Icon glyph={customGlyph} label="Devices icon"/>;
  }
}

export default DevicesIcon;
