import { appendTitle } from './appConfigUtils';
import { dashboardConfig } from '../config/app';
import routes from '../config/app/routes';

export const getActiveDashboard = (dashboards, activeId, selector) => {
  if (activeId !== dashboardConfig.MAX_COUNT) {
    if (activeId) {
      return dashboards.find(dashboard => dashboard.id === activeId);
    }
    else {
      return dashboards.find(dashboard => dashboard.id === selector.previousId);
    }
  }
  else {
    return dashboardConfig.MAX_COUNT;
  }
};

export const getDashboardRoute = dashboardRoute =>
  dashboardRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}` : dashboardRoute;

export const getDashboardSettingsRoute = dashboardRoute =>
  dashboardRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/nastavenia` : dashboardRoute;

export const getDashboardDocumentTitle = dashboard =>
  dashboard !== dashboardConfig.MAX_COUNT ? appendTitle(dashboard.data().title) : appendTitle("Vytvorenie novej nástenky");

export const getDashboardSettingsDocumentTitle = dashboard =>
  appendTitle(`${dashboard.data().title} - Nastavenia`);