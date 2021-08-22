import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () =>
      import(/* webpackChunkName: "main-page" */ '@/views/MainPage'),
  },
  {
    path: '/authentication',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */
        '@/views/authentication/Authentication'
      ),
    children: [
      {
        path: 'sign-in',
        name: 'authentication-signin',
        component: () =>
          import(
            /* webpackChunkName: "authentication-signin" */ '@/views/authentication/SignIn'
          ),
      },
      {
        path: 'sign-up',
        name: 'authentication-signup',
        component: () =>
          import(
            /* webpackChunkName: "authentication-signup" */ '@/views/authentication/SignUp'
          ),
      },
    ],
  },
  {
    path: '/style-shop',
    component: () =>
      import(
        /* webpackChunkName: "style-shop" */
        '@/views/shop/StyleShop'
      ),
    children: [
      {
        path: 'product-list',
        name: 'style-shop-ProductList',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-ProductList" */ '@/views/shop/ProductList'
          ),
      },
      {
        path: 'product-detail',
        name: 'style-shop-product-detail',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-detail" */ '@/views/shop/ProductDetail'
          ),
      },
      {
        path: 'product-order',
        name: 'style-shop-product-order',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-order" */ '@/views/shop/ProductOrder'
          ),
      },
      {
        path: 'order-complete',
        name: 'style-shop-product-order-complete',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-order-complete" */ '@/views/shop/OrderComplete'
          ),
      },
    ],
  },
  {
    path: '/my-page',
    component: () =>
      import(
        /* webpackChunkName: "my-page" */
        '@/views/myPage/MyPage'
      ),
    children: [
      {
        path: 'order-info',
        name: 'my-page-order-info',
        component: () =>
          import(
            /* webpackChunkName: "my-page-order-info" */ '@/views/myPage/OrderInfo'
          ),
      },
      {
        path: 'order-detail-info',
        name: 'my-page-order-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "my-page-order-detail-info" */ '@/views/myPage/OrderDetailInfo'
          ),
      },
      {
        path: 'cart',
        name: 'my-page-cart',
        component: () =>
          import(/* webpackChunkName: "my-page-cart" */ '@/views/myPage/Cart'),
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
