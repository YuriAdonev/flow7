import React, {useState, useEffect, useRef, useContext} from 'react';

import './directories-edit.scss';

import Modal from '../../../../components/modal/modal';
import useFetch from '../../../../hooks/use-fetch';
import DirectoriesSlugTable from "../../directories-slug-page/directories-slug-table/directories-slug-table";
import {CurrentUserContext} from "../../../../contexts/current-user";
import DirectoriesSlugTableHierarchic
  from "../../directories-slug-page/directories-slug-table-hierarchic/directories-slug-table-hierarchic";

const DirectoriesEdit = ({ itemId, onClose, reloadTable }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [pageSearch, setPageSearch] = useState('');
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [showInMenu, setShowInMenu] = useState(false);
  const [hierarchic, setHierarchic] = useState(false);

  const [{response, isLoading, error}, doFetchItem] = useFetch(`/directories/directories/${itemId}`);
  const [{response: itemUpdateResponse, isLoading: itemUpdateIsLoading, error: itemUpdateError}, doFetchItemUpdate] = useFetch(`/directories/directories/${itemId}`);
  const [{response: itemSaveResponse, isLoading: itemSaveIsLoading, error: itemSaveError}, doFetchItemSave] = useFetch(`/directories/directories`);
  const nameInput = useRef(null);
  const isNewItem = itemId === 'new';

  const headerData = {
    title: isNewItem ? 'Создание' : 'Редактирование',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
      {
        name: 'Справочники',
        link: '/'
      },
    ],
    buttonsList: [
      {
        text: 'Сохранить',
        action: () => onSaveClick()
      }
    ],
  };

  useEffect(() => {
    if (isNewItem) {
      return;
    }
    doFetchItem();
  }, []);

  useEffect(() => {
    nameInput.current.focus();
    if (!response) {
      return;
    }
    setName(response.data.attributes.name);
    setShowInMenu(response.data.attributes.show_in_menu);
    setSlug(response.data.attributes.slug);
    setHierarchic(response.data.attributes.hierarchic);
  }, [response]);

  useEffect(() => {
    if (itemUpdateResponse) {
      onClose();
    }
    if (itemSaveResponse) {
      onClose();
    }
    reloadTable();
  }, [itemUpdateResponse, itemSaveResponse]);

  const onSaveClick = () => {
    if (name === '') {
      setNameEmpty(true);
      nameInput.focus();
    } else {
      if (isNewItem) {
        doFetchItemSave({
          method: 'POST',
          data: {
            data: {
              name: name,
              show_in_menu: showInMenu,
              hierarchic: hierarchic
            }
          }
        });
      } else {
        doFetchItemUpdate({
          method: 'PUT',
          data: {
            data: {
              name: name,
              show_in_menu: showInMenu,
              hierarchic: hierarchic
            }
          }
        });
      }
    }
  };

  return (
    <Modal
      headerData={headerData}
      onClose={onClose}
      isWide={true}
    >
      <div className="directories-edit">
        <div className="directories-edit-name">
          <input
            ref={nameInput}
            autoFocus={nameEmpty}
            type="text"
            placeholder="Название справочника"
            className={`directories-edit-name__input${nameEmpty ? ' error' : ''}`}
            onChange={(evt) => setName(evt.target.value)}
            value={name}
          />
          {nameEmpty ? (
            <span className="directories-edit__error">Введите название справочника</span>
          ) : ''}
        </div>
        <div className="directories-edit__row">
          <label className="directories-edit-checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setShowInMenu(!showInMenu)
              }}
              checked={showInMenu}
            />
            <span className="checkbox"/>
            <span className="directories-edit-checkbox__desc">Отображать в меню</span>
          </label>
          <label className="directories-edit-checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setHierarchic(!hierarchic)
              }}
              checked={hierarchic}
            />
            <span className="checkbox"/>
            <span className="directories-edit-checkbox__desc">Иерархический</span>
          </label>
        </div>
      </div>
      {slug === '' ? '' : hierarchic ? (
        <DirectoriesSlugTableHierarchic
          pageSearch={pageSearch}
          slug={slug}
        />
      ) : (
        <DirectoriesSlugTable
          pageSearch={pageSearch}
          slug={slug}
        />
      )}
    </Modal>
  );
};

export default DirectoriesEdit;
