<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2">
          <my-page-left />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import MyPageLeft from '@/components/myPage/MyPageLeft.vue';

export default {
  name: 'MyPageContent',
  components: {
    MyPageLeft,
  },
};
</script>

<style></style>
