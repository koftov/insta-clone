import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:3000',
    isAuthenticated: false,
    feed: [
      {
        id: 0,
        display_name: 'Koftov',
        user_id: 0,
        desc: 'Look',
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo.png/150px-Scooby-Doo.png',
        timestamp: 1590275350,
      },
      {
        id: 0,
        display_name: 'Koftov',
        user_id: 0,
        desc: 'Look',
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo.png/150px-Scooby-Doo.png',
        timestamp: 1590275350,
      },
      {
        id: 0,
        display_name: 'Koftov',
        user_id: 0,
        desc: 'Look',
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo.png/150px-Scooby-Doo.png',
        timestamp: 1590275350,
      },
    ],
  },
  mutations: {
    isAuthenticated(state) {
      if (localStorage.getItem('jwt') !== null) {
        state.isAuthenticated = true;
      } else state.isAuthenticated = false;
    },
    login(state, token) {
      state.isAuthenticated = true;
      localStorage.setItem('jwt', token);
      router.push('/');
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('jwt');
      router.push('/login');
    },
  },
  actions: {},
  modules: {},
});
