import { APP_NAME } from '.';

const TITLE_BASE = APP_NAME + " - ";

const titles = {
  DASHBOARD: "Nástenka",
  HOME: "Nástroj pre kontrolu verzií vedeckých publikácií",
  LOGIN: "Prihlásenie",
  REGISTER: "Registrácia",
  NEW_PROJECT: "Vytvorenie nového projektu"
}

const getConcatenatedDocumentTitle = title => {
  return TITLE_BASE + title;
}

export const getDocumentTitle = component => {
  switch (component) {
    case "Dashboard":
      return getConcatenatedDocumentTitle(titles.DASHBOARD);
    case "Login":
      return getConcatenatedDocumentTitle(titles.LOGIN);
    case "Register":
      return getConcatenatedDocumentTitle(titles.REGISTER);
    case "NewProject":
      return getConcatenatedDocumentTitle(titles.NEW_PROJECT);
    case "Welcome":
      return getConcatenatedDocumentTitle(titles.HOME);
    default:
      return APP_NAME;
  }
}