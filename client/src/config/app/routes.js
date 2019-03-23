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
  PROJECTS: 'projekty',
};

export default routes;