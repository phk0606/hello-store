<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          교환/환불 신청
        </v-chip>
      </v-col>
    </v-row>

    <v-row dense align="center" justify="start">
      <v-col cols="auto">신청일</v-col>
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
      <v-col cols="auto" class="ml-5"> 키워드 검색 </v-col>
      <v-col cols="2">
        <v-select
          label="항목 선택"
          v-model="searchSelected"
          :items="searchKeyword"
          outlined
          hide-details
          dense
          :menu-props="{ offsetY: true }"
        />
      </v-col>
      <v-col cols="auto">
        <v-text-field v-model="searchText" dense hide-details outlined>
          <template v-slot:prepend> <v-card width="10" flat /></template>
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="indigo" dark @click="getExchangeRefunds(1)">검색</v-btn>
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
          item-key="exchangeRefundId"
          show-select
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.productName`]="{ item }">
            <v-row>{{ item.exchangeRefundProducts[0].productName }}</v-row>
            <v-row
              v-if="
                item.exchangeRefundProductCount &&
                item.exchangeRefundProductCount >= 2
              "
              >외 {{ item.exchangeRefundProductCount - 1 }} 개</v-row
            >
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-row>{{ item.name }}</v-row>
            <v-row>({{ item.username }})</v-row>
          </template>

          <template v-slot:[`item.exchangeRefundTypeValue`]="{ item }">
            <v-row>{{
              item.exchangeRefundProducts[0].exchangeRefundTypeValue
            }}</v-row>
            <v-row
              v-if="
                item.exchangeRefundProductCount &&
                item.exchangeRefundProductCount >= 2
              "
              >외 {{ item.exchangeRefundProductCount - 1 }} 개</v-row
            >
          </template>

          <template v-slot:[`item.exchangeRefundStatusValue`]="{ item }">
            <v-row>{{ item.exchangeRefundStatusValue }}</v-row>
          </template>

          <template v-slot:[`item.exchangeRefundDetail`]="{ item }">
            <v-row
              ><v-btn :to="`/admin/exchange-detail/${item.exchangeRefundId}`"
                >상세 보기</v-btn
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
import Pagination from 'vue-pagination-2';
import { modifyOrderDeliveryStatus, modifyPaymentStatus } from '@/api/order';

import { getExchangeRefunds } from '@/api/exchangeRefund';

export default {
  created() {
    this.getExchangeRefunds(1);
  },
  components: {
    Pagination,
  },

  data() {
    return {
      productName: '',
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '접수 번호', value: 'exchangeRefundId' },
        { text: '신청 상품', value: 'productName' },
        { text: '신청자 아이디', value: 'username' },
        { text: '신청자 이름', value: 'name' },
      ],

      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '접수 번호',
          align: 'center',
          sortable: false,
          value: 'exchangeRefundId',
        },
        { text: '신청 일시', align: 'center', value: 'createdDate' },
        { text: '신청 상품', align: 'center', value: 'productName' },
        { text: '신청자(아이디)', align: 'center', value: 'name' },
        {
          text: '교환/환불',
          align: 'center',
          value: 'exchangeRefundTypeValue',
        },
        {
          text: '처리 상태',
          align: 'center',
          value: 'exchangeRefundStatusValue',
        },
        { text: '상세보기', align: 'center', value: 'exchangeRefundDetail' },
      ],
      contentList: [],
      date1: new Date(new Date().setDate(new Date().getDate() - 3))
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      items: [
        {
          text: '주문 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '교환/환불',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getExchangeRefunds(page);
    },
    async modifyPaymentStatus() {
      const orders = this.selected;
      const orderIds = [];

      for (const key in orders) {
        const orderId = orders[key].orderId;
        console.log(orderId);
        orderIds.push(orderId);
      }

      try {
        const { data } = await modifyPaymentStatus({
          orderIds: orderIds,
          paymentStatus:
            this.activeTab === 0 ? this.tabs[1].value : this.tabs[0].value,
        });

        console.log(data);
        this.getOrders(1, this.tabs[this.activeTab].value);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async modifyOrderDeliveryStatus() {
      const orders = this.selected;
      const orderIds = [];

      for (const key in orders) {
        const orderId = orders[key].orderId;
        console.log(orderId);
        orderIds.push(orderId);
      }

      try {
        const { data } = await modifyOrderDeliveryStatus({
          orderIds: orderIds,
          orderDeliveryStatus: this.orderDeliveryStatusSelected,
        });

        console.log(data);
        this.getOrders(1, this.tabs[this.activeTab].value);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getExchangeRefunds(page, tabValue) {
      console.log(this.searchSelected);
      console.log(tabValue);
      console.log(this.activeTab);
      try {
        const { data } = await getExchangeRefunds({
          page: page - 1,
          size: this.perPage,

          applicationDateA: this.date1,
          applicationDateB: this.date2,
          exchangeRefundStatus: tabValue,
          [this.searchSelected]: this.searchText,
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
