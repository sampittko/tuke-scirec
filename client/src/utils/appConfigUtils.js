import { APP_NAME } from '../config/app';
import dashify from 'dashify';
import removeAccents from 'remove-accents';
import titles from '../config/app/titles';

const TITLE_BASE = APP_NAME + " - ";

export const appendTitle = title =>
  TITLE_BASE + title;

const getComponentName = component =>
  component._reactInternalFiber.elementType.name;

export const getDocumentTitleFromComponent = component => {
  switch (getComponentName(component)) {
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

export const getRouteFromString = string =>
  dashify(
    removeAccents(string),
    { condense: true }
  );