import {projectVersionConfig} from "../config/app";
import routes from "../config/app/routes";

export const getProjectVersionRoute = (dashboardRoute, projectRoute, versionNum) =>
  dashboardRoute !== "" && projectRoute !== "" ? `/${routes.DASHBOARDS}/${dashboardRoute}/${routes.PROJECTS}/${projectRoute}/${routes.VERSIONS}/${versionNum}` : dashboardRoute;

export const getReadableProjectVersionState = numericState => {
  switch (numericState) {
    case projectVersionConfig.states.values.NOT_SET:
      return projectVersionConfig.states.labels.NOT_SET;
    case projectVersionConfig.states.values.WORK_IN_PROGRESS:
      return projectVersionConfig.states.labels.WORK_IN_PROGRESS;
    case projectVersionConfig.states.values.WAITING_FOR_REVIEW:
      return projectVersionConfig.states.labels.WAITING_FOR_REVIEW;
    case projectVersionConfig.states.values.REJECTED:
      return projectVersionConfig.states.labels.REJECTED;
    case projectVersionConfig.states.values.ACCEPTED:
      return projectVersionConfig.states.labels.ACCEPTED;
    default:
      return projectVersionConfig.states.labels.NOT_SET;
  }
};

export const getProjectVersionsSortedByModified = projectVersions => {
  return projectVersions.sort((projectVersion1, projectVersion2) => projectVersion2.data().modified.toDate().getMilliseconds() - projectVersion1.data().modified.toDate().getMilliseconds());
};