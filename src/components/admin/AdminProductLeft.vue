<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          상품 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <v-list-item to="/admin/product-regist">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품 등록</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/product-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>상품 리스트</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/stock-quantity-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>재고 리스트</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/category-manage">
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>카테고리 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AdminProductLeft',
  data: () => ({
    model: 1,
  }),
};
</script>

<style></style>
