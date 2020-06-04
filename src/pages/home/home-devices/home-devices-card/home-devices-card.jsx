import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './home-devices-card.scss';
import {CurrentUserContext} from "../../../../contexts/current-user";
import HomeDevicesCardTab from "../home-devices-card-tab/home-devices-card-tab";

const HomeDevicesCard = ({ currentSlot, currentDevice, history }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [currentSensor, setCurrentSensor] = useState(currentSlot.sensors.find(it => it.id === currentSlot.sensors[0].id));
  const [currentSensorName, setCurrentSensorName] = useState(currentSlot.sensors[0].sensor_type.data_key_name);
  const [currentSensorId, setCurrentSensorId] = useState(currentSlot.sensors[0].id);

  useEffect(() => {
    setCurrentSensor(currentSlot.sensors.find(it => it.id === currentSensorId))
  }, [currentSensorId]);

  console.log('currentSlot', currentSlot);
  console.log('currentDevice', currentDevice);

  const onItemMore = (serial) => {
    setCurrentUserState(state => ({
      ...state,
      previousPage: '/?tab=devices'
    }));
    history.push(`/devices?serial=${serial}`);
  };

  const triggers = currentSlot.sensors.map(item => {
    return (
      <div
        className={`home-devices-card-trigger home-devices-card-trigger__${item.sensor_type.data_key_name}${currentSensorName === item.sensor_type.data_key_name ? ' active' : ''}`}
        onClick={() => {
          setCurrentSensorName(item.sensor_type.data_key_name);
          setCurrentSensorId(item.id);
        }}
      >{item.sensor_type.name}</div>
    )
  });

  return (
    <div className="home-devices-card">
      <div className="home-devices-card__title">{currentDevice.attributes.serial_number}{currentDevice.attributes.slots.length > 1 ? ` | Слот ${currentSlot.number}` : ''}</div>
      <div className="home-devices-card__subtitle">
        <div className={`home-devices-card__status home-devices-card__status--${currentDevice.attributes.online ? 'online' : 'offline'}`}/>
        <div className="home-devices-card__desc">{currentDevice.attributes.model.name}</div>
      </div>
      <div className="home-devices-card__triggers">
        {triggers}
        {/*<div*/}
        {/*  className={`home-devices-card-trigger home-devices-card-trigger__amperage${currentTab === 'amperage' ? ' active' : ''}`}*/}
        {/*  onClick={() => setCurrentTab('amperage')}*/}
        {/*>Ток</div>*/}
        {/*<div*/}
        {/*  className={`home-devices-card-trigger home-devices-card-trigger__voltage${currentTab === 'voltage' ? ' active' : ''}`}*/}
        {/*  onClick={() => setCurrentTab('voltage')}*/}
        {/*>Напряжение</div>*/}
        {/*<div*/}
        {/*  className={`home-devices-card-trigger home-devices-card-trigger__wire${currentTab === 'wire' ? ' active' : ''}`}*/}
        {/*  onClick={() => setCurrentTab('wire')}*/}
        {/*>Проволка</div>*/}
        {/*<div*/}
        {/*  className={`home-devices-card-trigger home-devices-card-trigger__gas${currentTab === 'gas' ? ' active' : ''}`}*/}
        {/*  onClick={() => setCurrentTab('gas')}*/}
        {/*>Газ</div>*/}
      </div>
      <div className="home-devices-card__tabs">
        <HomeDevicesCardTab
          currentSensor={currentSensor}
        />
        {/*<div className={`home-devices-card-tab${currentTab === 'amperage' ? ' active' : ''}`}>*/}
        {/*  <div className="home-devices-card-tab__chart">График тока</div>*/}
        {/*  <div className="home-devices-card-tab-info">*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">34м 12с</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Время работы с 00:00</div>*/}
        {/*    </div>*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">Активное</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Текущее состояние</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className={`home-devices-card-tab${currentTab === 'voltage' ? ' active' : ''}`}>*/}
        {/*  <div className="home-devices-card-tab__chart">График напряжения</div>*/}
        {/*  <div className="home-devices-card-tab-info">*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">34м 12с</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Время работы с 00:00</div>*/}
        {/*    </div>*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">Активное</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Текущее состояние</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className={`home-devices-card-tab${currentTab === 'wire' ? ' active' : ''}`}>*/}
        {/*  <div className="home-devices-card-tab__chart">График проволоки</div>*/}
        {/*  <div className="home-devices-card-tab-info">*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">342</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Событий с 00:00</div>*/}
        {/*    </div>*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">34,2</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">метра</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className={`home-devices-card-tab${currentTab === 'gas' ? ' active' : ''}`}>*/}
        {/*  <div className="home-devices-card-tab__chart">График газа</div>*/}
        {/*  <div className="home-devices-card-tab-info">*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">34м 12с</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Время работы с 00:00</div>*/}
        {/*    </div>*/}
        {/*    <div className="home-devices-card-tab-info__item">*/}
        {/*      <div className="home-devices-card-tab-info__value">Активное</div>*/}
        {/*      <div className="home-devices-card-tab-info__desc">Текущее состояние</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="home-devices-card-tab__footer">
        <div
          className="home-devices-card-tab__more"
          onClick={() => onItemMore(currentDevice.attributes.serial_number)}
        >
          Подробнее
        </div>
        {/*<Link to={`/devices?serial=${currentDevice.attributes.serial_number}`} className="home-devices-card-tab__more" >*/}
        {/*  */}
        {/*</Link>*/}
      </div>
    </div>
  );
};

export default HomeDevicesCard;
