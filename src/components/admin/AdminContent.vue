<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <admin-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AdminLeft from '@/components/admin/AdminLeft.vue';

export default {
  name: 'AdminContent',
  components: {
    AdminLeft,
  },
};
</script>

<style></style>
