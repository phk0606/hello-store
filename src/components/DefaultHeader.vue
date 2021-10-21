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

        <v-col cols="5">
          <v-text-field
            v-model="searchText"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="검색어를 입력하세요."
            class="hidden-xs-and-down"
          />
        </v-col>
        <v-col cols="2">
          <v-btn @click="searchProduct" color="indigo darken-3"> 검색 </v-btn>
        </v-col>
        <v-col cols="2">
          <v-row
            v-if="isUserLogin"
            class="d-flex justify-center"
            align="center"
          >
            <v-btn to="/my-page/cart" icon>
              <v-badge
                :content="`${this.$store.state.cartProductCount}`"
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
              v-if="this.$store.state.authority.includes('ROLE_ADMIN')"
              to="/admin/order-list"
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
            <v-btn small value="center" class="mr-0" to="/my-page/manToMan"
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
            <v-btn
              to="/service-center/idPwFind/id"
              small
              value="right"
              class="mr-0"
              >ID/비밀번호 찾기</v-btn
            >
            <!-- <v-btn small value="justify" class="mr-0">비회원 주문조회</v-btn> -->
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
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs">
                  <span :class="font">오픈숍</span>
                </v-btn>
              </template> -->
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
                <v-btn
                  @mouseover="getProductsPageCondition()"
                  v-on="on"
                  v-bind="attrs"
                  to="/style-shop/product-list/null/null"
                >
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
                        <v-list-item
                          :to="`/style-shop/product-list/${category.id}/${category.parentId}`"
                          v-for="(category, i) in categories"
                          :key="i"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="category.name"
                              @mouseover="getProductsPageCondition(category.id)"
                            />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="auto"
                    v-for="(content, i) in contentList"
                    :key="i"
                    align-self="center"
                  >
                    <v-card
                      flat
                      width="180"
                      max-height="250"
                      :to="`/style-shop/product-detail/${content.productId}`"
                    >
                      <v-row justify="center">
                        <v-img
                          :src="`${imageUrl}${content.fileName}`"
                          max-width="150"
                          max-height="150"
                        />
                      </v-row>
                      <v-row>
                        <v-card-text class="text--primary">
                          <div class="text-center">
                            {{ content.productName }}
                          </div>
                          <div class="text-center">
                            {{ content.salePrice }}
                          </div>
                        </v-card-text>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-menu>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" to="/company/company-info">
                  <span :class="font">헬로스토어</span>
                </v-btn>
              </template>
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-card>
            </v-menu>
            <v-btn to="/style-shop/product-comment/0">
              <span :class="font">상품평</span>
            </v-btn>
            <v-btn to="/event/event-list">
              <span :class="font">이벤트</span>
            </v-btn>
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-on="on" v-bind="attrs" to="/service-center/notice">
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
import { getCategories } from '@/api/category';
import { getProductsPageCondition } from '@/api/shopProduct';

export default {
  name: 'DefaultHeader',
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  created() {
    this.getCategories();
    const searchText = this.$route.params.searchText;
    console.log(searchText);
    if (searchText) {
      this.searchText = searchText;
    }
  },
  methods: {
    searchProduct() {
      this.$router
        .push('/style-shop/product-search/' + this.searchText)
        .catch(() => {});
    },
    async getProductsPageCondition(firstCategoryId) {
      try {
        const { data } = await getProductsPageCondition({
          page: 0,
          size: 4,
          firstCategoryId: firstCategoryId,
        });
        this.contentList = data.content;
        // console.log(data);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getCategories() {
      const { data } = await getCategories();
      this.categories = data;
    },
    logoutUser() {
      deleteCookie('ecomm_accessToken');
      deleteCookie('ecomm_refreshToken');
      deleteCookie('ecomm_user');
      deleteCookie('ecomm_authority');
      deleteCookie('ecomm_cartProductCount');
      this.$store.commit('clearUsername');
      this.$store.commit('clearAccessToken');
      this.$store.commit('clearRefreshToken');
      this.$store.commit('clearAuthority');
      this.$store.commit('clearCartProductCount');

      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      searchText: '',
      contentList: [],
      categories: [],
      cartProductCount: null,
      font: 'text-caption text-sm-body-2 text-md-body-1 text-lg-h6 text-xl-h4',
      drawer: false,
      items: [
        {
          title: '헬로스토어 소개',
          icon: 'mdi-view-dashboard',
          to: '/company/company-info',
        },
        // { title: '대표 인사말', icon: 'mdi-image', to: '/grid-system' },
        {
          title: '찾아오시는 길',
          icon: 'mdi-image',
          to: '/company/company-location',
        },
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
        { title: '자주하는질문', icon: 'mdi-flag', to: '/service-center/faq' },
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
