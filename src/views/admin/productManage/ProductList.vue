<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-product-left />
      </v-col>
      <v-col cols="10">
        <v-row dense align="center">
          <v-col cols="auto">
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-col>
          <v-col cols="">
            <v-breadcrumbs :items="items" class="pa-0">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              스타일 숍 상품 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="center">
          <v-col cols="auto"> 상품명 </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="productName"
              dense
              hide-details
              outlined
              clearable
            >
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getProductsPageCondition(1)"
              >검색</v-btn
            >
          </v-col>
          <v-col cols="auto">
            <v-btn small text @click="detailSearchShow">상세 검색</v-btn>
          </v-col>
        </v-row>
        <transition name="fade">
          <v-row>
            <v-card v-show="detailSearchShowYn">
              <v-container>
                <v-row dense align="center" justify="center">
                  <v-col cols="auto">카테고리 선택</v-col>
                  <v-col cols="2">
                    <v-select
                      label="카테고리 선택"
                      v-model="category1Select"
                      :items="category1"
                      outlined
                      hide-details
                      dense
                      @change="changeCategory"
                      :menu-props="{ offsetY: true }"
                    />
                  </v-col>

                  <v-col cols="3">
                    <v-select
                      v-model="category2Select"
                      :items="category2"
                      label="카테고리 선택"
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                    />
                  </v-col>
                  <v-col cols="auto" class="ml-5">판매 가격</v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="salePriceMin"
                      dense
                      hide-details
                      outlined
                      suffix="원"
                    />
                  </v-col>
                  <v-col cols="auto">~</v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="salePriceMax"
                      dense
                      hide-details
                      outlined
                      suffix="원"
                    />
                  </v-col>
                </v-row>
                <v-row dense align="center" justify="center">
                  <v-col cols="auto">상품 등록일</v-col>
                  <v-col cols="2">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date1"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker v-model="date1" @input="menu = false" />
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date2"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker v-model="date2" @input="menu2 = false" />
                    </v-menu>
                  </v-col>
                  <v-col cols="auto" class="ml-5">진열 여부</v-col>
                  <v-col cols="auto" class="d-flex">
                    <v-checkbox
                      v-model="productShowTypes"
                      value="SHOW"
                      dense
                      hide-details
                      label="진열"
                      class="mr-2"
                    />
                    <v-checkbox
                      v-model="productShowTypes"
                      value="SOLDOUT"
                      dense
                      hide-details
                      label="품절"
                      class="mr-2"
                    />
                    <v-checkbox
                      v-model="productShowTypes"
                      value="HIDE"
                      dense
                      hide-details
                      label="숨김"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-row>
        </transition>
        <v-divider />
        <v-row>
          <v-col
            >총 등록 상품: {{ productCount }} 개/검색된 상품:
            {{ records }}개</v-col
          >
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="contentList"
              item-key="productId"
              show-select
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.image`]="{ item }">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-img
                        :src="`${imageUrl}${item.fileName}`"
                        style="width: 100px; height: 100px"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-row>{{ item.categoryName }}</v-row>
                <v-row>{{ item.name }}</v-row>
              </template>
              <template v-slot:[`item.createdDate`]="{ item }">
                <v-row>{{ item.createdDate }}</v-row>
                <v-row>({{ item.lastModifiedDate }})</v-row>
              </template>
              <template v-slot:[`item.productShowType`]="{ item }">
                <v-row justify="center">
                  {{ item.productShowTypeValue }}
                </v-row>
              </template>
              <template v-slot:[`item.modify`]="{ item }">
                <v-row
                  ><v-btn :to="`/admin/product-modify/${item.productId}`"
                    >수정</v-btn
                  ></v-row
                >
              </template>
            </v-data-table>
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
                  count:
                    '전체 {count} 개중 {from} 부터 {to}  |{count} 개| 1 개',
                },
              }"
              v-model="page"
              :records="records"
              :per-page="perPage"
              @paginate="myCallback"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="mr-5" @click="removeProducts">삭제</v-btn>
            <v-btn class="mr-5" @click="modifyProductShowType('SHOW')"
              >진열</v-btn
            >
            <v-btn class="mr-5" @click="modifyProductShowType('HIDE')"
              >숨김</v-btn
            >
            <v-btn class="mr-5" @click="modifyProductShowType('SOLDOUT')"
              >품절</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminProductLeft from '@/components/admin/AdminProductLeft.vue';
import Pagination from 'vue-pagination-2';
import {
  getProductCount,
  getProductsPageCondition,
  removeProducts,
  modifyProductShowType,
} from '@/api/product';
import { getCategory } from '@/api/category';

export default {
  async created() {
    // this.getProducts();
    //this.getProductsPage(1);
    await this.getProductsPageCondition(1);
    await this.getProductCount();
    await this.getCategory();
  },
  components: {
    Pagination,
    AdminProductLeft,
  },
  computed: {
    // itemsWithSno() {
    //   return this.contentList.map((d, index) => ({ ...d, sno: index + 1 }));
    // },
  },
  data() {
    return {
      productCount: 0,
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      productShowTypes: [''],
      salePriceMin: '',
      salePriceMax: '',
      productName: '',
      category1Select: null,
      category2Select: null,
      category1: [],
      category2: [],
      detailSearchShowYn: false,
      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'productId',
        },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '카테고리와 상품명', align: 'center', value: 'name' },
        { text: '판매 가격(적립금)', align: 'center', value: 'salePrice' },
        // { text: '재고 수량', align: 'center', value: 'stockQuantity' },
        { text: '진열상태', align: 'center', value: 'productShowType' },
        { text: '등록일(수정일)', align: 'center', value: 'createdDate' },
        { text: '아이디', align: 'center', value: 'createBy' },
        { text: '조회수', align: 'center', value: 'clickCount' },
        { text: '수정', align: 'center', value: 'modify' },
      ],
      contentList: [],
      date1: '',
      date2: '',
      menu: false,
      menu2: false,
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '스타일 숍',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    changeCategory() {
      this.getCategory();
    },
    async getCategory() {
      const { data } = await getCategory({
        parentId: this.category1Select,
      });
      if (this.category1Select == null) {
        this.category1 = data;
      } else {
        this.category2 = data;
        this.category2Select = null;
        console.log(data);
        //this.category2Select = data[0].value;
      }
    },
    async getProductCount() {
      const { data } = await getProductCount({});
      this.productCount = data;
    },
    async modifyProductShowType(productShowType) {
      const products = this.selected;
      const productIds = [];

      for (const key in products) {
        const productId = products[key].productId;
        console.log(productId);
        productIds.push(productId);
      }
      try {
        await modifyProductShowType({
          productIds,
          productShowType: productShowType,
        });
        //console.log(data);
        this.selected = [];
        this.getProductsPageCondition(1);
      } catch (error) {
        console.log(error.response);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeProducts() {
      const products = this.selected;
      const productIds = [];

      for (const key in products) {
        const productId = products[key].productId;
        console.log(productId);
        productIds.push(productId);
      }
      try {
        await removeProducts({
          productIds,
        });
        //console.log(data);
        this.selected = [];
        await this.getProductsPageCondition(1);
        await this.getProductCount();
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getProductsPageCondition(page);
    },
    detailSearchShow() {
      this.detailSearchShowYn = !this.detailSearchShowYn;
      if (this.detailSearchShowYn) {
        this.date1 = new Date(new Date().setDate(new Date().getDate() - 3))
          .toISOString()
          .substr(0, 10);
        this.date2 = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000,
        )
          .toISOString()
          .substr(0, 10);
      } else {
        this.date1 = '';
        this.date2 = '';
      }
    },
    async getProductsPageCondition(page) {
      try {
        const { data } = await getProductsPageCondition({
          page: page - 1,
          size: this.perPage,
          productName: this.productName,
          firstCategoryId:
            this.category1Select === null ? '' : this.category1Select,
          secondCategoryId:
            this.category2Select === null ? '' : this.category2Select,
          salePriceMin: this.salePriceMin,
          salePriceMax: this.salePriceMax,
          productShowTypes: this.productShowTypes.join(','),

          productRegistryDateA: this.date1,
          productRegistryDateB: this.date2,
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
  },
};
</script>

<style>
.v-input__prepend-outer {
  margin: 0 !important;
  align-self: center;
}
.v-input {
  margin-top: 0 !important;
}
label {
  margin-bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
