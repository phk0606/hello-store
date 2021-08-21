<template>
  <v-app>
    <default-header />
    <my-content />
    <default-footer />
  </v-app>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader.vue';
import MyContent from '@/components/my/MyContent.vue';
import DefaultFooter from '@/components/DefaultFooter.vue';

export default {
  name: 'MyLayout',
  components: {
    DefaultHeader,
    MyContent,
    DefaultFooter,
  },
};
</script>

<style></style>
