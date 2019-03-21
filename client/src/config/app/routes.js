const routes = {
  HOME: '/',
  ABOUT: '/o-aplikacii',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  DASHBOARD: '/nastenky/:dashboardRoute',
  DASHBOARD_SETTINGS: '/nastenky/:dashboardRoute/nastavenia',
  DASHBOARDS: 'nastenky',
  PROJECT: '/nastenky/:dashboardRoute/projekty/:projectRoute',
  PROJECTS: 'projekty',
};

export default routes;