import React, { useContext, useState, useEffect } from 'react';

import './staff-edit.scss';

import Modal from "../../../../components/modal/modal";
import {CurrentUserContext} from "../../../../contexts/current-user";
import StaffEditBase from "./staff-edit-base/staff-edit-base";
import StaffEditOrders from "./staff-edit-orders/staff-edit-orders";
import useFetch from "../../../../hooks/use-fetch";
import StaffEditAccess from "./staff-edit-access/staff-edit-access";

const StaffEdit = ({ itemId, onClose }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [currentPageTab, setCurrentPageTab] = useState('base');
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [{response, isLoading, error}, doFetchItem] = useFetch(`/directories/personnels/${itemId}`);

  const isNewItem = itemId === 'new';

  const headerData = {
    title: isNewItem ? 'Добавление сотрудника' : 'Редактирование сотрудника',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Персонал',
        link: '/staff'
      },
      {
        name: 'Сотрудники',
        link: '/staff'
      },
    ],
    noBottomLine: true
  };

  useEffect(() => {
    if (isNewItem) {
      setLoading(false);
      return;
    }
    doFetchItem();
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentItem(response.data);
    setLoading(false);
  }, [response]);

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      {loading ? '' : (
        <>
          <div className="staff-edit-triggers tabs-triggers">
            <div
              className={`staff-edit-triggers__item tabs-triggers__item${currentPageTab === 'base' ? ' active' : ''}`}
              onClick={() => setCurrentPageTab('base')}
            >Основная информация</div>
            {isNewItem ? '' : (
              <>
                <div
                  className={`staff-edit-triggers__item tabs-triggers__item${currentPageTab === 'orders' ? ' active' : ''}`}
                  onClick={() => setCurrentPageTab('orders')}
                >Приказы</div>
                <div
                className={`staff-edit-triggers__item tabs-triggers__item${currentPageTab === 'access' ? ' active' : ''}`}
                onClick={() => setCurrentPageTab('access')}
                >Доступ</div>
                <div
                className={`staff-edit-triggers__item tabs-triggers__item${currentPageTab === 'custom' ? ' active' : ''}`}
                onClick={() => setCurrentPageTab('custom')}
                >Дополнительно</div>
              </>
            )}
          </div>
        {currentPageTab === 'base' && (
          <StaffEditBase
          itemId={itemId}
          currentItem={currentItem}
          />
          )}
        {currentPageTab === 'orders' && (
          <StaffEditOrders
          itemId={itemId}
          />
          )}
        {currentPageTab === 'access' && (
          <StaffEditAccess
          itemId={itemId}
          />
          )}
        {currentPageTab === 'custom' && (
          ''
        )}
        </>
      )}
    </Modal>
  )
};

export default StaffEdit;
