<template>
  <v-container fluid>
    <v-row dense align="center">
      <v-col cols="auto">
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
      </v-col>
      <v-col cols="">
        <v-breadcrumbs :items="items2" class="pa-0">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img
          lazy-src="https://openimage.interpark.com/milti/displayclassBanner/001208/03/20210722053134.jpg"
          src="https://openimage.interpark.com/milti/displayclassBanner/001208/03/20210722053134.jpg"
          max-height="200"
        />
      </v-col>
    </v-row>
    <v-row v-if="categoryNotice" class="mb-5">
      <v-col>
        <v-card outlined elevation="1">
          <v-card-text>
            {{ categoryNotice }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="end">
      <v-col>
        <v-btn-toggle tile group no-gutters>
          <v-btn
            @click="productSort('id,desc')"
            small
            value="left"
            class="font-weight-bold"
            >신상품</v-btn
          >
          <v-divider vertical />
          <v-btn
            @click="productSort('salePrice,asc')"
            small
            value="center"
            class="font-weight-bold"
            >낮은가격</v-btn
          >
          <v-divider vertical />
          <v-btn
            @click="productSort('salePrice,desc')"
            small
            value="right"
            class="font-weight-bold"
            >높은가격</v-btn
          >
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
        <v-card
          height="100%"
          max-width="500"
          class="mx-auto"
          :to="`/style-shop/product-detail/${content.productId}`"
        >
          <v-img
            class="white--text align-end"
            max-width="500"
            :src="`${imageUrl}${content.fileName}`"
          >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
          </v-img>
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
          <v-card-text class="text--primary">
            <div v-if="content.salePrice">
              <del>{{ content.regularPrice }}</del> → {{ content.salePrice }}
            </div>
            <div v-else>{{ content.regularPrice }}</div>

            <div>{{ content.productName }}</div>
            <div>{{ content.description }}</div>
          </v-card-text>
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
import { getCategoryNotice } from '@/api/styleShopNotice';
import { getCategoryName } from '@/api/category';

export default {
  name: 'ProductList',
  components: {
    // ProductItem,
    Pagination,
  },
  async created() {
    const categoryId = this.$route.params.categoryId;
    const parentId = this.$route.params.parentId;

    console.log(categoryId, parentId);
    if (parentId === 'null' && categoryId === 'null') {
      (this.parentId = null), (this.categoryId = null);
    } else if (parentId === 'null') {
      (this.parentId = categoryId), (this.categoryId = null);
    } else {
      (this.parentId = null), (this.categoryId = categoryId);
    }

    await this.getProductsPageCondition(1);
    if (parentId !== 'null') {
      await this.getCategoryNotice();
    }
    if (parentId !== 'null' && categoryId !== 'null') {
      await this.getCategoryName();
    }
  },
  data() {
    return {
      sort: '',
      categoryNotice: '',
      categoryId: '',
      categoryName: '',
      parentId: '',
      parentName: '',
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      productProperty: null,
      contentList: null,
      page: 1,
      records: 0,
      perPage: 8,
      items: [
        { text: '모두보기', value: '' },
        { text: '신상품', value: 'newArrival' },
        { text: 'Best', value: 'best' },
        { text: '할인', value: 'discount' },
      ],
      items2: [
        {
          text: '스타일 숍',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
      ],
    };
  },
  methods: {
    productSort(columnDirection) {
      this.sort = columnDirection;
      this.getProductsPageCondition(1);
    },
    changeProductProperty() {
      console.log(this.productProperty);
      this.getProductsPageCondition();
    },
    async getCategoryName() {
      console.log(this.categoryId, this.parentId);
      try {
        const { data } = await getCategoryName({
          categoryId:
            this.categoryId !== null ? this.categoryId : this.parentId,
        });
        console.log(data);
        this.categoryName = data.name;
        this.parentName = data.parentName;

        if (data.parentName) {
          this.items2.push({
            text: data.parentName,
            disabled: false,
            href: 'breadcrumbs_link_1',
          });
        }
        this.items2.push({
          text: data.name,
          disabled: false,
          href: 'breadcrumbs_link_1',
        });
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getCategoryNotice() {
      console.log(this.categorySelected);
      try {
        const { data } = await getCategoryNotice({
          categoryId: this.categoryId,
        });
        console.log(data);
        this.categoryNotice = data.content;
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getProductsPageCondition(page) {
      try {
        const { data } = await getProductsPageCondition({
          page: page - 1,
          size: this.perPage,
          sort: this.sort,
          productProperty: this.productProperty,
          firstCategoryId: this.parentId,
          secondCategoryId: this.categoryId,
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
