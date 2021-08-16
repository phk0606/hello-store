<template>
  <v-app>
    <default-header />
    <shop-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/views/layouts/DefaultHeader.vue';
import ShopContent from './ShopContent.vue';
import DefaultFooter from '@/views/layouts/DefaultFooter.vue';

export default {
  name: 'ShopLayout',
  components: {
    DefaultHeader,
    ShopContent,
    DefaultFooter,
  },
};
</script>

<style></style>
