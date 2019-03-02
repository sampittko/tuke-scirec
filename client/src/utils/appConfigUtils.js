import titles from '../config/app/titles';
import { APP_NAME } from '../config/app';
import removeAccents from 'remove-accents';
import dashify from 'dashify';

const TITLE_BASE = APP_NAME + " - ";

const appendTitle = title => {
  return TITLE_BASE + title;
}

export const getDocumentTitle = component => {
  switch (component) {
    case "Dashboard":
      return appendTitle(titles.DASHBOARD);
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

export const getRouteFromString = string => {
  return dashify(
    removeAccents(string),
    { condense: true }
  );
}