<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <event-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import EventLeft from '@/components/event/EventLeft.vue';

export default {
  name: 'EventContent',
  components: {
    EventLeft,
  },
};
</script>

<style></style>
