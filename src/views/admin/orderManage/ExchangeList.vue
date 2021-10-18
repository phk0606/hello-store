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
              교환/반품 신청
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
            <v-btn color="indigo" dark @click="getExchangeReturns(1)"
              >검색</v-btn
            >
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
                  @click="getExchangeReturns(1, tab.value)"
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
              item-key="exchangeReturnId"
              show-select
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.productName`]="{ item }">
                <v-row>{{ item.exchangeReturnProducts[0].productName }}</v-row>
                <v-row
                  v-if="
                    item.exchangeReturnProductCount &&
                    item.exchangeReturnProductCount >= 2
                  "
                  >외 {{ item.exchangeReturnProductCount - 1 }} 개</v-row
                >
              </template>
              <template v-slot:[`item.name`]="{ item }">
                <v-row>{{ item.name }}</v-row>
                <v-row>({{ item.username }})</v-row>
              </template>

              <template v-slot:[`item.exchangeReturnTypeValue`]="{ item }">
                <v-row>{{
                  item.exchangeReturnProducts[0].exchangeReturnTypeValue
                }}</v-row>
                <v-row
                  v-if="
                    item.exchangeReturnProductCount &&
                    item.exchangeReturnProductCount >= 2
                  "
                  >외 {{ item.exchangeReturnProductCount - 1 }} 개</v-row
                >
              </template>

              <template v-slot:[`item.exchangeReturnStatusValue`]="{ item }">
                <v-row>{{ item.exchangeReturnStatusValue }}</v-row>
              </template>

              <template v-slot:[`item.exchangeReturnDetail`]="{ item }">
                <v-row
                  ><v-btn
                    :to="`/admin/exchange-detail/${item.exchangeReturnId}`"
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
        <!-- <v-row>
          <v-col cols="auto">
            <v-btn
              @click="modifyExchangeReturnStatus"
              color="brown darken-2"
              dark
              >{{ tabs[activeTab === 0 ? 1 : 0].text }}(으)로 이동</v-btn
            >
          </v-col>
        </v-row> -->
        <v-row align="center">
          <v-col cols="3">
            <v-select
              label="항목 선택"
              v-model="exchangeReturnStatusSelected"
              :items="tabs"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="modifyExchangeReturnStatus"
              >교환/반품 상태 변경</v-btn
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

import {
  getExchangeReturns,
  modifyExchangeReturnStatus,
} from '@/api/exchangeReturn';

export default {
  created() {
    console.log(this.activeTab, this.tabs[0].value);
    this.getExchangeReturns(1, this.tabs[0].value);
  },
  components: {
    Pagination,
    AdminOrderLeft,
  },

  data() {
    return {
      exchangeReturnStatusSelected: null,
      activeTab: 0,
      tabs: [
        { value: 'REQUESTED', text: '신청 완료' },
        { value: 'PROCESSING', text: '처리 중' },
        { value: 'FINISHED', text: '처리 완료' },
      ],
      productName: '',
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '접수 번호', value: 'exchangeReturnId' },
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
          value: 'exchangeReturnId',
        },
        { text: '주문 번호', align: 'center', value: 'orderId' },
        { text: '신청 일시', align: 'center', value: 'createdDate' },
        { text: '신청 상품', align: 'center', value: 'productName' },
        { text: '신청자(아이디)', align: 'center', value: 'name' },
        {
          text: '교환/반품',
          align: 'center',
          value: 'exchangeReturnTypeValue',
        },
        {
          text: '처리 상태',
          align: 'center',
          value: 'exchangeReturnStatusValue',
        },
        { text: '상세보기', align: 'center', value: 'exchangeReturnDetail' },
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
          text: '교환/반품',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getExchangeReturns(page, this.tabs[this.activeTab].value);
    },
    async modifyExchangeReturnStatus() {
      const exchangeReturns = this.selected;
      const exchangeReturnIds = [];

      for (const key in exchangeReturns) {
        const exchangeReturnId = exchangeReturns[key].exchangeReturnId;
        console.log(exchangeReturnId);
        exchangeReturnIds.push(exchangeReturnId);
      }

      try {
        const { data } = await modifyExchangeReturnStatus({
          exchangeReturnIds: exchangeReturnIds,
          exchangeReturnStatus: this.exchangeReturnStatusSelected,
        });

        console.log(data);
        this.getExchangeReturns(1, this.tabs[this.activeTab].value);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getExchangeReturns(page, tabValue) {
      console.log(this.searchSelected);
      console.log(tabValue);
      console.log(this.activeTab);
      try {
        const { data } = await getExchangeReturns({
          page: page - 1,
          size: this.perPage,

          applicationDateA: this.date1,
          applicationDateB: this.date2,
          exchangeReturnStatus: tabValue,
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
