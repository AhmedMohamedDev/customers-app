import { createStore } from "vuex";
import axios from "axios";
import Cookies from 'js-cookie'

export const store = createStore({
  state: {
    user: null,
    authorization: {
      token: "",
      type: "bearer"
    },
    customers: [],
    errors:{}
  },

  getters: {
    authorization: (state) => state.authorization,
  },

  actions: {
    submitCustomer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let authorization = Cookies.get('authorization');
      if (authorization) {
        let auth = JSON.parse(authorization);
        axios.defaults.headers.common.Authorization = `${auth.type} ${auth.token}`;
      }
        let url = 'api/customer';
        axios.post(url, payload)
          .then(res => {
            commit('appendCustomer', res.data.data);
            commit('clearErrors');
            resolve();
          }).catch(error => {
            if (error.response.status === 422) {
              console.log(error.response.data.errors)
              commit('setErrors', error.response.data.errors);
            }
            reject(error);
          });
      });
    },

    resetErrors({commit},payload){
      commit('clearErrors');
    },

    updateCustomer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let authorization = Cookies.get('authorization');
        if (authorization) {
          let auth = JSON.parse(authorization);
          axios.defaults.headers.common.Authorization = `${auth.type} ${auth.token}`;
        }        let url = 'api/customer';
        axios.put(url, payload)
          .then(res => {
            commit('clearErrors');
            resolve();
          }).catch(error => {
            if (error.response.status === 422) {
              commit('setErrors', error.response.data.errors);
            }
            reject(error);
          });
      });
    },

    getCustomers({ state,commit }, payload){
      let authorization = Cookies.get('authorization');
      if (authorization) {
        let auth = JSON.parse(authorization);
        axios.defaults.headers.common.Authorization = `${auth.type} ${auth.token}`;
      }
      let url = 'api/customers';
      axios.get(url,payload)
      .then(res => {
        commit('setCustomers', res.data.data)
      })
    },

    async deleteCustomer({ commit }, id){  
      let authorization = Cookies.get('authorization');
      if (authorization) {
        let auth = JSON.parse(authorization);
        axios.defaults.headers.common.Authorization = `${auth.type} ${auth.token}`;
      }      
      let url = `api/customer/${id}`;
      try {
        await axios.delete(url);
      } catch (error) {
        console.log(error);
      }
    },

    login({ commit }, data) {
      commit('setUser', data.user);
      commit('setAuthorization', data.authorization);
      console.log(data.authorization);

  
      axios.defaults.headers.common.Authorization = `${data.authorization.type} ${data.authorization.token}`;
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setAuth', null);
  
      delete axios.defaults.headers.common.Authorization;
    },

},
  mutations: {
    setCustomers(state, customers) {
      state.customers = customers
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    clearErrors(state) {
        state.errors = {}
    },
    appendCustomer(state, payload) {
      state.customers.push(payload);
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthorization(state, authorization) {
      state.authorization = authorization;
      Cookies.set('authorization', JSON.stringify(authorization), { expires: 7 });
      axios.defaults.headers.common.Authorization = `${authorization.type} ${authorization.token}`;
    }
  },

  })
