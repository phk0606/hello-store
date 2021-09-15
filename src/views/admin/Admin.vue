<template>
  <v-app>
    <admin-header />
    <admin-content />
  </v-app>
</template>

<script>
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminContent from '@/components/admin/AdminContent.vue';

export default {
  components: {
    AdminHeader,
    AdminContent,
  },
};
</script>

<style></style>
