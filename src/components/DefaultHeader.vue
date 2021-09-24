<template>
  <v-app-bar height="230" class="" app color="red accent-2" dark src="">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="3">
          <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
          <router-link to="/">
            <v-img
              lazy-src="@/assets/logo.jpg"
              max-height="100"
              min-height="100"
              max-width="110"
              min-width="110"
              src="@/assets/logo.png"
            />
          </router-link>
        </v-col>
        <!-- <v-spacer />
          <v-col cols="2">
            <v-select :items="selectItems" hide-details label="전체검색" />
          </v-col> -->
        <v-col cols="5">
          <v-text-field
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="검색어를 입력하세요."
            class="hidden-xs-and-down"
          />
        </v-col>
        <v-col cols="2">
          <v-btn color="indigo darken-3"> 검색 </v-btn>
        </v-col>
        <v-col cols="2">
          <v-row
            v-if="isUserLogin"
            class="d-flex justify-center"
            align="center"
          >
            <v-btn to="/my-page/cart" icon>
              <v-badge
                :content="this.$store.state.cartProductCount"
                color="indigo"
                overlap
              >
                <v-icon large>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
            <v-btn to="/my-page/order-info" icon>
              <v-icon large>mdi-account</v-icon>
            </v-btn>
            <v-btn
              v-if="this.$store.state.authority === 'ROLE_ADMIN'"
              to="/admin/product-regist"
              icon
            >
              <v-icon large>mdi-account-tie</v-icon>
            </v-btn>
            ({{ this.$store.state.username }})
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="isUserLogin" justify="end" no-gutters>
        <v-col cols="auto">
          <v-btn-toggle group dense>
            <v-btn small value="left" class="mr-0" to="/my-page/order-info"
              >주문 내역</v-btn
            >
            <v-btn
              small
              value="center"
              class="mr-0"
              to="/authentication/sign-in"
              >1:1문의</v-btn
            >
            <v-btn @click="logoutUser" small value="right" class="mr-0"
              >로그아웃</v-btn
            >
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row v-else justify="end" no-gutters>
        <v-col cols="auto">
          <v-btn-toggle group dense>
            <v-btn small value="left" class="mr-0" to="/authentication/sign-up"
              >회원가입</v-btn
            >
            <v-btn
              small
              value="center"
              class="mr-0"
              to="/authentication/sign-in"
              >로그인</v-btn
            >
            <v-btn small value="right" class="mr-0">ID/비밀번호 찾기</v-btn>
            <v-btn small value="justify" class="mr-0">비회원 주문조회</v-btn>
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
            <v-menu open-on-hover offset-y min-width="1000">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs">
                  <span :class="font">오픈숍</span>
                </v-btn>
              </template>
              <v-container class="white" fluid>
                <v-row>
                  <v-col>
                    <span>최근등록상품</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-list flat>
                      <v-list-item-group v-model="selectedItem" color="primary">
                        <v-list-item v-for="(item, i) in items2" :key="i">
                          <!-- <v-list-item-icon>
                              <v-icon v-text="item.icon" />
                            </v-list-item-icon> -->
                          <v-list-item-content>
                            <v-list-item-title v-text="item.text" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="10"
                    class="d-flex flex-no-wrap"
                    align-self="center"
                  >
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-menu>
            <v-menu open-on-hover offset-y min-width="1000">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs" to="/style-shop/product-list">
                  <span :class="font">스타일숍</span>
                </v-btn>
              </template>
              <v-container class="white" fluid>
                <v-row>
                  <v-col>
                    <span>최근등록상품</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-list flat>
                      <v-list-item-group v-model="selectedItem" color="primary">
                        <v-list-item v-for="(item, i) in items2" :key="i">
                          <!-- <v-list-item-icon>
                              <v-icon v-text="item.icon" />
                            </v-list-item-icon> -->
                          <v-list-item-content>
                            <v-list-item-title v-text="item.text" />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="10"
                    class="d-flex flex-no-wrap"
                    align-self="center"
                  >
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                    <v-img
                      src="@/assets/logo.jpg"
                      max-width="150"
                      max-height="150"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">헬로스토어</span>
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
              <span :class="font">상품평</span>
            </v-btn>
            <v-btn href="/blog">
              <span :class="font">이벤트</span>
            </v-btn>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <span :class="font">고객센터</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(serviceCenterMenu, index) in serviceCenterMenus"
                  :key="index"
                  :to="serviceCenterMenu.to"
                >
                  <v-list-item-title>{{
                    serviceCenterMenu.title
                  }}</v-list-item-title>
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
// import { getCartProductCount } from '@/api/cart';

export default {
  name: 'DefaultHeader',
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  created() {},
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
      cartProductCount: null,
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
      serviceCenterMenus: [
        { title: '공지사항', icon: 'mdi-clock', to: '/service-center/notice' },
        {
          title: '커뮤니티',
          icon: 'mdi-account',
          to: '/service-center/community',
        },
        { title: '자주하는질문', icon: 'mdi-flag' },
        {
          title: '상품문의',
          icon: 'mdi-flag',
          to: '/service-center/productQnA',
        },
      ],
    };
  },
};
</script>

<style></style>
