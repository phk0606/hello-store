<template>
  <v-app>
    <default-header />
    <my-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import MyContent from '@/components/myPage/MyPageContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'MyPage',
  components: {
    DefaultHeader,
    MyContent,
    DefaultFooter,
  },
};
</script>

<style></style>
