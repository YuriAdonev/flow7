import React, { Component } from 'react';

class TableHeader extends Component {
  state = {

  };

  render() {
    const { colsList, tableClass } = this.props.tableStructure;

    const cols = colsList.map((item) => {
      if (item.isActive) {
        return (
          <div
            key={item.name}
            className={`${tableClass}__${item.colClass} table__col`}
          >
            {item.header}
          </div>
        )
      }
      return '';
    });

    return (
      <div className="welders-table__head table__head">
        <div className="welders-table__drop table__col">
        </div>
        {cols}
      </div>
    );
  }
}

export default TableHeader;
