<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-order-left />
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
              스타일 숍 주문 관리
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="center">
          <v-col cols="auto"> 상품명 </v-col>
          <v-col cols="3">
            <v-text-field v-model="productName" dense hide-details outlined>
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getProductsPageCondition(1)"
              >검색</v-btn
            >
          </v-col>
        </v-row>
        <v-divider />
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
              <template v-slot:[`item.name`]="{ item }">
                <v-row>{{ item.categoryName }}</v-row>
                <v-row>{{ item.name }}</v-row>
              </template>
              <template v-slot:[`item.createdDate`]="{ item }">
                <v-row>{{ item.createdDate }}</v-row>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';
import Pagination from 'vue-pagination-2';
import { getOrders } from '@/api/order';

export default {
  created() {
    // this.getProducts();
    //this.getProductsPage(1);
    this.getOrders();
  },
  components: {
    Pagination,
    AdminOrderLeft,
  },
  computed: {
    // itemsWithSno() {
    //   return this.contentList.map((d, index) => ({ ...d, sno: index + 1 }));
    // },
  },
  data() {
    return {
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
      records: 10,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '주문 번호',
          align: 'center',
          sortable: false,
          value: 'orderId',
        },
        { text: '유형', align: 'center', sortable: false, value: 'image' },
        { text: '주문 일시', align: 'center', value: 'createdDate' },
        { text: '주문 상품', align: 'center', value: 'productName' },
        { text: '주문자(아이디)', align: 'center', value: 'name' },
        { text: '결제 금액', align: 'center', value: 'paymentPrice' },
        { text: '결제 상태', align: 'center', value: 'paymentStatus' },
      ],
      contentList: [],
      date1: '',
      date2: '',
      menu: false,
      menu2: false,
      items: [
        {
          text: '주문 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '스타일 숍 주문 관리',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getProductsPageCondition(page);
    },

    async getOrders(page) {
      try {
        const { data } = await getOrders({
          page: page - 1,
          size: this.perPage,

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
