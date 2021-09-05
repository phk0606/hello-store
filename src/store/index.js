import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  getUserFromCookie,
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser, refreshToken } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    accessToken: getAccessTokenFromCookie() || '',
    refreshToken: getRefreshTokenFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    clearAccessToken(state) {
      state.accessToken = '';
    },
    clearRefreshToken(state) {
      state.refreshToken = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.accessToken, data.refreshToken);
      commit('setAccessToken', data.accessToken);
      commit('setRefreshToken', data.refreshToken);
      commit('setUsername', data.username);
      saveAccessTokenToCookie(data.accessToken);
      saveRefreshTokenToCookie(data.refreshToken);
      saveUserToCookie(data.username);
      return data;
    },
    async REFRESHTOKEN({ commit }, refreshTokenData) {
      const { data } = await refreshToken(refreshTokenData);
      console.log(data.accessToken, data.refreshToken);
      commit('setAccessToken', data.accessToken);
      commit('setRefreshToken', data.refreshToken);
      commit('setUsername', data.username);
      saveAccessTokenToCookie(data.accessToken);
      saveRefreshTokenToCookie(data.refreshToken);
      saveUserToCookie(data.username);
      return data;
    },
  },
  modules: {},
});
