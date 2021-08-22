<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="2">
            <admin-page-left />
          </v-col>
          <v-col cols="10">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AdminPageLeft from '@/components/admin/AdminPageLeft.vue';

export default {
  components: {
    AdminPageLeft,
  },
};
</script>

<style></style>
