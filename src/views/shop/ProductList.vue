<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img
          lazy-src="https://openimage.interpark.com/milti/displayclassBanner/001208/03/20210722053134.jpg"
          src="https://openimage.interpark.com/milti/displayclassBanner/001208/03/20210722053134.jpg"
          max-height="200"
        />
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-col>
        <v-card outlined elevation="1">
          <v-card-title> 신상품 입고 안내 </v-card-title>
          <v-card-text>
            기모 티셔츠 상품이 새로 입고되었습니다 . 새로 입고된 상품은 Season
            Off 상품이지만 가격 대비 품질이 우수하여 선보이게 되었습니다
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <product-item-list />
  </v-container>
</template>

<script>
import ProductItemList from '@/views/shop/ProductItemList.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItemList,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
