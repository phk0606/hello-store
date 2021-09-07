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
          v-model="productProperty"
          :items="items"
          label="모아보기"
          hide-details
          outlined
          dense
          :menu-props="{ offsetY: true }"
          @change="changeProductProperty()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(content, i) in contentList"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" to="/style-shop/product-detail">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="'data:image/png;base64,' + content.image"
          >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ content.salePrice }}</div>

            <div>{{ content.productName }}</div>
            <div>{{ content.description }}</div>
          </v-card-text>
          <div class="text-center">
            <v-chip
              v-if="content.newArrival"
              class="ma-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              신상품
            </v-chip>
            <v-chip
              v-if="content.best"
              class="ma-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              Best
            </v-chip>
            <v-chip
              v-if="content.discount"
              class="ma-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              할인
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" style="text-align: center">
      <v-col cols="auto">
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
          :records="records"
          :per-page="perPage"
          @paginate="myCallback"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import ProductItem from '@/components/shop/ProductItem.vue';
import Pagination from 'vue-pagination-2';
import { getProductsPageCondition } from '@/api/shopProduct';

export default {
  name: 'ProductList',
  components: {
    // ProductItem,
    Pagination,
  },
  created() {
    this.getProductsPageCondition(1);
  },
  data() {
    return {
      productProperty: null,
      contentList: null,
      page: 1,
      records: 10,
      perPage: 6,
      items: [
        { text: '모두보기', value: '' },
        { text: '신상품', value: 'newArrival' },
        { text: 'Best', value: 'best' },
        { text: '할인', value: 'discount' },
      ],
    };
  },
  methods: {
    changeProductProperty() {
      console.log(this.productProperty);
      this.getProductsPageCondition();
    },
    async getProductsPageCondition(page) {
      try {
        const { data } = await getProductsPageCondition({
          page: page - 1,
          size: this.perPage,
          productProperty: this.productProperty,
        });
        this.contentList = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
        console.log(data);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getProductsPageCondition(page);
    },
  },
};
</script>

<style></style>
