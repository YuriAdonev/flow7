import React, {useState, useEffect, useContext, Fragment} from 'react';
import {
  GlobalItem,
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';
import GlobalNavigation from '@atlaskit/global-navigation';

import './navigation.scss';

import MainNav from "../main-nav/main-nav";
import SearchNav from "../search-nav/search-nav";
import LoaderNav from "../loader-nav/loader-nav";
import useFetch from "../../../hooks/use-fetch";
import { useStore } from "../../../hooks-store/store";
import { CurrentUserContext } from '../../../contexts/current-user';
import OrganizationChoice from "../organization-choice/organization-choice";
import SlaveNavDirectories from "../slave-nav/slave-nav-directories/slave-nav-directories";
import SlaveNavHome from "../slave-nav/slave-nav-home/slave-nav-home";
import SlaveNavEquipmentsAndMaterials
  from "../slave-nav/slave-nav-equipments-and-materials/slave-nav-equipments-and-materials";
import SlaveNavAccount from "../slave-nav/slave-nav-account/slave-nav-account";
import SlaveNavSettings from "../slave-nav/slave-nav-settings/slave-nav-settings";
import SlaveNavStaff from "../slave-nav/slave-nav-staff/slave-nav-staff";
import SlaveNavDevices from "../slave-nav/slave-nav-devices/slave-nav-devices";
import SlaveNavWorks from "../slave-nav/slave-nav-works/slave-nav-works";

const Navigation = ({ initLoading }) => {
  const [state, dispatch] = useStore();
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const [{response: responseAppsList, isLoading: isLoadingAppsList, error: errorAppsList}, doFetchAppsList] = useFetch('/applications');
  const [{response: responseDirectories, isLoading: isLoadingDirectories, error: errorDirectories}, doFetchDirectories] = useFetch('/directories/directories');

  const [currentItem, setCurrentItem] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showOrganizationChoice, setShowOrganizationChoice] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [menuOpened, setMenuOpened] = useState(true);
  const [applications, setApplications] = useState({
    devices: false,
    staff: false,
    equipment_and_materials: false,
    warehouse: false,
    directories: false
  });

  useEffect(() => {
    if (initLoading) {
      return;
    }
    doFetchAppsList();
    doFetchDirectories();
  }, [currentUserState.currentSite, initLoading]);

  useEffect(() => {
    if (!responseAppsList || !responseDirectories) {
      return;
    }
    const currentApplications = {};
    responseAppsList.data.forEach(application => {
      currentApplications[application.id] = application.attributes.enabled;
    });
    setCurrentUserState(state => ({
      ...state,
      applications: currentApplications,
      directories: responseDirectories.data
    }));
    setApplications(currentApplications);
    setLoading(false);
  }, [responseAppsList, responseDirectories]);

  const mainNavSecondary = {
    certifications: {
      title: 'Аттестации',
      list: [
        {
          name: 'Персонал',
          link: ''
        },
        {
          name: 'Оборудование',
          link: ''
        },
        {
          name: 'Материалы',
          link: ''
        },
        {
          name: 'Технологии',
          link: ''
        },
        {
          name: 'Технологические карты',
          link: ''
        },
      ],
      sublist: [
        {
          name: 'Аттестационные центры',
          link: ''
        },
        {
          name: 'Виды аттестаций',
          link: ''
        },
        {
          name: 'Реестры организаций',
          link: ''
        },
      ],
      extended: ''
    },
    uploadData: {
      title: 'Производство работ',
      list: [
        {
          name: 'Календарь смен',
          link: ''
        },
        {
          name: 'Календарь работ',
          link: ''
        },
        {
          name: 'Добавить работы',
          link: ''
        },
        {
          name: 'Сварочный журнал',
          link: ''
        },
        {
          name: 'Отчеты по работам',
          link: ''
        },
      ],
      sublist: '',
      extended: ''
    },

  };

  const onMainNavItemClick = (current) => {
    setCurrentItem(current);
  };

  const onSearchOpen = () => {
    setShowSearch(true);
  };

  const onSearchClose = () => {
    setShowSearch(false);
  };

  const onMenuBtnClick = () => {
    setMenuOpened(!menuOpened);
  };

  const slaveNav = () => {
    switch (currentItem) {
      case 'home':
        return (
          <SlaveNavHome
            onMainNavItemClick={onMainNavItemClick}
            applications={applications}
          />
        );
      case 'devices':
        return applications.devices ? (
          <SlaveNavDevices />
        ) : '';
      case 'works':
        return (
          <SlaveNavWorks />
        );
      case 'staff':
        return (
          <SlaveNavStaff />
        );
      case 'equipmentsAndMaterials':
        return applications.equipment_and_materials ? (
          <SlaveNavEquipmentsAndMaterials />
        ) : '';
      case 'certifications':
        return (
          <SlaveNavHome
            onMainNavItemClick={onMainNavItemClick}
            applications={applications}
          />
        );
      case 'directories':
        return (
          <SlaveNavDirectories />
        );
      case 'settings':
        return (
          <SlaveNavSettings
            onMainNavItemClick={onMainNavItemClick}
          />
        );
      case 'account':
        return (
          <SlaveNavAccount />
        );
      default:
        return (
          <SlaveNavHome
            onMainNavItemClick={onMainNavItemClick}
            applications={applications}
          />
        );
    }
  };

  return (
    <Fragment>
      {currentUserState.isLoggedIn ? (
        <nav
          className={`navigation${menuOpened ? ' menu-opened': ''}`}
        >
          {loading ? <LoaderNav /> : (
            <button
              className="navigation__btn"
              type="button"
              onClick={onMenuBtnClick}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.48828 0.5L5.98828 5L1.48828 9.5L0.433594 8.44531L3.87891 5L0.433594 1.55469L1.48828 0.5Z"/>
              </svg>
            </button>
          )}
          <MainNav
            currentItem={currentItem}
            onMainNavItemClick={onMainNavItemClick}
            onSearchOpen={onSearchOpen}
            showUserAccount={showUserAccount}
            setShowUserAccount={setShowUserAccount}
            setShowOrganizationChoice={setShowOrganizationChoice}
            currentUserState={currentUserState}
            applications={applications}
          />
          {slaveNav()}
          <SearchNav
            searchOpen={showSearch}
            onSearchClose={onSearchClose}
          />
          <OrganizationChoice
            setCurrentItem={setCurrentItem}
            showOrganizationChoice={showOrganizationChoice}
            setShowOrganizationChoice={setShowOrganizationChoice}
          />
        </nav>
      ) : ''}
    </Fragment>
  )
};

export default Navigation;
