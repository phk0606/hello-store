<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          마이페이지
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense>
      <v-list-item-group>
        <v-subheader>쇼핑 이용 정보</v-subheader>
        <v-list-item to="/my-page/order-info">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>주문 내역</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/cart">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>장바구니</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/point-history">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>포인트 이용 내역</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/exchange-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>교환/반품 내역</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- <v-list dense>
      <v-list-item-group>
        <v-subheader>오픈숍 상품 관리</v-subheader>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품 등록하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>등록된 상품(00개)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>주문 내역</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>판매 완료</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list> -->
    <v-list dense>
      <v-list-item-group>
        <v-subheader>게시판 이용 내역</v-subheader>
        <v-list-item to="/my-page/manToMan">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>1:1 문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/product-comment">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>나의 상품평</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/product-qna">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>나의 상품 문의</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list dense>
      <v-list-item-group>
        <v-subheader>개인 정보 수정</v-subheader>
        <v-list-item to="/my-page/my-info">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>개인 정보 수정</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/my-page/password">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>비밀 번호 변경</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'MyPageLeft',
  data: () => ({}),
};
</script>

<style></style>
