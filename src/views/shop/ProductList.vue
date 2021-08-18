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
    <v-row justify="space-between" align="end">
      <v-col>
        <v-btn-toggle tile group no-gutters>
          <v-btn small value="left" class="font-weight-bold">신상품</v-btn>
          <v-divider vertical />
          <v-btn small value="center" class="font-weight-bold">낮은가격</v-btn>
          <v-divider vertical />
          <v-btn small value="right" class="font-weight-bold">높은가격</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="3">
        <v-select
          :items="items"
          label="모아보기"
          hide-details
          outlined
          dense
          :menu-props="{ offsetY: true }"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="i in 20" :key="i" cols="12" sm="6" md="4" lg="3">
        <product-item />
      </v-col>
    </v-row>
    <v-row justify="center" style="text-align: center">
      <v-col cols="auto">
        <!-- <v-pagination
          v-model="page"
          :length="80"
          :total-visible="7"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          circle
          color="indigo darken-3"
        /> -->
        <pagination
          :options="{
            theme: 'bootstrap4',
            edgeNavigation: true,
            texts: {
              first: '처음',
              last: '마지막',
              count: '전체 {count} 개중 {from} 부터 {to}  |{count} 개| 1 개',
            },
          }"
          v-model="page"
          :records="500"
          :per-page="20"
          @paginate="myCallback"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductItem from '@/components/shop/ProductItem.vue';
import Pagination from 'vue-pagination-2';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
    Pagination,
  },
  data() {
    return {
      page: 1,
      items: [
        { text: '신상품', value: 'newArrival' },
        { text: 'Best', value: 'best' },
        { text: '할인', value: 'discount' },
      ],
    };
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
  },
};
</script>

<style></style>
