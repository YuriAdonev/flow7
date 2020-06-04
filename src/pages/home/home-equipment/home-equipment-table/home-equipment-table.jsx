import React from 'react';

import './home-equipment-table.scss';

import Spinner from "../../../../components/spinner/spinner";
import TableActions from "../../../../components/table/table-actions/table-actions";

const SECONDS_IN_DAY = 86400;

const HomeEquipmentTable = ({ tableData, onItemMore, isLoading, error, worksChecked, serviceChecked, brokenChecked }) => {

  const tableActions = {
    title: 'Действия',
    itemsList: [
      {
        name: 'Подробнее',
        onClick: onItemMore
      },
    ]
  };

  const getLoadPercent = (arr) => {
    let turnedOffCount = 0;
    let stoppedCount = 0;
    let workedCount = 0;

    arr.forEach(lineItem => {
      switch (lineItem.state) {
        case 'turned_off':
          turnedOffCount = turnedOffCount + lineItem.seconds;
          break;
        case 'stopped':
          stoppedCount = stoppedCount + lineItem.seconds;
          break;
        case 'worked':
          workedCount = workedCount + lineItem.seconds;
          break;
      }
    });
    return Math.round(workedCount / (stoppedCount + turnedOffCount + workedCount) * 10000 , -2) / 100;
  };

  const items = tableData.map(tableItem => {
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="home-table__group table__col table__col--first"
        >
          <div className="home-table__tree">
            {tableItem.attributes.depth === 0 ? (
              <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0117 11.5V4.01172H1.98828V11.5H14.0117ZM14.0117 2.5C14.4102 2.5 14.75 2.65234 15.0312 2.95703C15.3359 3.26172 15.4883 3.61328 15.4883 4.01172V11.5C15.4883 11.8984 15.3359 12.25 15.0312 12.5547C14.75 12.8594 14.4102 13.0117 14.0117 13.0117H1.98828C1.58984 13.0117 1.23828 12.8594 0.933594 12.5547C0.652344 12.25 0.511719 11.8984 0.511719 11.5V2.5C0.511719 2.10156 0.652344 1.75 0.933594 1.44531C1.23828 1.14062 1.58984 0.988281 1.98828 0.988281H6.48828L8 2.5H14.0117Z"/>
              </svg>
            ) : (
              <svg width="11" height="12" viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6562 8L6.65625 12L5.71875 11.0625L8.125 8.65625H0.65625V0.65625H2V7.34375H8.125L5.71875 4.9375L6.65625 4L10.6562 8Z"/>
              </svg>
            )}
          </div>
        </td>
        <td
          className="home-table__name table__col"
          onClick={() => onItemMore(tableItem.id)}
        >{tableItem.attributes.name}</td>
        <td
          className="home-table__loading table__col"
          onClick={() => onItemMore(tableItem.id)}
        >{getLoadPercent(tableItem.attributes.timeline) + '%'}</td>
        <td
          className="home-table__timeline table__col"
          onClick={() => onItemMore(tableItem.id)}
        >
          <div className="home-timeline">
            {tableItem.attributes.timeline.map((lineItem, index) => {
              switch (lineItem.state) {
                case 'turned_off':
                  return (
                    <span
                      key={index}
                      className={`home-timeline__item home-timeline__item--turned-off${brokenChecked ? '' : ' hidden'}`}
                      style={{width: `${(lineItem.seconds / SECONDS_IN_DAY) * 100}%`}}
                    />
                  );
                case 'stopped':
                  return (
                    <span
                      key={index}
                      className={`home-timeline__item home-timeline__item--stopped${serviceChecked ? '' : ' hidden'}`}
                      style={{width: `${(lineItem.seconds / SECONDS_IN_DAY) * 100}%`}}
                    />
                  );
                case 'worked':
                  return (
                    <span
                      key={index}
                      className={`home-timeline__item home-timeline__item--worked${worksChecked ? '' : ' hidden'}`}
                      style={{width: `${(lineItem.seconds / SECONDS_IN_DAY) * 100}%`}}
                    />
                  );
              }
            })}
          </div>
        </td>
        <td className="table__col table__col--last table__col--actions">
          <TableActions
            tableActions={tableActions}
            id={tableItem.id}
          />
        </td>
      </tr>
    )
  });

  return (
    <table className={`home-table table`}>
      <thead>
        <tr
          className="table__row table__row--head"
        >
          <th className="home-table__group table__col table__col--first table__col--head">Группа</th>
          <th className="home-table__name table__col table__col--head">Название</th>
          <th className="home-table__loading table__col table__col--head">% загрузки</th>
          <th className="home-table__timeline table__col table__col--last table__col--head">
            <div>
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </th>
          <th className="table__col table__col--last table__col--head table__col--actions"/>
        </tr>
      </thead>
      <tbody>
      {isLoading ? (
        <tr>
          <td colSpan="7">
            <Spinner/>
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan="7">
            <div className="table__error">Ошибка загрузки</div>
          </td>
        </tr>
      ) : tableData.length === 0 ? (
        <tr>
          <td colSpan="7">
            <div className="table__empty">Данные отсутствуют</div>
          </td>
        </tr>
      ) : items}
      </tbody>
    </table>
  );
};

export default HomeEquipmentTable;
