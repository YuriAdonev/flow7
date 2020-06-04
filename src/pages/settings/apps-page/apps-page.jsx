import React from 'react';

import './apps-page.scss';

import Layout from '../../../components/layout/layout';

const SettingsAppsPage = () => {
  const headerData = {
    title: 'Приложения',
    breadcrumbsList: [
      {
        name: 'Настройки организации',
        link: '/'
      },
    ],
  };

  return (
    <Layout
      headerData={headerData}
    >
      <div className="content">
        <div className="settings-apps">
          <div className="settings-apps__wrap">
            <div className="settings-apps-item active">
              <div className="settings-apps-item__header">
                <div className="settings-apps-item__icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6"/>
                  </svg>
                </div>
                <p className="settings-apps-item__title">Устройства</p>
              </div>
              <p className="settings-apps-item__description">Данное приложение позволяет регистрировать данные с устройств и отображать их в реальном времени</p>
              <div className="settings-apps-item__depends"><span>Необходимо:</span>Устройства сбора данных</div>
              <div className="settings-apps-item__footer">
                <button className="settings-apps-item__btn">Включено</button>
                <div className="settings-apps-item-actions">
                  <div className="settings-apps-item-actions__btn">
                    <svg width="12" height="4" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.0625 1.0625C5.33333 0.791667 5.64583 0.65625 6 0.65625C6.35417 0.65625 6.66667 0.791667 6.9375 1.0625C7.20833 1.33333 7.34375 1.64583 7.34375 2C7.34375 2.35417 7.20833 2.66667 6.9375 2.9375C6.66667 3.20833 6.35417 3.34375 6 3.34375C5.64583 3.34375 5.33333 3.20833 5.0625 2.9375C4.79167 2.66667 4.65625 2.35417 4.65625 2C4.65625 1.64583 4.79167 1.33333 5.0625 1.0625ZM9.0625 1.0625C9.33333 0.791667 9.64583 0.65625 10 0.65625C10.3542 0.65625 10.6667 0.791667 10.9375 1.0625C11.2083 1.33333 11.3438 1.64583 11.3438 2C11.3438 2.35417 11.2083 2.66667 10.9375 2.9375C10.6667 3.20833 10.3542 3.34375 10 3.34375C9.64583 3.34375 9.33333 3.20833 9.0625 2.9375C8.79167 2.66667 8.65625 2.35417 8.65625 2C8.65625 1.64583 8.79167 1.33333 9.0625 1.0625ZM1.0625 1.0625C1.33333 0.791667 1.64583 0.65625 2 0.65625C2.35417 0.65625 2.66667 0.791667 2.9375 1.0625C3.20833 1.33333 3.34375 1.64583 3.34375 2C3.34375 2.35417 3.20833 2.66667 2.9375 2.9375C2.66667 3.20833 2.35417 3.34375 2 3.34375C1.64583 3.34375 1.33333 3.20833 1.0625 2.9375C0.791667 2.66667 0.65625 2.35417 0.65625 2C0.65625 1.64583 0.791667 1.33333 1.0625 1.0625Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings-apps-item">
              <div className="settings-apps-item__header">
                <div className="settings-apps-item__icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6"/>
                  </svg>
                </div>
                <p className="settings-apps-item__title">Устройства</p>
              </div>
              <p className="settings-apps-item__description">Данное приложение позволяет регистрировать данные с устройств и отображать их в реальном времени</p>
              <div className="settings-apps-item__depends"><span>Необходимо:</span>Устройства сбора данных</div>
              <div className="settings-apps-item__footer">
                <button className="settings-apps-item__btn">Подключить</button>
                <div className="settings-apps-item-actions">
                  <div className="settings-apps-item-actions__btn">
                    <svg width="12" height="4" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.0625 1.0625C5.33333 0.791667 5.64583 0.65625 6 0.65625C6.35417 0.65625 6.66667 0.791667 6.9375 1.0625C7.20833 1.33333 7.34375 1.64583 7.34375 2C7.34375 2.35417 7.20833 2.66667 6.9375 2.9375C6.66667 3.20833 6.35417 3.34375 6 3.34375C5.64583 3.34375 5.33333 3.20833 5.0625 2.9375C4.79167 2.66667 4.65625 2.35417 4.65625 2C4.65625 1.64583 4.79167 1.33333 5.0625 1.0625ZM9.0625 1.0625C9.33333 0.791667 9.64583 0.65625 10 0.65625C10.3542 0.65625 10.6667 0.791667 10.9375 1.0625C11.2083 1.33333 11.3438 1.64583 11.3438 2C11.3438 2.35417 11.2083 2.66667 10.9375 2.9375C10.6667 3.20833 10.3542 3.34375 10 3.34375C9.64583 3.34375 9.33333 3.20833 9.0625 2.9375C8.79167 2.66667 8.65625 2.35417 8.65625 2C8.65625 1.64583 8.79167 1.33333 9.0625 1.0625ZM1.0625 1.0625C1.33333 0.791667 1.64583 0.65625 2 0.65625C2.35417 0.65625 2.66667 0.791667 2.9375 1.0625C3.20833 1.33333 3.34375 1.64583 3.34375 2C3.34375 2.35417 3.20833 2.66667 2.9375 2.9375C2.66667 3.20833 2.35417 3.34375 2 3.34375C1.64583 3.34375 1.33333 3.20833 1.0625 2.9375C0.791667 2.66667 0.65625 2.35417 0.65625 2C0.65625 1.64583 0.791667 1.33333 1.0625 1.0625Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings-apps-item">
              <div className="settings-apps-item__header">
                <div className="settings-apps-item__icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6"/>
                  </svg>
                </div>
                <p className="settings-apps-item__title">Устройства</p>
              </div>
              <p className="settings-apps-item__description">Данное приложение позволяет регистрировать данные с устройств и отображать их в реальном времени</p>
              <div className="settings-apps-item__depends"><span>Необходимо:</span>Устройства сбора данных</div>
              <div className="settings-apps-item__footer">
                <button className="settings-apps-item__btn">Подключить</button>
                <div className="settings-apps-item-actions">
                  <div className="settings-apps-item-actions__btn">
                    <svg width="12" height="4" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.0625 1.0625C5.33333 0.791667 5.64583 0.65625 6 0.65625C6.35417 0.65625 6.66667 0.791667 6.9375 1.0625C7.20833 1.33333 7.34375 1.64583 7.34375 2C7.34375 2.35417 7.20833 2.66667 6.9375 2.9375C6.66667 3.20833 6.35417 3.34375 6 3.34375C5.64583 3.34375 5.33333 3.20833 5.0625 2.9375C4.79167 2.66667 4.65625 2.35417 4.65625 2C4.65625 1.64583 4.79167 1.33333 5.0625 1.0625ZM9.0625 1.0625C9.33333 0.791667 9.64583 0.65625 10 0.65625C10.3542 0.65625 10.6667 0.791667 10.9375 1.0625C11.2083 1.33333 11.3438 1.64583 11.3438 2C11.3438 2.35417 11.2083 2.66667 10.9375 2.9375C10.6667 3.20833 10.3542 3.34375 10 3.34375C9.64583 3.34375 9.33333 3.20833 9.0625 2.9375C8.79167 2.66667 8.65625 2.35417 8.65625 2C8.65625 1.64583 8.79167 1.33333 9.0625 1.0625ZM1.0625 1.0625C1.33333 0.791667 1.64583 0.65625 2 0.65625C2.35417 0.65625 2.66667 0.791667 2.9375 1.0625C3.20833 1.33333 3.34375 1.64583 3.34375 2C3.34375 2.35417 3.20833 2.66667 2.9375 2.9375C2.66667 3.20833 2.35417 3.34375 2 3.34375C1.64583 3.34375 1.33333 3.20833 1.0625 2.9375C0.791667 2.66667 0.65625 2.35417 0.65625 2C0.65625 1.64583 0.791667 1.33333 1.0625 1.0625Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings-apps-item">
              <div className="settings-apps-item__header">
                <div className="settings-apps-item__icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6"/>
                  </svg>
                </div>
                <p className="settings-apps-item__title">Устройства</p>
              </div>
              <p className="settings-apps-item__description">Данное приложение позволяет регистрировать данные с устройств и отображать их в реальном времени</p>
              <div className="settings-apps-item__depends"><span>Необходимо:</span>Устройства сбора данных</div>
              <div className="settings-apps-item__footer">
                <button className="settings-apps-item__btn">Подключить</button>
                <div className="settings-apps-item-actions">
                  <div className="settings-apps-item-actions__btn">
                    <svg width="12" height="4" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.0625 1.0625C5.33333 0.791667 5.64583 0.65625 6 0.65625C6.35417 0.65625 6.66667 0.791667 6.9375 1.0625C7.20833 1.33333 7.34375 1.64583 7.34375 2C7.34375 2.35417 7.20833 2.66667 6.9375 2.9375C6.66667 3.20833 6.35417 3.34375 6 3.34375C5.64583 3.34375 5.33333 3.20833 5.0625 2.9375C4.79167 2.66667 4.65625 2.35417 4.65625 2C4.65625 1.64583 4.79167 1.33333 5.0625 1.0625ZM9.0625 1.0625C9.33333 0.791667 9.64583 0.65625 10 0.65625C10.3542 0.65625 10.6667 0.791667 10.9375 1.0625C11.2083 1.33333 11.3438 1.64583 11.3438 2C11.3438 2.35417 11.2083 2.66667 10.9375 2.9375C10.6667 3.20833 10.3542 3.34375 10 3.34375C9.64583 3.34375 9.33333 3.20833 9.0625 2.9375C8.79167 2.66667 8.65625 2.35417 8.65625 2C8.65625 1.64583 8.79167 1.33333 9.0625 1.0625ZM1.0625 1.0625C1.33333 0.791667 1.64583 0.65625 2 0.65625C2.35417 0.65625 2.66667 0.791667 2.9375 1.0625C3.20833 1.33333 3.34375 1.64583 3.34375 2C3.34375 2.35417 3.20833 2.66667 2.9375 2.9375C2.66667 3.20833 2.35417 3.34375 2 3.34375C1.64583 3.34375 1.33333 3.20833 1.0625 2.9375C0.791667 2.66667 0.65625 2.35417 0.65625 2C0.65625 1.64583 0.791667 1.33333 1.0625 1.0625Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsAppsPage;