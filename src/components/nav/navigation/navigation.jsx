import React, {useState, useEffect, useContext, Fragment} from 'react';
import { GlobalItem, LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';

import MainNav from "../main-nav/main-nav";
import Routes from "../../../routes";
import {useStore} from "../../../hooks-store/store";
import {CurrentUserContext} from "../../../contexts/current-user";
import useFetch from "../../../hooks/use-fetch";
import SlaveNavHome from "../slave-nav/slave-nav-home/slave-nav-home";
import SlaveNavDevices from "../slave-nav/slave-nav-devices/slave-nav-devices";
import SlaveNavWorks from "../slave-nav/slave-nav-works/slave-nav-works";
import SlaveNavStaff from "../slave-nav/slave-nav-staff/slave-nav-staff";
import SlaveNavEquipmentsAndMaterials
  from "../slave-nav/slave-nav-equipments-and-materials/slave-nav-equipments-and-materials";
import SlaveNavDirectories from "../slave-nav/slave-nav-directories/slave-nav-directories";
import SlaveNavSettings from "../slave-nav/slave-nav-settings/slave-nav-settings";
import SlaveNavAccount from "../slave-nav/slave-nav-account/slave-nav-account";
import LoaderNav from "../loader-nav/loader-nav";
import SearchNav from "../search-nav/search-nav";
import OrganizationChoice from "../organization-choice/organization-choice";
import SlaveNav from "../slave-nav/slave-nav";


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
            currentUserState={currentUserState}
          />
        );
      case 'devices':
        return applications.devices ? (
          <SlaveNavDevices
            currentUserState={currentUserState}
          />
        ) : '';
      case 'works':
        return (
          <SlaveNavWorks
            currentUserState={currentUserState}
          />
        );
      case 'staff':
        return (
          <SlaveNavStaff
            currentUserState={currentUserState}
          />
        );
      case 'equipmentsAndMaterials':
        return applications.equipment_and_materials ? (
          <SlaveNavEquipmentsAndMaterials
            currentUserState={currentUserState}
          />
        ) : '';
      case 'certifications':
        return (
          <SlaveNavHome
            onMainNavItemClick={onMainNavItemClick}
            applications={applications}
            currentUserState={currentUserState}
          />
        );
      case 'directories':
        return (
          <SlaveNavDirectories
            currentUserState={currentUserState}
          />
        );
      case 'settings':
        return (
          <SlaveNavSettings
            onMainNavItemClick={onMainNavItemClick}
            currentUserState={currentUserState}
          />
        );
      case 'account':
        return (
          <SlaveNavAccount
            currentUserState={currentUserState}
          />
        );
      default:
        return (
          <SlaveNavHome
            onMainNavItemClick={onMainNavItemClick}
            applications={applications}
            currentUserState={currentUserState}
          />
        );
    }
  };


  const mainNav = () => (
    <>
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
      {/*{slaveNav()}*/}

    </>
  );

  console.log('applications', applications);

  return currentUserState.isLoggedIn ? (
    <>
      {loading ? <LoaderNav /> : ''}
      <NavigationProvider>
        <LayoutManager
          globalNavigation={mainNav}
          productNavigation={() => null}
          containerNavigation={slaveNav}
          style={{backgroundColor: '#113FB4'}}
        >
          <Routes/>
          <SearchNav
            searchOpen={showSearch}
            onSearchClose={onSearchClose}
          />
          <OrganizationChoice
            setCurrentItem={setCurrentItem}
            showOrganizationChoice={showOrganizationChoice}
            setShowOrganizationChoice={setShowOrganizationChoice}
          />
        </LayoutManager>
      </NavigationProvider>
    </>
  ) : ''
};

export default Navigation;
