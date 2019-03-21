import { appendTitle } from './appConfigUtils';
import routes from '../config/app/routes';

export const getProjectRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}` : dashboardRoute;

export const getProjectDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} - ${project.data().title}`);