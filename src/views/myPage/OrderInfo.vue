<template>
  <v-container fluid>
    <h5>주문 내역</h5>
    <v-divider />
    <v-row>
      <v-col cols="auto"> 주문 기간 </v-col>
      <v-col>
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
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu = false" />
        </v-menu>
      </v-col>
      <v-col>
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
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu2 = false" />
        </v-menu>
      </v-col>
      <v-col>
        <v-btn>조회</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>당일</v-btn>
        <v-btn>1주일</v-btn>
        <v-btn>3주일</v-btn>
        <v-btn>1개월</v-btn>
        <v-btn>3개월</v-btn>
      </v-col>
      <v-col> 최근 1년 이내 주문 내역만 확인할 수 있습니다. </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="orders"
          item-key="orderId"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.orderId`]="{ item }">
            <v-container>
              <v-row>
                <v-col>주문일시: {{ item.createdDate }}</v-col>
                <v-col>주문번호: {{ item.orderId }}</v-col>
                <v-col
                  ><v-btn>주문 상세 내역</v-btn><v-btn>주문취소</v-btn></v-col
                >
              </v-row>
              <v-row>
                <v-col>
                  <v-img
                    class="mx-auto"
                    :src="'data:image/png;base64,' + item.image"
                    style="width: 100px; height: 100px"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:[`item.productName`]="{ item }">
            <v-row>{{ item.productName }}</v-row>
            <v-row v-if="item.productOptions && item.productOptions.length >= 1"
              >{{ item.productOptions[0].optionName }}:
              {{ item.productOptions[0].optionValue }}</v-row
            >
            <v-row v-if="item.productOptions && item.productOptions.length >= 2"
              >{{ item.productOptions[1].optionName }}:
              {{ item.productOptions[1].optionValue }}</v-row
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <template>
            <v-row>
              <v-col cols="auto">
                10. 주문 일시 2021-08-12 12:15:15 주문번호: 1454460561166
              </v-col>
              <v-col>
                <v-btn>주문 상세 내역</v-btn>
                <v-btn>주문 취소</v-btn>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="auto">
                <v-img
                  max-width="100"
                  src="https://image.brandi.me/cproduct/2021/07/26/SB000000000034658761_1627287656_image1_S.jpeg"
                />
              </v-col>
              <v-col>
                <v-row>자수 실크 린넨 브라우스</v-row>
                <v-row>디자인: C형</v-row>
                <v-row>색상: 블랙</v-row>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>금액</v-card-title>
                  <v-card-text>12000원</v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>결제 상태</v-card-title>
                  <v-card-text>결제 완료</v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>주문/배송</v-card-title>
                  <v-card-text><v-btn>배송중</v-btn></v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
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
          :records="500"
          :per-page="20"
          @paginate="myCallback"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from 'vue-pagination-2';
import { getOrdersByUsername } from '@/api/order';

export default {
  name: 'OrderInfo',
  created() {
    const username = this.$store.state.username;
    this.getOrdersByUsername(username);
  },
  components: {
    Pagination,
  },
  data() {
    return {
      headers: [
        { text: '번호', align: 'center', value: 'orderId' },
        // { text: '이미지', align: 'center', sortable: false, value: 'image' },
        // { text: '상품 정보', align: 'center', value: 'productName' },
        // { text: '판매 가격', align: 'center', value: 'salePrice' },
        // { text: '수량', align: 'center', value: 'quantity' },
        // { text: '포인트', align: 'center', value: 'point' },
        // { text: '배송비', align: 'center', value: 'shippingFee' },
        // { text: '합계', align: 'center', value: 'totalPrice' },
      ],
      listImage: null,
      orders: [],
      selected: [],
      page: 1,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
    };
  },
  methods: {
    async getOrdersByUsername(username) {
      try {
        const { data } = await getOrdersByUsername({
          username: username,
        });
        console.log(data);

        this.orders = data;
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
