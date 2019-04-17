import {APP_NAME, DOCUMENT_TITLE_BASE} from '../config/app';

import dashify from 'dashify';
import removeAccents from 'remove-accents';
import titles from '../config/app/titles';

export const appendTitle = title =>
  `${DOCUMENT_TITLE_BASE} ${title}`;

export const getDocumentTitleFromComponent = component => {
  switch (component) {
    case "Login":
      return appendTitle(titles.LOGIN);
    case "Register":
      return appendTitle(titles.REGISTER);
    case "Home":
      return appendTitle(titles.HOME);
    case "About":
      return appendTitle(titles.ABOUT);
    default:
      return APP_NAME;
  }
};

export const getRouteFromString = string =>
  dashify(
    removeAccents(string),
    { condense: true }
  );

export const asyncForEach = async (array, callbackFn) => {
  for (let i = 0; i < array.length; i++) {
    await callbackFn(array[i]);
  }
};