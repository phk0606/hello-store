<template>
  <v-app>
    <default-header />
    <service-center-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import ServiceCenterContent from '@/components/serviceCenter/ServiceCenterContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'ServiceCenter',
  components: {
    DefaultHeader,
    ServiceCenterContent,
    DefaultFooter,
  },
};
</script>

<style></style>
