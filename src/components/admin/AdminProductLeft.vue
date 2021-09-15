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
        <router-link to="/admin/product-regist"
          ><v-subheader>상품 등록</v-subheader></router-link
        >
        <v-subheader>상품 리스트</v-subheader>
        <v-list-item to="/admin/product-list">
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>스타일 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>오픈 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list dense>
      <v-list-item-group>
        <v-subheader>카테고리 관리</v-subheader>
        <v-list-item to="/admin/category-manage">
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>스타일 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>오픈 숍</v-list-item-title>
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
