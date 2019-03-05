const routes = {
  HOME: '/',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  DASHBOARD: '/nastenky/:dashboardRoute',
  DASHBOARD_SETTINGS: '/nastenky/:dashboardRoute/nastavenia',
  DASHBOARDS: '/nastenky',
  NEW_PROJECT: '/nastenky/:dashboardRoute/vytvorenie-noveho-projektu',
  PROJECT: '/nastenky/:dashboardRoute/projekty/:projectRoute',
};

export default routes;