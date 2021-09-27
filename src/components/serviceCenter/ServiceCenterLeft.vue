<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          고객 센터
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense>
      <v-list-item-group>
        <v-list-item to="/service-center/notice">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/service-center/community">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>커뮤니티</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>자주 하는 질문</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/service-center/productQnA">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품 문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/service-center/idPwFind">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>아이디 찾기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/service-center/idPwFind">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>비밀번호 찾기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'MyPageLeft',
  data: () => ({
    items: [
      { text: 'Outer', icon: 'mdi-clock' },
      { text: 'Top', icon: 'mdi-account' },
      { text: 'Bottom', icon: 'mdi-flag' },
      { text: 'Skirt', icon: 'mdi-flag' },
      { text: 'Dress', icon: 'mdi-flag' },
    ],

    model: 1,
  }),
};
</script>

<style></style>
