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
        <v-list-item to="/admin/community-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>커뮤니티</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/product-qna-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품 문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/mantoman-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>1:1 문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/product-comment-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품평</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/faq-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>자주하는 질문</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/event-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>이벤트</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <router-link to="/admin/product-regist"
          ><v-subheader>허위 상품 접수</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>게시판 카테고리 관리</v-subheader></router-link
        > -->
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
