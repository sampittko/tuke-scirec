const routes = {
  HOME: '/',
  ABOUT: '/o-aplikacii',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  DASHBOARD: '/nastenky/:dashboardRoute',
  DASHBOARD_SETTINGS: '/nastenky/:dashboardRoute/nastavenia',
  DASHBOARDS: 'nastenky',
  PROJECT: '/nastenky/:dashboardRoute/projekty/:projectRoute',
  PROJECT_SETTINGS: '/nastenky/:dashboardRoute/projekty/:projectRoute/nastavenia',
  PROJECT_VERSIONS_LIST: '/nastenky/:dashboardRoute/projekty/:projectRoute/verzie',
  PROJECT_VERSION: '/nastenky/:dashboardRoute/projekty/:projectRoute/verzie/:versionId',
  PROJECTS_ARCHIVE: '/nastenky/:dashboardRoute/projekty/archiv',
  PROJECTS: 'projekty',
};

export default routes;