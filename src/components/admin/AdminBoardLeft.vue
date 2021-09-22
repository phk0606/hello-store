<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          게시판 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <v-subheader>공지 사항</v-subheader>
        <v-list-item to="/admin/style-shop-notice">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>스타일 숍 공지</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/notice-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>고객 센터 공지</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <router-link to="/admin/community-list"
          ><v-subheader>커뮤니티</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>상품 문의</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>1:1 문의</v-subheader></router-link
        >
        <router-link to="/admin/product-comment-list"
          ><v-subheader>상품평</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>자주하는 질문</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>이벤트</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>허위 상품 접수</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>게시판 카테고리 관리</v-subheader></router-link
        >
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AdminProductLeft',
  data: () => ({}),
};
</script>

<style></style>
