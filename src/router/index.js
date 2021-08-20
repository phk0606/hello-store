import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "default-layout" */ '@/views/Main.vue'),
  },
  {
    path: '/authentication',
    component: () =>
      import(
        /* webpackChunkName: "layouts-authentication-layout" */
        '@/views/authentication/Authentication'
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
  {
    path: '/style-shop',
    component: () =>
      import(
        /* webpackChunkName: "style-shop-layout" */
        '@/views/shop/Shop'
      ),
    children: [
      {
        path: 'product-list',
        name: 'ProductList',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-list" */ '@/views/shop/ProductList'
          ),
      },
      {
        path: 'product-detail',
        name: 'ProductDetail',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-detail" */ '@/views/shop/ProductDetail'
          ),
      },
      {
        path: 'product-order',
        name: 'ProductOrder',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-order" */ '@/views/shop/ProductOrder'
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
