import { createStore } from 'vuex';

const base = 'http://mrg.danat.su/local/templates/gas/ajax/';
const uriAddress =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

function getLocations(params = {}) {
  const meta = params.meta;
  let location = {};

  if (!meta) location.region = 'Башкортостан';
  else {
    const filtered = Object.fromEntries(
      Object.entries(meta)
      .filter((entry) => entry[1] !== null)
    );

    location = filtered;
  }

  return [location];
}

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async getCity({ dispatch }, { query }) {
      return dispatch('getAddress', {
        query,
        from: 'city',
        to: 'settlement',
        locations: getLocations(),
      });
    },
    async getStreet({ dispatch }, { query, meta }) {
      return dispatch('getAddress', {
        query,
        from: 'street',
        to: 'street',
        locations: getLocations({ meta: meta?.data }),
      });
    },
    async getBuilding({ dispatch }, { query, meta }) {
      return dispatch('getAddress', {
        query,
        from: 'house',
        to: 'house',
        locations: getLocations({ meta: meta?.data }),
      });
    },
    async getAddress(_c, { query, from, to, locations }) {
      const url = new URL('dadata.php', base);
      const params = {
        query,
        from_bound: { value: from },
        to_bound: { value: to },
        locations,
        count: 10,
        restrict_value: true,
      };

      const strParams = JSON.stringify(params);
      url.searchParams.append('uri', uriAddress);
      url.searchParams.append('params', strParams);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const json = await response.json();

      return json.response;
    },
  },
  modules: {
    complexForm: require('./complexForm').default
  },
});
