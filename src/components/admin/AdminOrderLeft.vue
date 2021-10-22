<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          주문 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <v-list-item to="/admin/order-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>주문 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/order-cancel-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>주문 취소 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/exchange-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>교환/반품 신청</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AdminOrderLeft',
  data: () => ({
    model: 1,
  }),
};
</script>

<style></style>
