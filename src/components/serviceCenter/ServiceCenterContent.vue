<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <service-center-left />
        </v-col>
        <v-col cols="10">
          <router-view :key="$route.fullPath" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ServiceCenterLeft from '@/components/serviceCenter/ServiceCenterLeft.vue';

export default {
  name: 'ServiceCenterContent',
  components: {
    ServiceCenterLeft,
  },
};
</script>

<style></style>
