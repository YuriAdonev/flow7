import React, { useState, useEffect } from 'react';

import './structure-table.scss';

import Spinner from "../../../../components/spinner/spinner";
import TableActions from "../../../../components/table/table-actions/table-actions";

const StructureTable = ({ tableData, onItemDelete, onShowEdit, pageSearch, isLoading, error, onAddChild }) => {

  const onItemEdit = (id) => {
    onShowEdit(id);
  };

  const items = tableData.map(tableItem => {
    return (
      <tr
        key={tableItem.id}
        className="table__row"
      >
        <td
          className="structure-table__name table__col table__col--first"
        >
          <div
            className="table__structure-tree"
            style={{marginLeft: tableItem.attributes.depth === 0 ? '0' : (tableItem.attributes.depth * 16) + 'px'}}
            onClick={() => onItemEdit(tableItem.id)}
          >
            {tableItem.attributes.depth === 0 ? (
              <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0117 11.5V4.01172H1.98828V11.5H14.0117ZM14.0117 2.5C14.4102 2.5 14.75 2.65234 15.0312 2.95703C15.3359 3.26172 15.4883 3.61328 15.4883 4.01172V11.5C15.4883 11.8984 15.3359 12.25 15.0312 12.5547C14.75 12.8594 14.4102 13.0117 14.0117 13.0117H1.98828C1.58984 13.0117 1.23828 12.8594 0.933594 12.5547C0.652344 12.25 0.511719 11.8984 0.511719 11.5V2.5C0.511719 2.10156 0.652344 1.75 0.933594 1.44531C1.23828 1.14062 1.58984 0.988281 1.98828 0.988281H6.48828L8 2.5H14.0117Z"/>
              </svg>
            ) : (
              <svg width="11" height="12" viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6562 8L6.65625 12L5.71875 11.0625L8.125 8.65625H0.65625V0.65625H2V7.34375H8.125L5.71875 4.9375L6.65625 4L10.6562 8Z"/>
              </svg>
            )}
            <span
              onClick={() => onItemEdit(tableItem.id)}
            >{tableItem.attributes.name}</span>
          </div>
        </td>
        <td
          className="structure-table__cipher table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >{tableItem.attributes.cipher}</td>
        <td
          className="structure-table__equipments table__col"
          onClick={() => onItemEdit(tableItem.id)}
        >-</td>
        <td
          className="structure-table__staff table__col table__col--last"
          onClick={() => onItemEdit(tableItem.id)}
        >-</td>
        <td className="table__col table__col--last table__col--actions">
          <TableActions
            tableActions={{
              title: 'Действия',
              itemsList: [
                {
                  name: 'Редактировать',
                  onClick: onItemEdit
                },
                {
                  name: 'Добавить дочернюю',
                  onClick: () => onAddChild(tableItem.id, tableItem.attributes.depth)
                },
                {
                  name: 'Удалить',
                  onClick: onItemDelete
                }
              ]
            }}
            id={tableItem.id}
          />
        </td>
      </tr>
    )
  });

  return (
    <table className={`structure-table table`}>
      <thead>
        <tr className="table__row table__row--head">
          <th className="structure-table__name table__col table__col--first table__col--head">Название структурного подразделения</th>
          <th className="structure-table__cipher table__col table__col--head">Код или шифр</th>
          <th className="structure-table__equipments table__col table__col--head">Оборудования</th>
          <th className="structure-table__staff table__col table__col--head">Сотрудников</th>
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

export default StructureTable;
