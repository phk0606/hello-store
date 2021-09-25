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
        <router-link to="/admin/order-list"
          ><v-subheader>약관</v-subheader></router-link
        >
        <router-link to="/admin/policy-manage"
          ><v-subheader>정책</v-subheader></router-link
        >
        <router-link to="/admin/exchange-list"
          ><v-subheader>결제 방법</v-subheader></router-link
        >
        <router-link to="/admin/exchange-list"
          ><v-subheader>메뉴 접근 권한</v-subheader></router-link
        >
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
