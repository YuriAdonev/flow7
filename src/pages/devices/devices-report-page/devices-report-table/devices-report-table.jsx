import React from 'react';
import { Link } from 'react-router-dom';

import './devices-report-table.scss';

const DevicesReportTable = () => {
  return (
    <div className="devices-report-table">
      <div className="devices-report-table-header">
        <div className="devices-report-table-header__deco"/>
        <div className="devices-report-table-col devices-report-table-col__device">Устройство</div>
        <div className="devices-report-table-col devices-report-table-col__serial-number">Серийный номер</div>
        <div className="devices-report-table-col devices-report-table-col__work">Время работы</div>
        <div className="devices-report-table-col devices-report-table-col__lost">Время простоя</div>
        <div className="devices-report-table-col devices-report-table-col__type">Тип данных</div>
      </div>
      <div className="devices-report-table__wrap">
        <div className="devices-report-table__item">
          <div className="devices-report-table__left">
            <div className="devices-report-table__day">29</div>
            <div className="devices-report-table__date">октября 2019</div>
          </div>
          <div className="devices-report-table__right">
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `40%`}}/>
              </div>
            </Link>
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `60%`}}/>
              </div>
            </Link>
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `90%`}}/>
              </div>
            </Link>
          </div>
        </div>
        <div className="devices-report-table__item">
          <div className="devices-report-table__left">
            <div className="devices-report-table__day">25</div>
            <div className="devices-report-table__date">октября 2019</div>
          </div>
          <div className="devices-report-table__right">
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `40%`}}/>
              </div>
            </Link>
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `60%`}}/>
              </div>
            </Link>
            <Link to="/devices/38202010" className="devices-report-table-row">
              <div className="devices-report-table-row__wrap">
                <div className="devices-report-table-row__info">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.73828 5.75L8.73828 4.23828L7.26172 4.23828L7.26172 5.75L8.73828 5.75ZM8.73828 11.7617V7.26172H7.26172V11.7617H8.73828ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"/>
                  </svg>
                </div>
                <div className="devices-report-table-col devices-report-table-col__device">ЛАБС РТП4 / СЛОТ 1 </div>
                <div className="devices-report-table-col devices-report-table-col__serial-number">2193210312</div>
                <div className="devices-report-table-col devices-report-table-col__work">3:24:56</div>
                <div className="devices-report-table-col devices-report-table-col__lost">20:35:04</div>
                <div className="devices-report-table-col devices-report-table-col__type">ТОК, Тос, Т, А, Д</div>
              </div>
              <div className="devices-report-table-row-footer">
                <div className="devices-report-table-row-footer__indicator" style={{width: `90%`}}/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesReportTable;
