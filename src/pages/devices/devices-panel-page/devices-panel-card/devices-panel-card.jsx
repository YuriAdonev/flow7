import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './devices-panel-card.scss';

const DevicesPanelCard = () => {
  const [currentTab, setCurrentTab] = useState('amperage');


  return (
    <div className="devices-panel-card">
      <div className="devices-panel-card__title">Устройство на линии 1</div>
      <div className="devices-panel-card__subtitle">
        <div className="devices-panel-card__status devices-panel-card__status--online"/>
        <div className="devices-panel-card__desc">Регистратор СП</div>
      </div>
      <div className="devices-panel-card__triggers">
        <div
          className={`devices-panel-card-trigger devices-panel-card-trigger__amperage${currentTab === 'amperage' ? ' active' : ''}`}
          onClick={() => setCurrentTab('amperage')}
        >Ток</div>
        <div
          className={`devices-panel-card-trigger devices-panel-card-trigger__voltage${currentTab === 'voltage' ? ' active' : ''}`}
          onClick={() => setCurrentTab('voltage')}
        >Напряжение</div>
        <div
          className={`devices-panel-card-trigger devices-panel-card-trigger__wire${currentTab === 'wire' ? ' active' : ''}`}
          onClick={() => setCurrentTab('wire')}
        >Проволка</div>
        <div
          className={`devices-panel-card-trigger devices-panel-card-trigger__gas${currentTab === 'gas' ? ' active' : ''}`}
          onClick={() => setCurrentTab('gas')}
        >Газ</div>
      </div>
      <div className="devices-panel-card__tabs">
        <div className={`devices-panel-card-tab${currentTab === 'amperage' ? ' active' : ''}`}>
          <div className="devices-panel-card-tab__chart">График тока</div>
          <div className="devices-panel-card-tab-info">
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">34м 12с</div>
              <div className="devices-panel-card-tab-info__desc">Время работы с 00:00</div>
            </div>
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">Активное</div>
              <div className="devices-panel-card-tab-info__desc">Текущее состояние</div>
            </div>
          </div>
          <div className="devices-panel-card-tab__footer">
            <Link to="/devices/38202010" className="devices-panel-card-tab__more" >
              Подробнее
            </Link>
          </div>
        </div>
        <div className={`devices-panel-card-tab${currentTab === 'voltage' ? ' active' : ''}`}>
          <div className="devices-panel-card-tab__chart">График напряжения</div>
          <div className="devices-panel-card-tab-info">
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">34м 12с</div>
              <div className="devices-panel-card-tab-info__desc">Время работы с 00:00</div>
            </div>
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">Активное</div>
              <div className="devices-panel-card-tab-info__desc">Текущее состояние</div>
            </div>
          </div>
          <div className="devices-panel-card-tab__footer">
            <Link to="/devices/38202010" className="devices-panel-card-tab__more" >
              Подробнее
            </Link>
          </div>
        </div>
        <div className={`devices-panel-card-tab${currentTab === 'wire' ? ' active' : ''}`}>
          <div className="devices-panel-card-tab__chart">График проволоки</div>
          <div className="devices-panel-card-tab-info">
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">342</div>
              <div className="devices-panel-card-tab-info__desc">Событий с 00:00</div>
            </div>
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">34,2</div>
              <div className="devices-panel-card-tab-info__desc">метра</div>
            </div>
          </div>
          <div className="devices-panel-card-tab__footer">
            <Link to="/devices/38202010" className="devices-panel-card-tab__more" >
              Подробнее
            </Link>
          </div>
        </div>
        <div className={`devices-panel-card-tab${currentTab === 'gas' ? ' active' : ''}`}>
          <div className="devices-panel-card-tab__chart">График газа</div>
          <div className="devices-panel-card-tab-info">
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">34м 12с</div>
              <div className="devices-panel-card-tab-info__desc">Время работы с 00:00</div>
            </div>
            <div className="devices-panel-card-tab-info__item">
              <div className="devices-panel-card-tab-info__value">Активное</div>
              <div className="devices-panel-card-tab-info__desc">Текущее состояние</div>
            </div>
          </div>
          <div className="devices-panel-card-tab__footer">
            <Link to="/devices/38202010" className="devices-panel-card-tab__more" >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesPanelCard;
