import React from 'react';

import './device-details-history-item-info.scss';

const DeviceDetailsHistoryItemInfo = () => {
  return (
    <div className="device-details-history-item-info">
      <div className="device-details-history-item-info__item">
        <div className="device-details-history-item-info__value">3:45:45</div>
        <div className="device-details-history-item-info__desc">Время работы</div>
      </div>
      <div className="device-details-history-item-info__item">
        <div className="device-details-history-item-info__value">21:15:15</div>
        <div className="device-details-history-item-info__desc">Время простоя</div>
      </div>
    </div>
  )
};

export default DeviceDetailsHistoryItemInfo;
