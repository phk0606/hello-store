<template>
  <v-container fluid>
    <h5>주문 내역</h5>
    <v-divider />
    <v-row justify="center" align="center">
      <v-col cols="auto"> 주문 기간 </v-col>
      <v-col cols="auto">
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
              v-model="orderDateA"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="orderDateA" @input="menu = false" />
        </v-menu>
      </v-col>
      <v-col cols="auto">
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
              v-model="orderDateB"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="orderDateB" @input="menu2 = false" />
        </v-menu>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="getOrdersByPeriod">조회</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" dense>
      <v-col cols="auto">
        <v-btn @click="periodSet('today')">당일</v-btn>
        <v-btn @click="periodSet('aWeekago')" class="ml-3">1주일</v-btn>
        <v-btn @click="periodSet('threeWeekAgo')" class="ml-3">3주일</v-btn>
        <v-btn @click="periodSet('aMonthAgo')" class="ml-3">1개월</v-btn>
        <v-btn @click="periodSet('threeMonthAgo')" class="ml-3">3개월</v-btn>
      </v-col>
      <v-col cols="auto" class="ml-5">
        최근 1년 이내 주문 내역만 확인할 수 있습니다.
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          hide-default-header
          v-model="selected"
          :headers="headers"
          :items="orders"
          item-key="orderId"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.orderId`]="{ item }">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="auto">주문일시: {{ item.createdDate }}</v-col>
                <v-col cols="auto">주문번호: {{ item.orderId }}</v-col>
                <v-spacer />
                <v-col cols="auto"
                  ><v-btn :to="`/my-page/order-detail-info/${item.orderId}`"
                    >주문 상세 내역</v-btn
                  ><v-btn
                    class="ml-3"
                    @click="orderCancel(item.orderId)"
                    v-if="
                      item.orderDeliveryStatus === 'BEFORE_CONFIRM' ||
                      item.orderDeliveryStatus === 'CONFIRM_ORDER'
                    "
                    >주문취소</v-btn
                  >
                  <v-btn
                    :to="`/my-page/exchange/${item.orderId}`"
                    class="ml-3"
                    v-if="
                      item.orderDeliveryStatus === 'READY_SHIP' ||
                      item.orderDeliveryStatus === 'SHIPPING' ||
                      item.orderDeliveryStatus === 'COMPLETE_SHIP'
                    "
                    >교환/환불</v-btn
                  >
                </v-col>
              </v-row>
              <v-divider />
              <v-row dense>
                <v-col cols="2">
                  <v-img
                    class="mx-auto"
                    :src="`${imageUrl}${item.orderProducts[0].fileName}`"
                    style="width: 100px; height: 100px"
                  />
                </v-col>
                <v-col cols="3" align-self="center">
                  <v-row>{{ item.orderProducts[0].productName }}</v-row>
                  <v-row
                    v-if="item.orderProductCount && item.orderProductCount >= 2"
                    >외 {{ item.orderProductCount - 1 }} 개</v-row
                  >
                  <v-row
                    v-if="
                      item.orderProducts[0].productOptions &&
                      item.orderProducts[0].productOptions.length >= 1
                    "
                    >{{ item.orderProducts[0].productOptions[0].optionName }}:
                    {{
                      item.orderProducts[0].productOptions[0].optionValue
                    }}</v-row
                  >
                  <v-row
                    v-if="
                      item.orderProducts[0].productOptions &&
                      item.orderProducts[0].productOptions.length >= 2
                    "
                    >{{ item.orderProducts[0].productOptions[1].optionName }}:
                    {{
                      item.orderProducts[0].productOptions[1].optionValue
                    }}</v-row
                  >
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title class="blue-grey text-white justify-center"
                      >금액</v-card-title
                    >
                    <v-card-actions class="justify-center"
                      ><v-btn text>
                        {{ item.paymentPrice }}</v-btn
                      ></v-card-actions
                    >
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title class="blue-grey text-white justify-center"
                      >결제 상태</v-card-title
                    >
                    <v-card-actions class="justify-center"
                      ><v-btn text>{{
                        item.paymentStatusValue
                      }}</v-btn></v-card-actions
                    >
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-title class="blue-grey text-white justify-center"
                      >주문/배송</v-card-title
                    >
                    <v-card-actions class="justify-center"
                      ><v-btn text>
                        {{ item.orderDeliveryStatusValue }}
                      </v-btn></v-card-actions
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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
import { getOrdersByUsername, orderCancel } from '@/api/order';

export default {
  name: 'OrderInfo',
  created() {
    const username = this.$store.state.username;
    this.getOrdersByUsername(username);
    this.username = username;
  },
  components: {
    Pagination,
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      headers: [{ text: '번호', align: 'center', value: 'orderId' }],
      listImage: null,
      orders: [],
      selected: [],
      page: 1,
      records: 0,
      perPage: 6,
      username: '',
      orderDateA: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      orderDateB: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
    };
  },
  methods: {
    async orderCancel(orderId) {
      try {
        const { data } = await orderCancel({
          orderId: orderId,
        });
        console.log(data);

        this.getOrdersByUsername(this.username);
      } catch (error) {
        console.log(error);
      }
    },
    periodSet(period) {
      const d = new Date();
      const today = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .substr(0, 10);
      this.orderDateB = today;
      if (period === 'today') {
        this.orderDateA = today;
      } else if (period === 'aWeekago') {
        this.orderDateA = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate() - 7,
        )
          .toISOString()
          .substr(0, 10);
      } else if (period === 'threeWeekAgo') {
        this.orderDateA = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate() - 21,
        )
          .toISOString()
          .substr(0, 10);
      } else if (period === 'aMonthAgo') {
        this.orderDateA = new Date(
          d.getFullYear(),
          d.getMonth() - 1,
          d.getDate(),
        )
          .toISOString()
          .substr(0, 10);
      } else if (period === 'threeMonthAgo') {
        this.orderDateA = new Date(
          d.getFullYear(),
          d.getMonth() - 3,
          d.getDate(),
        )
          .toISOString()
          .substr(0, 10);
      }
    },
    async getOrdersByPeriod() {
      try {
        const { data } = await getOrdersByUsername({
          username: this.username,
          orderDateA: this.orderDateA,
          orderDateB: this.orderDateB,
        });
        console.log(data);

        this.orders = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
      } catch (error) {
        console.log(error);
      }
    },
    async getOrdersByUsername(username) {
      try {
        const { data } = await getOrdersByUsername({
          username: username,
        });
        console.log(data);

        this.orders = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
      } catch (error) {
        console.log(error);
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
  },
};
</script>

<style></style>
