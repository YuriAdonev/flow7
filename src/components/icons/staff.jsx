import React, { Component } from 'react';
import Icon from '@atlaskit/icon';

const customGlyph = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.48828 13.0117H2.76172V7H0.511719L8 0.25L15.4883 7H13.2383V13.0117H9.51172V8.51172H6.48828V13.0117Z"/>
  </svg>
);

class StaffIcon extends Component {
  render() {
    return <Icon glyph={customGlyph} label="Staff icon"/>;
  }
}

export default StaffIcon;
