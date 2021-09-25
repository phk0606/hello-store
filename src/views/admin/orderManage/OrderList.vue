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

        <v-row dense align="center" justify="start">
          <v-col cols="auto">주문일</v-col>
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
            <v-btn color="indigo" dark @click="getOrders(1)">검색</v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="12">
            <template>
              <v-tabs
                v-model="activeTab"
                background-color="blue-grey"
                slider-color="red"
                dark
              >
                <v-tab
                  v-for="tab of tabs"
                  :key="tab.value"
                  @click="getOrders(1, tab.value)"
                >
                  {{ tab.text }}
                </v-tab>
              </v-tabs>
            </template>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="contentList"
              item-key="orderId"
              show-select
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.productName`]="{ item }">
                <v-row>{{ item.orderProducts[0].productName }}</v-row>
                <v-row
                  v-if="item.orderProductCount && item.orderProductCount >= 2"
                  >외 {{ item.orderProductCount - 1 }} 개</v-row
                >
              </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-row>{{ item.name }}</v-row>
                <v-row>({{ item.username }})</v-row>
              </template>
              <template v-slot:[`item.createdDate`]="{ item }">
                <v-row>{{ item.createdDate }}</v-row>
              </template>
              <template v-slot:[`item.orderDetailInfo`]="{ item }">
                <v-row
                  ><v-btn :to="`/admin/order-detail-info/${item.orderId}`"
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
        <v-row align="center">
          <v-col cols="2">
            <v-select
              label="항목 선택"
              v-model="orderDeliveryStatusSelected"
              :items="orderDeliveryStatus"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="modifyOrderDeliveryStatus"
              >주문 상태 변경</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';
import Pagination from 'vue-pagination-2';
import { getOrders, modifyOrderDeliveryStatus } from '@/api/order';

export default {
  created() {
    console.log(this.activeTab);
    this.getOrders(1, this.tabs[0].value);
  },
  components: {
    Pagination,
    AdminOrderLeft,
  },

  data() {
    return {
      activeTab: 0,
      tabs: [
        { value: 'BEFORE_CONFIRM', text: '주문 확인 전' },
        { value: 'CONFIRM_ORDER', text: '주문 확인' },
        { value: 'READY_SHIP', text: '배송 준비 중' },
        { value: 'SHIPPING', text: '배송 중' },
        { value: 'COMPLETE_SHIP', text: '배송 완료' },
      ],
      productName: '',
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '주문 번호', value: 'orderId' },
        { text: '주문 상품', value: 'productName' },
        { text: '주문자 아이디', value: 'ordererId' },
        { text: '주문자 이름', value: 'ordererName' },
      ],
      orderDeliveryStatusSelected: null,
      orderDeliveryStatus: [
        { text: '주문 확인 전', value: 'BEFORE_CONFIRM' },
        { text: '주문 확인', value: 'CONFIRM_ORDER' },
        { text: '배송 준비 중', value: 'READY_SHIP' },
        { text: '배송 중', value: 'SHIPPING' },
        { text: '배송 완료', value: 'COMPLETE_SHIP' },
      ],
      page: 1,
      records: 0,
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
        { text: '결제 상태', align: 'center', value: 'paymentStatusValue' },
        { text: '상세 보기', align: 'center', value: 'orderDetailInfo' },
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
      this.getOrders(page, this.tabs[this.activeTab].value);
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
        this.getOrders(1, this.tabs[0].value);
        this.activeTab = 0;
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getOrders(page, tabValue) {
      console.log(this.searchSelected);
      console.log(tabValue);
      try {
        const { data } = await getOrders({
          page: page - 1,
          size: this.perPage,

          orderDateA: this.date1,
          orderDateB: this.date2,
          orderDeliveryStatus: tabValue,
          [this.searchSelected]: this.searchText,
        });
        this.contentList = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
        console.log(data);
        // this.activeTab = 0;
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
