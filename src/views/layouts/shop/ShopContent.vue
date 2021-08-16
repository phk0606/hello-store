<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <shop-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ShopLeft from '@/views/layouts/shop/ShopLeft.vue';

export default {
  name: 'ShopContent',
  components: {
    ShopLeft,
  },
};
</script>

<style></style>
