<template>
  <v-app>
    <default-header />
    <main-content />
    <default-footer />
  </v-app>
</template>

<script>
export default {
  name: 'MainPage',
  components: {
    DefaultHeader: () =>
      import(
        /* webpackChunkName: "default-header" */ '@/components/DefaultHeader'
      ),
    MainContent: () =>
      import(/* webpackChunkName: "main-content" */ '@/components/MainContent'),
    DefaultFooter: () =>
      import(
        /* webpackChunkName: "default-footer" */ '@/components/DefaultFooter'
      ),
  },
};
</script>

<style></style>
