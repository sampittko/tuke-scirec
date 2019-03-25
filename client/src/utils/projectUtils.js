import {appendTitle} from './appConfigUtils';
import routes from '../config/app/routes';

export const getProjectRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}` : dashboardRoute;

export const getProjectSettingsRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}/nastavenia` : dashboardRoute;

export const getProjectsArchiveRoute = dashboardRoute =>
  dashboardRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/archiv` : dashboardRoute;

export const getProjectDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} - ${project.data().title}`);

export const getProjectSettingsDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} - ${project.data().title} - Nastavenia`);

export const getNewProjectDialogDocumentTitle = dashboard =>
  appendTitle(`${dashboard.data().title} - Vytvorenie nového projektu`);