const routes = {
  HOME: '/',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  DASHBOARD: '/nastenky/:dashboardRoute',
  DASHBOARD_SETTINGS: '/nastenky/:dashboardRoute/nastavenia',
  DASHBOARDS: '/nastenky',
  PROJECT: '/nastenky/:dashboardRoute/projekty/:projectRoute',
};

export default routes;