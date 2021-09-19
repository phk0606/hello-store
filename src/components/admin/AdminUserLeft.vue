<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          회원 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <router-link to="/admin/user-list"
          ><v-subheader>회원 리스트</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>탈퇴 회원 리스트</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>메일 관리</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>SMS 관리</v-subheader></router-link
        >
        <router-link to="/admin/product-regist"
          ><v-subheader>대량 메일 발송</v-subheader></router-link
        >
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
