import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () =>
      import(
        /* webpackChunkName: "default-layout" */ '@/views/layouts/DefaultLayout.vue'
      ),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(
            /* webpackChunkName: "home" */
            '@/views/Home'
          ),
      },
    ],
  },
  {
    path: '/authentication',
    component: () =>
      import(
        /* webpackChunkName: "layouts-authentication-layout" */
        '@/views/layouts/authentication/AuthenticationLayout'
      ),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () =>
          import(
            /* webpackChunkName: "views-authentication" */ '@/views/authentication/SignIn'
          ),
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () =>
          import(
            /* webpackChunkName: "views-authentication" */ '@/views/authentication/SignUp'
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
