<template>
  <v-app>
    <default-header />
    <event-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import EventContent from '@/components/event/EventContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'Company',
  components: {
    DefaultHeader,
    EventContent,
    DefaultFooter,
  },
};
</script>

<style></style>
