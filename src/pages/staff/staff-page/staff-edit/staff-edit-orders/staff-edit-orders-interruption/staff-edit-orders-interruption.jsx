import React, { useState } from 'react';

import './staff-edit-orders-interruption.scss';
import StaffEditOrdersInterruptionTable
  from "../staff-edit-orders-interruption-table/staff-edit-orders-interruption-table";
import StaffEditOrdersInterruptionForm
  from "../staff-edit-orders-interruption-form/staff-edit-orders-interruption-form";
import StaffEditAccessTable from "../../staff-edit-access/staff-edit-access-table/staff-edit-access-table";

const StaffEditOrdersInterruption = () => {
  const [interruptionTableData, setInterruptionTableData] = useState([]);
  const [sortedBy, setSortedBy] = useState('at');
  const [sortedDown, setSortedDown] = useState(true);

  const onSortClick = (name) => {
    if (name === sortedBy) {
      setSortedDown(!sortedDown);
    }
    if (name !== sortedBy) {
      setSortedBy(name);
      setSortedDown(true);
    }
  };

  return (
    <div className="staff-edit__interruption">
      <div className="staff-edit__title">Сведения о нарушениях</div>
      {interruptionTableData.length !== 0 && (
        <StaffEditOrdersInterruptionTable
          sortedBy={sortedBy}
          sortedDown={sortedDown}
          onSortClick={onSortClick}
          tableData={[]}
          isLoading={false}
          error={false}
        />
      )}
      <div className="staff-edit__subtitle">Добавление новой записи в группу: Сведенья о нарушениях</div>
      <StaffEditOrdersInterruptionForm/>
    </div>
  )
};

export default StaffEditOrdersInterruption;
