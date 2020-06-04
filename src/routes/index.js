import React, {Fragment, useContext} from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '../auth/private';
import LoginPage from '../pages/login/login-page';
import HomePage from '../pages/home/home-page';
import WorkCalendarPage from '../pages/works/work-calendar-page/work-calendar-page';

import DirectoriesPage from '../pages/directories/directories-page/directories-page';
import PositionsPage from '../pages/staff/positions-page/positions-page';
import UnitsPage from '../pages/directories/units-page/units-page';
import WeldingMethodsPage from '../pages/directories/welding-methods-page/welding-methods-page';
import AccountPage
  from "../pages/account/account-page/account-page";
import AccountLogsPage from "../pages/account/logs-page/account-logs-page";
import AccountNotificationPage from "../pages/account/notification-page/account-notification-page";
import AccountOrganizationsPage from "../pages/account/organizations-page/account-organizations-page";
import AccountSessionsPage from "../pages/account/sessions-page/account-sessions-page";
import WeldersPage from "../pages/staff/welders-page/welders-page";
import BrigadesPage from "../pages/staff/brigades-page/brigades-page";
import SubdivisionsPage from "../pages/staff/subdivisions-page/subdivisions-page";

import MaterialAccountingPage from "../pages/equipment-and-materials/material-accounting-page/material-accounting-page";
import EquipmentAccountingPage
  from "../pages/equipment-and-materials/equipment-accounting-page/equipment-accounting-page";
import EquipmentTypesPage from "../pages/equipment-and-materials/equipment-types-page/equipment-types-page";
import MaterialTypesPage from "../pages/equipment-and-materials/material-types-page/material-types-page";
import ManufacturersPage from "../pages/equipment-and-materials/manufacturers-page/manufacturers-page";
import ExperiencePage from "../pages/equipment-and-materials/experience-page/experience-page";
import DirectoriesSlugPage from "../pages/directories/directories-slug-page/directories-slug-page";
import SettingsPage from "../pages/settings/settings-page/settings-page";
import SettingsAppsPage from "../pages/settings/apps-page/apps-page";
import SettingsLogsPage from "../pages/settings/logs-page/logs-page";
import SettingsNotificationPage from "../pages/settings/notification-page/notification-page";
import SettingsUsersPage from "../pages/settings/users-page/users-page";
import SettingsWidgetsPage from "../pages/settings/widgets-page/widgets-page";
import {CurrentUserContext} from "../contexts/current-user";
import DevicesPage from "../pages/devices/devices-page/devices-page";
import DevicesReportPage from "../pages/devices/devices-report-page/devices-report-page";
import DevicesPanelPage from "../pages/devices/devices-panel-page/devices-panel-page";
import StaffPage from "../pages/staff/staff-page/staff-page";
import StructurePage from "../pages/staff/structure-page/structure-page";
import UploadPage from "../pages/upload/upload";

const Routes = () => {
  const [currentUserState, ] = useContext(CurrentUserContext);

  return (
    <Switch>
      <PrivateRoute path="/" component={HomePage} exact/>

      {currentUserState.applications === null ? '' : (
        <Fragment>
          <PrivateRoute path="/account" component={AccountPage} exact/>
          <PrivateRoute path="/account/logs" component={AccountLogsPage}/>
          <PrivateRoute path="/account/notification" component={AccountNotificationPage}/>
          <PrivateRoute path="/account/organizations" component={AccountOrganizationsPage}/>
          <PrivateRoute path="/account/sessions" component={AccountSessionsPage}/>

          {currentUserState.applications.devices ? (
            <Fragment>
              <PrivateRoute path="/devices" component={DevicesPage} exact/>
              <PrivateRoute path="/devices/report" component={DevicesReportPage}/>
              <PrivateRoute path="/devices/panel" component={DevicesPanelPage}/>
            </Fragment>
          ) : ''}

          {currentUserState.applications.equipment_and_materials ? (
            <Fragment>
              <PrivateRoute path="/equipment-and-materials" component={EquipmentAccountingPage} exact/>
              <PrivateRoute path="/equipment-and-materials/equipment-types" component={EquipmentTypesPage}/>
              <PrivateRoute path="/equipment-and-materials/material-types" component={MaterialTypesPage}/>
              <PrivateRoute path="/equipment-and-materials/manufacturers" component={ManufacturersPage}/>
              <PrivateRoute path="/equipment-and-materials/experience" component={ExperiencePage}/>
            </Fragment>
          ) : ''}

          <PrivateRoute path="/directories" component={DirectoriesPage} exact/>
          <PrivateRoute path="/directories/units" component={UnitsPage} exact/>
          <PrivateRoute path="/directories/users/:slug" component={DirectoriesSlugPage}/>

          {currentUserState.applications.staff ? (
            <Fragment>
              <PrivateRoute path="/staff" component={StaffPage} exact/>
              <PrivateRoute path="/staff/structure" component={StructurePage}/>
              <PrivateRoute path="/staff/positions" component={PositionsPage}/>
              {/*<PrivateRoute path="/staff/welders" component={WeldersPage}/>*/}
              {/*<PrivateRoute path="/staff/brigades" component={BrigadesPage}/>*/}
              {/*<PrivateRoute path="/staff/subdivisions" component={SubdivisionsPage}/>*/}
            </Fragment>
          ) : ''}

          <PrivateRoute path="/settings" component={SettingsPage} exact/>
          <PrivateRoute path="/settings/apps" component={SettingsAppsPage}/>
          <PrivateRoute path="/settings/logs" component={SettingsLogsPage}/>
          <PrivateRoute path="/settings/notification" component={SettingsNotificationPage}/>
          <PrivateRoute path="/settings/users" component={SettingsUsersPage}/>
          <PrivateRoute path="/settings/widgets" component={SettingsWidgetsPage}/>

          <PrivateRoute path="/upload" component={UploadPage}/>

          <PrivateRoute path="/works/calendar" component={WorkCalendarPage}/>
        </Fragment>
      )}
    </Switch>
  );
};

export default Routes;
