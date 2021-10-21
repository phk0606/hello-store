<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          상품 검색
        </v-chip>
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
        <v-card
          max-width="300"
          class="mx-auto"
          :to="`/style-shop/product-detail/${content.productId}`"
        >
          <v-img
            class="white--text align-end"
            height="300px"
            width="300px"
            :src="`${imageUrl}${content.fileName}`"
          >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ content.salePrice }}</div>

            <div>{{ content.productName }}</div>
            <div>{{ content.description }}</div>
          </v-card-text>
          <div class="text-left">
            <v-chip
              v-if="content.newArrival"
              class="ml-2"
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
              class="ml-2"
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
              class="ml-2"
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
    this.searchText = this.$route.params.searchText;

    this.getProductsPageCondition(1);
  },
  data() {
    return {
      searchText: '',
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      productProperty: null,
      contentList: null,
      page: 1,
      records: 0,
      perPage: 6,
    };
  },
  methods: {
    async getProductsPageCondition(page) {
      try {
        const { data } = await getProductsPageCondition({
          page: page - 1,
          size: this.perPage,
          productName: this.searchText,
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
