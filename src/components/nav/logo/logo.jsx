import React from 'react';
import { Link } from 'react-router-dom';

import './logo.scss';

const Logo = (props) => {
  return (
    <Link
      to="/"
      className="logo"
      onClick={() => {
        props.onMainNavItemClick('home');
        props.setShowUserAccount(false);
      }}
    >
      <svg width="40" height="40" viewBox="-8 -11 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.2 18.096H11.496V3.984H4.704V18.096H0V0H16.2V18.096Z" />
        <path d="M23.256 3.984H15.696V0H30.552L20.184 18.096H15L23.256 3.984Z" fillOpacity="0.5"/>
      </svg>
    </Link>
  );
};

export default Logo;
