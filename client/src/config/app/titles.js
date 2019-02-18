import { APP_NAME } from '.';

const TITLE_BASE = APP_NAME + " - ";

const titles = {
  dashboard: "Nástenka",
  login: "Prihlásenie",
  register: "Registrácia",
  project: {
    new: "Vytvorenie nového projektu"
  }
}

const getConcatenatedTitle = title => {
  return TITLE_BASE + title;
}

export const getDocumentTitle = component => {
  switch (component._reactInternalFiber.elementType.name) {
    case "Dashboard":
      return getConcatenatedTitle(titles.dashboard);
    case "Login":
      return getConcatenatedTitle(titles.login);
    case "Register":
      return getConcatenatedTitle(titles.register);
    case "NewProject":
      return getConcatenatedTitle(titles.project.new);
    default:
      return APP_NAME;
  }
}