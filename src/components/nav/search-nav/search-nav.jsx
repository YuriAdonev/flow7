import React from 'react';

import './search-nav.scss';

import Logo from "../logo/logo";
import ModalLeft from "../../modal-left/modal-left";

const SearchNav = ({ onSearchClose, searchOpen }) => {

  return (
    <ModalLeft
      onModalClose={onSearchClose}
      isOpen={searchOpen}
      title="Поиск по системе"
    >
      <div className="search-nav">
        <input type="text" className="search-nav__input" placeholder="Что ищем?"/>
        <div className="search-nav-result">
          <div className="search-nav-result__category">СВАРЩИКИ</div>
          <div className="search-nav-result__wrap">
            <div className="search-nav-result__item">Константинов Константин Константинович</div>
          </div>
        </div>
        <div className="search-nav-objects-construction">
          <div className="search-nav-objects-construction__category">ОБЪЕКТЫ СТРОИТЕЛЬСТВА</div>
          <div className="search-nav-objects-construction__wrap">
            <div className="search-nav-objects-construction__item">"Северо-Европейский газопровод. Участок км 788,0 - км 859,2" в составе стройки «Развитие газотранспортных мощностей ЕСГ Северо-Западного региона, участок Грязовец – КС "Славянская» (СЕГ-III</div>
          </div>
        </div>
      </div>
    </ModalLeft>
  );
};

export default SearchNav;
