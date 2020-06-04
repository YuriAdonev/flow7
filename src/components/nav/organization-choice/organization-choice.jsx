import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import './organization-choice.scss';

import { CurrentUserContext } from '../../../contexts/current-user';
import ModalLeft from "../../modal-left/modal-left";
import useFetch from "../../../hooks/use-fetch";

const OrganizationChoice = ({ setCurrentItem, showOrganizationChoice, setShowOrganizationChoice }) => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [goToHome, setGoToHome] = useState(false);

  const [{response: responseAppsList}, doFetchAppsList] = useFetch('/applications');

  useEffect(() => {
    if (!currentUserState.sites) {
      return;
    }
    setLoading(false);

    return () => {
      setGoToHome(false);
    };
  }, [currentUserState]);

  const onOrganizationChoice = (organization) => {
    setCurrentUserState(state => ({
      ...state,
      currentSite: organization,
    }));
    setShowOrganizationChoice(false);
    setCurrentItem('home');
    setGoToHome(true);
    doFetchAppsList();
  };

  const onModalClose = () => {
    setShowOrganizationChoice(false);
  };

  if (goToHome) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <ModalLeft
      onModalClose={onModalClose}
      isOpen={showOrganizationChoice}
      title="Мои организации"
    >
      {loading ? '' : (
        <div className="organization-choice">
          <ul className="organization-choice__list">
            {currentUserState.sites.map(item => {
              const imageId = item.image.id === undefined ? '' : item.image.id;
              return (
                <li
                  key={item.id}
                  className="organization-choice-item"
                  onClick={() => onOrganizationChoice(item)}
                >
                  <div className="organization-choice-item__avatar">
                    {imageId === '' ? '' : (
                      <img src={`https://staging.labsflow.ru/api/v1/uploads/${imageId}`} alt=""/>
                    )}
                  </div>
                  <div className="organization-choice-item__wrap">
                    <p className="organization-choice-item__name">{item.name}</p>
                    <p className="organization-choice-item__site">{item.subdomain}.labsflow.ru</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </ModalLeft>
  )
};

export default OrganizationChoice;
