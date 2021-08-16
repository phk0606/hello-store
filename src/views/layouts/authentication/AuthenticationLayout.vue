<template>
  <v-app>
    <authentication />
  </v-app>
</template>

<script>
import Authentication from './Authentication.vue';

export default {
  name: 'AuthenticationLayout',
  components: {
    Authentication,
  },
};
</script>

<style></style>
