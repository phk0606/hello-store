<template>
  <v-app>
    <default-header />
    <default-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from './DefaultHeader.vue';
import DefaultContent from './DefaultContent.vue';
import DefaultFooter from './DefaultFooter.vue';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    DefaultContent,
    DefaultFooter,
  },
};
</script>

<style></style>
