<template>
  <v-app>
    <default-header />
    <shop-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import ShopContent from '@/components/shop/ShopContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

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
