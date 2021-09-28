<template>
  <v-card class="mx-auto" max-width="400">
    <v-subheader class="indigo lighten-4">스타일숍</v-subheader>
    <v-treeview dense activatable color="warning" :items="menus">
      <template slot="label" slot-scope="props">
        <router-link
          :to="`/style-shop/product-list/${props.item.id}/${props.item.parentId}`"
          >{{ props.item.name }}</router-link
        >
      </template>
    </v-treeview>
    <v-subheader class="indigo lighten-4">오픈숍</v-subheader>
    <v-treeview dense activatable color="warning" :items="menus" />
  </v-card>
</template>

<script>
import { getCategories } from '@/api/category';

export default {
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const { data } = await getCategories();
      this.menus = data;
    },
  },
  data: () => ({
    menus: [],
    model: 1,
  }),
};
</script>

<style></style>
