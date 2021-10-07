<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <company-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import CompanyLeft from '@/components/company/CompanyLeft.vue';

export default {
  name: 'CompanyContent',
  components: {
    CompanyLeft,
  },
};
</script>

<style></style>
