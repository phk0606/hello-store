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
        path: 'product-detail/:productId',
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
        path: 'order-complete/:orderId',
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
        path: 'order-detail-info/:orderId',
        name: 'my-page-order-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "my-page-order-detail-info" */ '@/views/myPage/OrderDetailInfo'
          ),
      },
      {
        path: 'exchange/:orderId',
        name: 'my-page-exchange',
        component: () =>
          import(
            /* webpackChunkName: "my-page-exchange" */ '@/views/myPage/Exchange'
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
  {
    path: '/admin',
    component: () =>
      import(
        /* webpackChunkName: "admin" */
        '@/views/admin/Admin'
      ),
    children: [
      {
        path: 'product-regist',
        name: 'product-regist',
        component: () =>
          import(
            /* webpackChunkName: "product-regist" */ '@/views/admin/productManage/ProductRegist'
          ),
      },
      {
        path: 'product-modify/:productId',
        name: 'product-modify',
        component: () =>
          import(
            /* webpackChunkName: "product-modify" */ '@/views/admin/productManage/ProductModify'
          ),
      },
      {
        path: 'product-list',
        name: 'product-list',
        component: () =>
          import(
            /* webpackChunkName: "product-list" */ '@/views/admin/productManage/ProductList'
          ),
      },
      {
        path: 'category-manage',
        name: 'category-manage',
        component: () =>
          import(
            /* webpackChunkName: "category-manage" */ '@/views/admin/productManage/CategoryManage'
          ),
      },
      {
        path: 'order-list',
        name: 'order-list',
        component: () =>
          import(
            /* webpackChunkName: "order-list" */ '@/views/admin/orderManage/OrderList'
          ),
      },
      {
        path: 'order-detail-info/:orderId',
        name: 'admin-order-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "admin-order-detail-info" */ '@/views/admin/orderManage/OrderDetailInfo'
          ),
      },
      {
        path: 'order-cancel-list',
        name: 'order-cancel-list',
        component: () =>
          import(
            /* webpackChunkName: "order-cancel-list" */ '@/views/admin/orderManage/OrderCancelList'
          ),
      },
      {
        path: 'exchange-list',
        name: 'exchange-list',
        component: () =>
          import(
            /* webpackChunkName: "exchange-list" */ '@/views/admin/orderManage/ExchangeList'
          ),
      },
      {
        path: 'user-list',
        name: 'user-list',
        component: () =>
          import(
            /* webpackChunkName: "exchange-list" */ '@/views/admin/userManage/UserList'
          ),
      },
      {
        path: 'user-detail-info/:username',
        name: 'admin-user-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "admin-user-detail-info" */ '@/views/admin/userManage/UserDetailInfo'
          ),
      },
      {
        path: 'style-shop-notice',
        name: 'admin-style-shop-notice',
        component: () =>
          import(
            /* webpackChunkName: "admin-stype-shop-list-notice" */ '@/views/admin/boardManage/StyleShopNotice'
          ),
      },
      {
        path: 'notice-list',
        name: 'admin-notice-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-list" */ '@/views/admin/boardManage/NoticeList'
          ),
      },
      {
        path: 'notice-regist',
        name: 'admin-notice-regist',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-regist" */ '@/views/admin/boardManage/NoticeRegist'
          ),
      },
      {
        path: 'notice-detail/:noticeId',
        name: 'admin-notice-detail',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-detail" */ '@/views/admin/boardManage/NoticeDetail'
          ),
      },
      {
        path: 'community-list',
        name: 'admin-community-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-list" */ '@/views/admin/boardManage/CommunityList'
          ),
      },
      {
        path: 'community-regist',
        name: 'admin-community-regist',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-regist" */ '@/views/admin/boardManage/CommunityRegist'
          ),
      },
      {
        path: 'community-detail/:communityId',
        name: 'admin-community-detail',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-detail" */ '@/views/admin/boardManage/CommunityDetail'
          ),
      },
      {
        path: 'product-comment-list',
        name: 'admin-product-comment-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-product-comment-list" */ '@/views/admin/boardManage/ProductCommentList'
          ),
      },
      {
        path: 'product-qna-list',
        name: 'admin-product-qna-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-product-qna-list" */ '@/views/admin/boardManage/ProductQnAList'
          ),
      },
    ],
  },
];

import qs from 'qs';

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    var result = qs.stringify(query);

    return result ? '?' + result : '';
  },
});

export default router;
