<template>
  <v-app>
    <default-header />
    <company-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import CompanyContent from '@/components/company/CompanyContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'Company',
  components: {
    DefaultHeader,
    CompanyContent,
    DefaultFooter,
  },
};
</script>

<style></style>
