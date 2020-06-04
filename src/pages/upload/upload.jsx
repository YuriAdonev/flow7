import React, { useContext, useState, useRef, useEffect } from 'react';

import './upload.scss';

import Layout from '../../components/layout/layout';
import {CurrentUserContext} from "../../contexts/current-user";
import useFetch from "../../hooks/use-fetch";

const UploadPage = () => {
  const [currentUserState, ] = useContext(CurrentUserContext);
  const [hightlight, setHightlight] = useState(false);
  const [{response, isLoading, error}, doFetchFileUpload] = useFetch('/uploads', true);
  const fileInputRef = useRef(null);

  const headerData = {
    title: 'Загрузка файлов данных',
    breadcrumbsList: [
      {
        name: currentUserState.currentSite ? currentUserState.currentSite.name : '',
        link: '/'
      },
    ],
  };

  useEffect(() => {
    if (!response) {
      return;
    }
  }, [response]);

  const onDragOver = (evt) => {
    evt.preventDefault();
    setHightlight(true);
  };

  const onDragLeave = () => {
    setHightlight(false);
  };

  const onDrop = (evt) => {
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    uploadFile(files[0]);
    setHightlight(false);
  };

  const openFileDialog = () => {
    fileInputRef.current.click()
  };

  const onFilesAdded = (evt) => {
    const files = evt.target.files;
    uploadFile(files[0]);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.set('attachment', file);
    doFetchFileUpload({
      method: 'POST',
      data: formData
    });
  };

  return (
    <Layout
      headerData={headerData}
      isWide={true}
    >
      <div className="content">
        <div className="upload">
          <div
            className={`drop-zone${hightlight ? ' active' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
          >
            <svg width="84" height="110" viewBox="0 0 84 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path d="M67.8043 110H6.30435C2.82609 110 0 107.207 0 103.77V6.23047C0 2.79297 2.82609 0 6.30435 0H77.7174C81.1739 0 84.0217 2.79297 84.0217 6.23047V94.0371" fill="#9AA3BA"/>
                <path d="M67.8044 97.2168V110L84.0217 94.0371H71.0435C69.2609 94.0371 67.8044 95.4766 67.8044 97.2168Z" fill="#596890"/>
                <path d="M24.0217 56.0742H11.1739V68.7715H24.0217V56.0742Z" fill="#113FB4"/>
                <path d="M17.587 64.9688C19.0037 64.9688 20.1522 63.8337 20.1522 62.4336C20.1522 61.0335 19.0037 59.8984 17.587 59.8984C16.1702 59.8984 15.0218 61.0335 15.0218 62.4336C15.0218 63.8337 16.1702 64.9688 17.587 64.9688Z" fill="white"/>
                <path d="M24.0217 75.0664H11.1739V87.7637H24.0217V75.0664Z" fill="#113FB4"/>
                <g opacity="0.5">
                  <path opacity="0.5" d="M67.6956 59.0176H29.1522V60.7363H67.6956V59.0176Z" fill="white"/>
                  <path opacity="0.5" d="M72.8478 64.1094H29.1522V65.8281H72.8478V64.1094Z" fill="white"/>
                  <path opacity="0.5" d="M67.6956 78.0312H29.1522V79.75H67.6956V78.0312Z" fill="white"/>
                  <path opacity="0.5" d="M72.8478 83.1016H29.1522V84.8203H72.8478V83.1016Z" fill="white"/>
                </g>
                <path d="M17.587 83.9609C19.0037 83.9609 20.1522 82.8259 20.1522 81.4258C20.1522 80.0257 19.0037 78.8906 17.587 78.8906C16.1702 78.8906 15.0218 80.0257 15.0218 81.4258C15.0218 82.8259 16.1702 83.9609 17.587 83.9609Z" fill="white"/>
                <path d="M14.6087 23.998H11.1739V33.4082H14.6087V23.998Z" fill="#596890"/>
                <path d="M19.0869 21.0332H15.6522V33.3867H19.0869V21.0332Z" fill="white"/>
                <path d="M23.5652 12.3105H20.1305V33.3867H23.5652V12.3105Z" fill="#596890"/>
                <path d="M28.0435 23.998H24.6087V33.4082H28.0435V23.998Z" fill="white"/>
                <path d="M32.5218 33.3867H29.087V39.8106H32.5218V33.3867Z" fill="#113FB4"/>
                <path d="M37 33.3867H33.5652V47.0078H37V33.3867Z" fill="#113FB4"/>
                <path d="M41.4783 33.3867H38.0435V39.8106H41.4783V33.3867Z" fill="#113FB4"/>
                <path d="M45.9565 27.2207H42.5217V33.3867H45.9565V27.2207Z" fill="white"/>
                <path d="M50.4348 17.1875H47V33.3867H50.4348V17.1875Z" fill="#596890"/>
                <path d="M54.9131 23.998H51.4783V33.4082H54.9131V23.998Z" fill="white"/>
                <path d="M59.3913 9.53906H55.9565V33.3867H59.3913V9.53906Z" fill="#596890"/>
                <path d="M63.8696 23.998H60.4348V33.4082H63.8696V23.998Z" fill="white"/>
                <path d="M68.3696 33.3867H64.9348V39.8106H68.3696V33.3867Z" fill="#113FB4"/>
                <path d="M72.8261 33.3867H69.3913V47.0078H72.8261V33.3867Z" fill="#113FB4"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="84" height="110" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <div className="drop-zone__text">Перенесите файлы сюда, или <span>выберите</span></div>
            <div className="drop-zone__desc">Выберите LOG файлы для загрузки, которые скачали с устройства.</div>
            <input
              ref={fileInputRef}
              className="drop-zone__input"
              type="file"
              onChange={onFilesAdded}
            />
          </div>
          <div className="upload-messages">

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
