import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  getUserFromCookie,
  getAuthorityFromCookie,
  getCartProductCountFromCookie,
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
  saveAuthorityToCookie,
  saveCartProductCountToCookie,
} from '@/utils/cookies';
import { loginUser, refreshToken } from '@/api/auth';
import { getCartProductCount } from '@/api/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    accessToken: getAccessTokenFromCookie() || '',
    refreshToken: getRefreshTokenFromCookie() || '',
    authority: getAuthorityFromCookie() || '',
    cartProductCount: getCartProductCountFromCookie() || '',
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
    setAuthority(state, authority) {
      state.authority = authority;
    },
    clearAccessToken(state) {
      state.accessToken = '';
    },
    clearRefreshToken(state) {
      state.refreshToken = '';
    },
    clearAuthority(state) {
      state.authority = '';
    },
    setCartProductCount(state, cartProductCount) {
      state.cartProductCount = cartProductCount;
    },
    clearCartProductCount(state) {
      state.cartProductCount = '';
    },
  },
  actions: {
    async GETCARTPRODUCTCOUNT({ commit }, username) {
      try {
        const { data } = await getCartProductCount({
          username: username,
        });
        console.log(data);
        commit('setCartProductCount', data);
        saveCartProductCountToCookie(data);
      } catch (error) {
        console.error(error);
      }
    },
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.accessToken, data.refreshToken, data.authority);
      commit('setAccessToken', data.accessToken);
      commit('setRefreshToken', data.refreshToken);
      commit('setUsername', data.username);
      commit('setAuthority', data.authority);
      saveAccessTokenToCookie(data.accessToken);
      saveRefreshTokenToCookie(data.refreshToken);
      saveUserToCookie(data.username);
      saveAuthorityToCookie(data.authority);
      return data;
    },
    async REFRESHTOKEN({ commit }, refreshTokenData) {
      const { data } = await refreshToken(refreshTokenData);
      console.log(data.accessToken, data.refreshToken);
      commit('setAccessToken', data.accessToken);
      commit('setRefreshToken', data.refreshToken);
      commit('setUsername', data.username);
      commit('setAuthority', data.authority);
      saveAccessTokenToCookie(data.accessToken);
      saveRefreshTokenToCookie(data.refreshToken);
      saveUserToCookie(data.username);
      saveAuthorityToCookie(data.authority);
      return data;
    },
  },
  modules: {},
});
