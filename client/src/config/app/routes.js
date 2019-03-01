import removeAccents from 'remove-accents';
import dashify from 'dashify';

export const getRouteFromString = string => {
  return dashify(
    removeAccents(string),
    { condense: true }
  );
}

const routes = {
  HOME: '/',
  DASHBOARD: '/nastenka',
  LOGIN: '/prihlasenie',
  REGISTER: '/registracia',
  NEW_PROJECT: '/projekt/novy'
};

export default routes;