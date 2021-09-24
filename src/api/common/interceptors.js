import store from '@/store/index';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { deleteCookie } from '@/utils/cookies';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      let accessToken = store.state.accessToken;
      console.log(accessToken);

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const {
        config,
        response: { status },
      } = error;
      console.log(status);
      console.log(error.response.data);

      const errorMessage = error.response.data.message;
      console.log(errorMessage.indexOf('expired'));

      if (status === 401 && errorMessage.indexOf('expired') > 0) {
        const originalRequest = config;
        await requestRefreshToken();

        let accessToken = store.state.accessToken;
        console.log(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axios(originalRequest);
      }

      return Promise.reject(error);
    },
  );
  return instance;
}

async function requestRefreshToken() {
  try {
    const refreshTokenData = {
      refreshToken: store.state.refreshToken,
      accessToken: store.state.accessToken,
    };
    await store.dispatch('REFRESHTOKEN', refreshTokenData);
  } catch (error) {
    console.log(error);
    deleteCookie('ecomm_user');
    deleteCookie('ecomm_refreshToken');
    deleteCookie('ecomm_accessToken');
    deleteCookie('ecomm_authority');
    deleteCookie('ecomm_cartProductCount');
    //this.logMessage = error.response.data;
  } finally {
    //this.initForm();
  }
}
