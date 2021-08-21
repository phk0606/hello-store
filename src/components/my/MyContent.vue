<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <my-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import MyLeft from '@/components/my/MyLeft.vue';

export default {
  name: 'MyContent',
  components: {
    MyLeft,
  },
};
</script>

<style></style>
