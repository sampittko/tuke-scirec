import { APP_NAME, dashboardConfig } from '../config/app';

import dashify from 'dashify';
import removeAccents from 'remove-accents';
import titles from '../config/app/titles';

const TITLE_BASE = APP_NAME + " - ";

const appendTitle = title =>
  TITLE_BASE + title;

export const getDocumentTitle = component => {
  switch (component) {
    case "Login":
      return appendTitle(titles.LOGIN);
    case "Register":
      return appendTitle(titles.REGISTER);
    case "NewProject":
      return appendTitle(titles.NEW_PROJECT);
    case "Home":
      return appendTitle(titles.HOME);
    default:
      return APP_NAME;
  }
}

export const getDocumentTitleFromDashboard = dashboard => {
  return dashboard !== dashboardConfig.MAX_COUNT ? appendTitle(dashboard.title) : appendTitle("Vytvorenie novej nástenky");
}

export const getRouteFromString = string =>
  dashify(
    removeAccents(string),
    { condense: true }
  );