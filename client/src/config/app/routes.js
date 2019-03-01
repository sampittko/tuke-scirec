import removeAccents from 'remove-accents';
import dashify from 'dashify';

export const getRouteFromString = string => {
  return routes.home + dashify(
    removeAccents(string),
    { condense: true }
  );
}

const routes = {
  home: '/vitajte',
  dashboard: '/:name',
  auth: {
    login: '/prihlasenie',
    register: '/registracia'
  },
  project: {
    new: '/projekt/novy'
  }
};

export default routes;