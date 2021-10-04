<template>
  <v-app-bar height="120" class="" app color="red accent-2" dark src="">
    <v-container fluid>
      <v-row v-if="isUserLogin" justify="end" align="center">
        <v-col> <h2>Hello Store 관리</h2></v-col>
        <v-col cols="auto">
          <v-btn-toggle group dense>
            <v-btn small value="left" class="mr-0" to="/"
              >이용자 화면 보기</v-btn
            >
            <v-btn
              small
              value="center"
              class="mr-0"
              to="/authentication/sign-in"
              >사내 게시판</v-btn
            >
            <v-btn @click="logoutUser" small value="right" class="mr-0"
              >로그아웃</v-btn
            >
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-bottom-navigation
            class="justify-space-around"
            background-color="indigo darken-2"
            dark
            app
          >
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">주문 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in orderManageMenu"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">상품 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in productManageMenu"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">회원 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in userManageMenu"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">게시판 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in boardManageMenu"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">메인 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item href="/shop">
                  <v-list-item-title />
                </v-list-item>
              </v-card>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">배너 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item href="/shop">
                  <v-list-item-title />
                </v-list-item>
              </v-card>
            </v-menu>

            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">통계</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item href="/shop">
                  <v-list-item-title />
                </v-list-item>
              </v-card>
            </v-menu>

            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">정책 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in policyManageMenu"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
          </v-bottom-navigation>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'AdmintHeader',
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUsername');
      this.$store.commit('clearAccessToken');
      this.$store.commit('clearRefreshToken');
      this.$store.commit('clearAuthority');
      this.$store.commit('clearCartProductCount');
      deleteCookie('ecomm_accessToken');
      deleteCookie('ecomm_refreshToken');
      deleteCookie('ecomm_user');
      deleteCookie('ecomm_authority');
      deleteCookie('ecomm_cartProductCount');
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
  data() {
    return {
      font: 'text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4',
      drawer: false,
      selectedItem: 1,

      productManageMenu: [
        { title: '상품 등록', icon: 'mdi-clock', to: '/admin/product-regist' },
        {
          title: '상품 리스트',
          icon: 'mdi-account',
          to: '/admin/product-list',
        },
        {
          title: '카테고리 관리',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
      ],
      orderManageMenu: [
        {
          title: '주문 리스트',
          icon: 'mdi-clock',
          to: '/admin/order-list',
        },
        {
          title: '주문 취소 리스트',
          icon: 'mdi-account',
          to: '/admin/order-cancel-list',
        },
        {
          title: '교환/환불 신청 리스트',
          icon: 'mdi-flag',
          to: '/admin/exchange-list',
        },
      ],
      userManageMenu: [
        { title: '회원 리스트', icon: 'mdi-clock', to: '/admin/user-list' },
        {
          title: '탈퇴 회원 리스트',
          icon: 'mdi-account',
          to: '/admin/product-list',
        },
        {
          title: '메일 관리',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
        {
          title: 'SMS 관리',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
        {
          title: '대용량 메일 발송',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
      ],
      boardManageMenu: [
        {
          title: '스타일 숍 공지',
          icon: 'mdi-clock',
          to: '/admin/style-shop-notice',
        },
        {
          title: '고객 센터 공지',
          icon: 'mdi-account',
          to: '/admin/notice-list',
        },
        {
          title: '커뮤니티',
          icon: 'mdi-flag',
          to: '/admin/community-list',
        },
        {
          title: '상품 문의',
          icon: 'mdi-flag',
          to: '/admin/product-qna-list',
        },
        {
          title: '1:1 문의',
          icon: 'mdi-flag',
          to: '/admin/mantoman-list',
        },
        {
          title: '상품평',
          icon: 'mdi-flag',
          to: '/admin/product-comment-list',
        },
        {
          title: '자주 하는 질문',
          icon: 'mdi-flag',
          to: '/admin/faq-list',
        },
        {
          title: '이벤트',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
        {
          title: '허위 상품 접수',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
        {
          title: '게시판 카테고리 관리',
          icon: 'mdi-flag',
          to: '/admin/category-manage',
        },
      ],
      policyManageMenu: [
        {
          title: '약관',
          icon: 'mdi-clock',
          to: '/admin/policy-manage',
        },
        {
          title: '정책',
          icon: 'mdi-clock',
          to: '/admin/policy-manage',
        },
        {
          title: '결제 방법',
          icon: 'mdi-clock',
          to: '/admin/payment-method-manage',
        },
        {
          title: '메뉴 접근 권한',
          icon: 'mdi-clock',
          to: '/admin/policy-manage',
        },
      ],
    };
  },
};
</script>

<style></style>
