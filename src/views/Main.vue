<template>
  <v-app>
    <default-header />
    <main-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import MainContent from '@/components/MainContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
    MainContent,
    DefaultFooter,
  },
};
</script>

<style></style>
