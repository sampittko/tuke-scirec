import { APP_NAME } from '.';

const TITLE_BASE = APP_NAME + " - ";

const titles = {
  dashboard: "Nástenka",
  home: "Nástroj pre kontrolu verzií vedeckých publikácií",
  login: "Prihlásenie",
  register: "Registrácia",
  project: {
    new: "Vytvorenie nového projektu"
  }
}

const getConcatenatedDocumentTitle = title => {
  return TITLE_BASE + title;
}

export const getDocumentTitle = component => {
  switch (component._reactInternalFiber.elementType.name) {
    case "Dashboard":
      return getConcatenatedDocumentTitle(titles.dashboard);
    case "Login":
      return getConcatenatedDocumentTitle(titles.login);
    case "Register":
      return getConcatenatedDocumentTitle(titles.register);
    case "NewProject":
      return getConcatenatedDocumentTitle(titles.project.new);
    case "Home":
      return getConcatenatedDocumentTitle(titles.home);
    default:
      return APP_NAME;
  }
}