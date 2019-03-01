import removeAccents from 'remove-accents';
import dashify from 'dashify';

export const getRouteFromString = string => {
  return dashify(
    removeAccents(string),
    { condense: true }
  );
}

const routes = {
  home: '/',
  dashboard: '/nastenka',
  auth: {
    login: '/prihlasenie',
    register: '/registracia'
  },
  project: {
    new: '/projekt/novy'
  }
};

export default routes;