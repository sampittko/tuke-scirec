import { dashboardConfig } from '../config/app';
import routes from '../config/app/routes';

export const getDashboardFromId = (dashboardId, dashboards) =>
  dashboards.find(dashboard => dashboard.created === dashboardId);

export const sortDashboardsByCreated = (dashboard1, dashboard2) =>
  dashboard2.created - dashboard1.created;

export const getActiveDashboard = (dashboards, activeId, selector) => {
  if (activeId !== dashboardConfig.MAX_COUNT) {
    if (activeId) {
      return dashboards.find(dashboard => dashboard.created === activeId);
    }
    else {
      return dashboards.find(dashboard => dashboard.created === selector.previousId);
    }
  }
  else {
    return dashboardConfig.MAX_COUNT;
  }
}

export const getDashboardRoute = dashboardRoute =>
  dashboardRoute === "" ? routes.DASHBOARDS : `${routes.DASHBOARDS}/${dashboardRoute}`;