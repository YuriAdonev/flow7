import React, { useState, useEffect, useRef } from 'react';
import { i18n, DateRangePicker } from 'element-react';

import './device-details-history.scss';

import DeviceDetailsHistoryItem from "./device-details-history-item/device-details-history-item";

import locale from 'element-react/src/locale/lang/ru-RU';
import {useStore} from "../../../../hooks-store/store";
locale.el.datepicker.today = new Date().getDate() + '';
i18n.use(locale);

const DeviceDetailsHistory = ({ sensorTypes, currentItem }) => {
  const [state, dispatch] = useStore();
  const [showSlotsFilter, setShowSlotsFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [currentSlot, setCurrentSlot] = useState('');
  const [currentSlotName, setCurrentSlotName] = useState('Все слоты');
  const [currentType, setCurrentType] = useState('');
  const [currentTypeName, setCurrentTypeName] = useState('Все типы');

  const [filteredSensorTypes, setFilteredSensorTypes] = useState(sensorTypes);
  const [filteredSlots, setFilteredSlots] = useState(currentItem.attributes.slots);
  const [filteredDate, setFilteredDate] = useState([Date.now()]);

  const dateRangePickerRef = useRef(null);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', showSlotsFilter);
  }, [showSlotsFilter]);

  useEffect(() => {
    dispatch('SET_DROP_OPENED', showTypeFilter);
  }, [showTypeFilter]);

  useEffect(() => {
    if (state.isDropOpened) {
      return;
    }
    setShowSlotsFilter(false);
    setShowTypeFilter(false);
  }, [state.isDropOpened]);

  useEffect(() => {
    if (currentType === '') {
      setFilteredSensorTypes(sensorTypes);
    } else {
      const newSensorTypes = sensorTypes.slice().filter(item => item.data_key_name === currentType);
      setFilteredSensorTypes(newSensorTypes);
    }
  }, [currentType]);

  useEffect(() => {
    if (currentSlot === '') {
      setFilteredSlots(currentItem.attributes.slots);
    } else {
      const newSlots = currentItem.attributes.slots.slice().filter(item => item.number === currentSlot);
      setFilteredSlots(newSlots);
    }
  }, [currentSlot]);

  const onTypeChoice = (type, name = 'Все типы') => {
    setCurrentType(type);
    setCurrentTypeName(name);
    setShowTypeFilter(false);
  };

  const onSlotChoice = (slot, name = 'Все слоты') => {
    setCurrentSlot(slot);
    setCurrentSlotName(name);
    setShowSlotsFilter(false);
  };

  const onDateChoice = (dateRange) => {
    if (dateRange === null) {
      return;
    }
    setFilteredDate([new Date(dateRange[0]).getTime(), new Date(dateRange[1]).getTime()]);
  };

  return (
    <div className="device-details-history">
      <div className="device-details-history__header">
        <div className="device-details-history-filter">
          {currentItem.attributes.slots.length > 1 && (
            <div
              className={`filter-select${showSlotsFilter ? ' active' : '' }`}
              onClick={evt => evt.stopPropagation()}
            >
              <div
                className="filter-select__name"
                onClick={() => setShowSlotsFilter(!showSlotsFilter)}
              >
                <span>{currentSlotName}</span>
                <div className="filter-select__drop">
                  <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                  </svg>
                </div>
                <ul className="filter-select-drop-list">
                  {currentItem.attributes.slots.map(item => {
                    return (
                      <li
                        className="filter-select-drop-list__item"
                        key={item.number}
                        onClick={() => onSlotChoice(item.number, `Слот ${item.number}`)}
                      >Слот {item.number}</li>
                    )
                  })}
                  <li
                    className="filter-select-drop-list__item"
                    onClick={() => onSlotChoice('')}
                  >Все слоты</li>
                </ul>
              </div>
            </div>
          )}
          {sensorTypes.length > 1 && (
            <div
              className={`filter-select${showTypeFilter ? ' active' : '' }`}
              onClick={evt => evt.stopPropagation()}
            >
              <div
                className="filter-select__name"
                onClick={() => setShowTypeFilter(!showTypeFilter)}
              >
                <span>{currentTypeName}</span>
                <div className="filter-select__drop">
                  <svg width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.44531 0.433594L9.5 1.48828L5 5.98828L0.5 1.48828L1.55469 0.433594L5 3.87891L8.44531 0.433594Z"/>
                  </svg>
                </div>
                <ul className="filter-select-drop-list">
                  {sensorTypes.map(item => {
                    return (
                      <li
                        className="filter-select-drop-list__item"
                        key={item.id}
                        onClick={() => onTypeChoice(item.data_key_name, item.name)}
                      >{item.name}</li>
                    )
                  })}
                  <li
                    className="filter-select-drop-list__item"
                    onClick={() => onTypeChoice('')}
                  >Все типы</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="device-details-history__datepicker">
          <DateRangePicker
            ref={dateRangePickerRef}
            onChange={onDateChoice}
            format="dd.MM.yyyy"
            placeholder="Выберите даты"
            value={filteredDate.map(it => new Date(it))}
            shortcuts={[{
              text: '7 дней',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }, {
              text: '1 месяц',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }, {
              text: '3 месяца',
              onClick: ()=> {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);

                setFilteredDate([start, end]);
                dateRangePickerRef.current.togglePickerVisible();
              }
            }]}
          />
        </div>
      </div>
      <div className="device-details-history__wrap">
        {filteredSensorTypes.map(sensor => {
          return (
            filteredSlots.map((item, index) => {
              const currentSensor = item.sensors.find(it => it.sensor_type.data_key_name === sensor.data_key_name);
              return (
                <DeviceDetailsHistoryItem
                  key={index}
                  currentSensor={currentSensor}
                  currentItem={item}
                  slotsCount={currentItem.attributes.slots.length}
                  filteredDate={filteredDate}
                  isOnline={currentItem.attributes.online}
                />
              )
            })
          )
        })}
      </div>
    </div>
  )
};

export default DeviceDetailsHistory;
