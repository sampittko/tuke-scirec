import {appendTitle} from './appConfigUtils';
import routes from '../config/app/routes';
import {projectConfig} from "../config/app";

export const getProjectRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}` : dashboardRoute;

export const getProjectSettingsRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}/nastavenia` : dashboardRoute;

export const getProjectsListRoute = (dashboardRoute, projectRoute) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}/verzie` : dashboardRoute;

export const getProjectDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} • ${project.data().title}`);

export const getProjectSettingsDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} • ${project.data().title} • Nastavenia`);

export const getProjectVersionDocumentTitle = (dashboard, project, projectVersion) =>
  appendTitle(`${dashboard.data().title} • ${project.data().title} • Verzia ${projectVersion.data().versionNum}`);

export const getProjectsListDocumentTitle = (dashboard, project) =>
  appendTitle(`${dashboard.data().title} • ${project.data().title} • Verzie`);

export const getNewProjectDialogDocumentTitle = dashboard =>
  appendTitle(`${dashboard.data().title} • Vytvorenie nového projektu`);

export const getReadableProjectState = numericState => {
  switch (numericState) {
    case projectConfig.states.values.NOT_SET:
      return projectConfig.states.labels.NOT_SET;
    case projectConfig.states.values.PENDING:
      return projectConfig.states.labels.PENDING;
    case projectConfig.states.values.FINISHED:
      return projectConfig.states.labels.FINISHED;
    default:
      return projectConfig.states.labels.NOT_SET;
  }
};

export const getProjectStateColor = numericState => {
  switch (numericState) {
    case projectConfig.states.values.NOT_SET:
      return "default";
    case projectConfig.states.values.PENDING:
      return "secondary";
    case projectConfig.states.values.FINISHED:
      return "primary";
    default:
      return "default";
  }
};