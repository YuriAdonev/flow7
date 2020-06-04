import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = ({ headerData }) => {
  const { breadcrumbsList = [], title, buttonsList = [], dropList = [], noBottomLine = false } = headerData;

  const breadcrumbs = breadcrumbsList.map((item) => {
    return (
      <li
        key={item.name}
        className="header-breadcrumbs__item"
      >
        <Link to={item.link}>{item.name}</Link>
      </li>
    )
  });

  const buttons = buttonsList.map((item) => {
    return (
      <button
        key={item.text}
        className="header__btn btn"
        onClick={() => item.action()}
      >{item.text}</button>
    )
  });

  const drops = () => {
    if (dropList.length > 0) {
      return (
        <div className="header__drop drop">
          <button className="drop__btn btn" type="button">
            <svg width="18" height="6" viewBox="0 0 18 6" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.59375 1.59375C8 1.1875 8.46875 0.984375 9 0.984375C9.53125 0.984375 10 1.1875 10.4062 1.59375C10.8125 2 11.0156 2.46875 11.0156 3C11.0156 3.53125 10.8125 4 10.4062 4.40625C10 4.8125 9.53125 5.01562 9 5.01562C8.46875 5.01562 8 4.8125 7.59375 4.40625C7.1875 4 6.98438 3.53125 6.98438 3C6.98438 2.46875 7.1875 2 7.59375 1.59375ZM13.5938 1.59375C14 1.1875 14.4688 0.984375 15 0.984375C15.5312 0.984375 16 1.1875 16.4062 1.59375C16.8125 2 17.0156 2.46875 17.0156 3C17.0156 3.53125 16.8125 4 16.4062 4.40625C16 4.8125 15.5312 5.01562 15 5.01562C14.4688 5.01562 14 4.8125 13.5938 4.40625C13.1875 4 12.9844 3.53125 12.9844 3C12.9844 2.46875 13.1875 2 13.5938 1.59375ZM1.59375 1.59375C2 1.1875 2.46875 0.984375 3 0.984375C3.53125 0.984375 4 1.1875 4.40625 1.59375C4.8125 2 5.01562 2.46875 5.01562 3C5.01562 3.53125 4.8125 4 4.40625 4.40625C4 4.8125 3.53125 5.01562 3 5.01562C2.46875 5.01562 2 4.8125 1.59375 4.40625C1.1875 4 0.984375 3.53125 0.984375 3C0.984375 2.46875 1.1875 2 1.59375 1.59375Z"/>
            </svg>
          </button>
          <div className="drop__list"></div>
        </div>
      )
    }
    return '';
  };

  return (
    <header className={`header${noBottomLine ? ' no-bottom-line' : ''}`}>
      <div className="header__wrap">
        <div className="header__info">
          {/* <ul className="header-breadcrumbs">
            {breadcrumbs}
          </ul> */}
          <h2 className="header__title">{title}</h2>
        </div>
        <div className="header__actions">
          {buttons}
          {drops()}
        </div>
      </div>
    </header>
  );
};

export default Header;
