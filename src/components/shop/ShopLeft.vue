<template>
  <v-card class="mx-auto" max-width="400">
    <v-subheader class="indigo lighten-4">스타일숍</v-subheader>
    <v-treeview dense activatable color="warning" :items="menus" />
    <v-subheader class="indigo lighten-4">오픈숍</v-subheader>
    <v-treeview dense activatable color="warning" :items="menus" />
  </v-card>
</template>

<script>
import { getProductCategories } from '@/api/category';

export default {
  created() {
    this.getProductCategories();
  },
  methods: {
    async getProductCategories() {
      const { data } = await getProductCategories();
      this.menus = data;
    },
  },
  data: () => ({
    items: [
      { text: 'Outer', icon: 'mdi-clock' },
      { text: 'Top', icon: 'mdi-account' },
      { text: 'Bottom', icon: 'mdi-flag' },
      { text: 'Skirt', icon: 'mdi-flag' },
      { text: 'Dress', icon: 'mdi-flag' },
    ],
    menus: [],
    model: 1,
  }),
};
</script>

<style></style>
