<template>
  <v-app-bar height="120" class="" app color="red accent-2" dark src="">
    <v-container fluid>
      <v-row v-if="isUserLogin" justify="end" align="center">
        <v-col> <h2>Hello Store 관리</h2></v-col>
        <v-col cols="auto">
          <v-btn-toggle group dense>
            <v-btn small value="left" class="mr-0" to="/authentication/sign-up"
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
                  v-for="(item, index) in items"
                  :key="index"
                  href="/shop"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-btn href="/blog">
              <span :class="font">게시판 관리</span>
            </v-btn>
            <v-btn href="/blog">
              <span :class="font">회원 관리</span>
            </v-btn>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">메인 관리</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in items3"
                  :key="index"
                  href="/shop"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                <v-list-item
                  v-for="(item, index) in items3"
                  :key="index"
                  href="/shop"
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
                  v-for="(item, index) in items3"
                  :key="index"
                  href="/shop"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                <v-list-item
                  v-for="(item, index) in items3"
                  :key="index"
                  href="/shop"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                  v-for="(item, index) in items3"
                  :key="index"
                  href="/shop"
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
      deleteCookie('ecomm_accessToken');
      deleteCookie('ecomm_refreshToken');
      deleteCookie('ecomm_user');
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
  data() {
    return {
      font: 'text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4',
      drawer: false,
      selectItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items: [
        { title: '헬로스토어 소개', icon: 'mdi-view-dashboard', to: '/' },
        { title: '대표 인사말', icon: 'mdi-image', to: '/grid-system' },
        { title: '찾아오시는 길', icon: 'mdi-image', to: '/grid-system' },
      ],
      selectedItem: 1,
      items2: [
        { text: 'Outer', icon: 'mdi-clock' },
        { text: 'Top', icon: 'mdi-account' },
        { text: 'Bottom', icon: 'mdi-flag' },
        { text: 'Skirt', icon: 'mdi-flag' },
        { text: 'Dress', icon: 'mdi-flag' },
      ],
      items3: [
        { title: '공지사항', icon: 'mdi-clock' },
        { title: '커뮤니티', icon: 'mdi-account' },
        { title: '자주하는질문', icon: 'mdi-flag' },
        { title: '상품문의', icon: 'mdi-flag' },
      ],
    };
  },
};
</script>

<style></style>
