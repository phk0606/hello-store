<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          기본 정책 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <!-- <router-link to="/admin/order-list"
          ><v-subheader>약관</v-subheader></router-link
        > -->
        <v-list-item to="/admin/policy-manage">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>정책</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/admin/payment-method-manage">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>결제 방법</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <router-link to="/admin/exchange-list"
          ><v-subheader>메뉴 접근 권한</v-subheader></router-link
        > -->
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
