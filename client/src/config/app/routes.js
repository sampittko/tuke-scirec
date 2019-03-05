const routes = {
  HOME: '/',
  DASHBOARD: '/nastenky/:dashboardRoute',
  DASHBOARD_SETTINGS: '/nastenky/:dashboardRoute/nastavenia',
  DASHBOARDS: '/nastenky',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  NEW_PROJECT: '/nastenky/:dashboardRoute/vytvorenie-noveho-projektu',
  PROJECT: 'projekty/:projectRoute'
};

export default routes;