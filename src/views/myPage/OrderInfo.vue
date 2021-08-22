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
        <v-card>
          <template>
            <v-row>
              <v-col cols="auto">
                10. 주문 일시 2021-08-12 12:15:15 주문번호: 1454460561166
              </v-col>
              <v-col>
                <v-btn to="/my-page/order-detail-info">주문 상세 내역</v-btn>
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
                  <v-card-text>결제 전</v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>주문/배송</v-card-title>
                  <v-card-text>주문 확인 전</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-card>
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

export default {
  page: 1,
  name: 'OrderInfo',
  components: {
    Pagination,
  },
  data() {
    return {
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
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
  },
};
</script>

<style></style>
