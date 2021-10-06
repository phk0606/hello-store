import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

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
        path: 'product-list/:categoryId/:parentId',
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
        meta: {
          auth: true,
        },
      },
      {
        path: 'order-complete/:orderId',
        name: 'style-shop-product-order-complete',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-order-complete" */ '@/views/shop/OrderComplete'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-comment',
        name: 'style-shop-product-comment',
        component: () =>
          import(
            /* webpackChunkName: "style-shop-product-comment" */ '@/views/shop/ProductComment'
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
        meta: {
          auth: true,
        },
      },
      {
        path: 'order-detail-info/:orderId',
        name: 'my-page-order-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "my-page-order-detail-info" */ '@/views/myPage/OrderDetailInfo'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'exchange/:orderId',
        name: 'my-page-exchange',
        component: () =>
          import(
            /* webpackChunkName: "my-page-exchange" */ '@/views/myPage/Exchange'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'cart',
        name: 'my-page-cart',
        component: () =>
          import(/* webpackChunkName: "my-page-cart" */ '@/views/myPage/Cart'),
        meta: {
          auth: true,
        },
      },
      {
        path: 'manToMan',
        name: 'my-page-manToMan',
        component: () =>
          import(
            /* webpackChunkName: "my-page-manToMan" */ '@/views/myPage/ManToMan'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-comment',
        name: 'my-page-product-comment',
        component: () =>
          import(
            /* webpackChunkName: "my-page-product-comment" */ '@/views/myPage/ProductComment'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-qna',
        name: 'my-page-productQnA',
        component: () =>
          import(
            /* webpackChunkName: "my-page-productQnA" */ '@/views/myPage/ProductQnA'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'my-info',
        name: 'my-page-myInfo',
        component: () =>
          import(
            /* webpackChunkName: "my-page-myInfo" */ '@/views/myPage/MyInfo'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'password',
        name: 'my-page-password',
        component: () =>
          import(
            /* webpackChunkName: "my-page-password" */ '@/views/myPage/Password'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'point-history',
        name: 'my-page-point-history',
        component: () =>
          import(
            /* webpackChunkName: "my-page-point-history" */ '@/views/myPage/PointHistory'
          ),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: '/service-center',
    component: () =>
      import(
        /* webpackChunkName: "service-center" */
        '@/views/serviceCenter/ServiceCenter'
      ),
    children: [
      {
        path: 'notice',
        name: 'service-center-notice',
        component: () =>
          import(
            /* webpackChunkName: "service-center-notice" */ '@/views/serviceCenter/Notice'
          ),
      },
      {
        path: 'notice-detail/:noticeId',
        name: 'service-center-notice-detail',
        component: () =>
          import(
            /* webpackChunkName: "service-center-notice-deatil" */ '@/views/serviceCenter/NoticeDetail'
          ),
      },
      {
        path: 'community',
        name: 'service-center-community',
        component: () =>
          import(
            /* webpackChunkName: "service-center-community" */ '@/views/serviceCenter/Community'
          ),
      },
      {
        path: 'community-detail/:communityId',
        name: 'service-center-community-detail',
        component: () =>
          import(
            /* webpackChunkName: "service-center-community-deatil" */ '@/views/serviceCenter/CommunityDetail'
          ),
      },
      {
        path: 'community-regist',
        name: 'service-center-community-regist',
        component: () =>
          import(
            /* webpackChunkName: "service-center-community-regist" */ '@/views/serviceCenter/CommunityRegist'
          ),
      },
      {
        path: 'faq',
        name: 'service-center-faq',
        component: () =>
          import(
            /* webpackChunkName: "service-center-faq" */ '@/views/serviceCenter/Faq'
          ),
      },
      {
        path: 'productQnA',
        name: 'service-center-productQnA',
        component: () =>
          import(
            /* webpackChunkName: "service-center-productQnA" */ '@/views/serviceCenter/ProductQnA'
          ),
      },
      {
        path: 'idPwFind/:idOrPw',
        name: 'service-center-idPwFind',
        component: () =>
          import(
            /* webpackChunkName: "service-center-idPwFind" */ '@/views/serviceCenter/IdPwFind'
          ),
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
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-modify/:productId',
        name: 'product-modify',
        component: () =>
          import(
            /* webpackChunkName: "product-modify" */ '@/views/admin/productManage/ProductModify'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-list',
        name: 'product-list',
        component: () =>
          import(
            /* webpackChunkName: "product-list" */ '@/views/admin/productManage/ProductList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'category-manage',
        name: 'category-manage',
        component: () =>
          import(
            /* webpackChunkName: "category-manage" */ '@/views/admin/productManage/CategoryManage'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'order-list',
        name: 'order-list',
        component: () =>
          import(
            /* webpackChunkName: "order-list" */ '@/views/admin/orderManage/OrderList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'order-detail-info/:orderId',
        name: 'admin-order-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "admin-order-detail-info" */ '@/views/admin/orderManage/OrderDetailInfo'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'order-cancel-list',
        name: 'order-cancel-list',
        component: () =>
          import(
            /* webpackChunkName: "order-cancel-list" */ '@/views/admin/orderManage/OrderCancelList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'exchange-list',
        name: 'exchange-list',
        component: () =>
          import(
            /* webpackChunkName: "exchange-list" */ '@/views/admin/orderManage/ExchangeList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'exchange-detail/:exchangeRefundId',
        name: 'exchange-detail',
        component: () =>
          import(
            /* webpackChunkName: "exchange-detail" */ '@/views/admin/orderManage/ExchangeDetail'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'user-list',
        name: 'user-list',
        component: () =>
          import(
            /* webpackChunkName: "exchange-list" */ '@/views/admin/userManage/UserList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'user-detail-info/:username',
        name: 'admin-user-detail-info',
        component: () =>
          import(
            /* webpackChunkName: "admin-user-detail-info" */ '@/views/admin/userManage/UserDetailInfo'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'style-shop-notice',
        name: 'admin-style-shop-notice',
        component: () =>
          import(
            /* webpackChunkName: "admin-stype-shop-list-notice" */ '@/views/admin/boardManage/StyleShopNotice'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'notice-list',
        name: 'admin-notice-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-list" */ '@/views/admin/boardManage/NoticeList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'notice-regist',
        name: 'admin-notice-regist',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-regist" */ '@/views/admin/boardManage/NoticeRegist'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'notice-detail/:noticeId',
        name: 'admin-notice-detail',
        component: () =>
          import(
            /* webpackChunkName: "admin-notice-detail" */ '@/views/admin/boardManage/NoticeDetail'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'community-list',
        name: 'admin-community-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-list" */ '@/views/admin/boardManage/CommunityList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'community-regist',
        name: 'admin-community-regist',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-regist" */ '@/views/admin/boardManage/CommunityRegist'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'community-detail/:communityId',
        name: 'admin-community-detail',
        component: () =>
          import(
            /* webpackChunkName: "admin-community-detail" */ '@/views/admin/boardManage/CommunityDetail'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-comment-list',
        name: 'admin-product-comment-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-product-comment-list" */ '@/views/admin/boardManage/ProductCommentList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'mantoman-list',
        name: 'admin-mantoman-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-mantoman-list" */ '@/views/admin/boardManage/ManToManList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'product-qna-list',
        name: 'admin-product-qna-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-product-qna-list" */ '@/views/admin/boardManage/ProductQnAList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'faq-list',
        name: 'admin-faq-list',
        component: () =>
          import(
            /* webpackChunkName: "admin-faq-list" */ '@/views/admin/boardManage/FaqList'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'policy-manage',
        name: 'admin-policy',
        component: () =>
          import(
            /* webpackChunkName: "admin-policy" */ '@/views/admin/policyManage/Policy'
          ),
        meta: {
          auth: true,
        },
      },
      {
        path: 'payment-method-manage',
        name: 'admin-payment-method',
        component: () =>
          import(
            /* webpackChunkName: "admin-payment-method" */ '@/views/admin/policyManage/PaymentMethod'
          ),
        meta: {
          auth: true,
        },
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

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    alert('로그인이 필요합니다.');
    next('/authentication/sign-in');
    return;
  }

  next();
});

export default router;
