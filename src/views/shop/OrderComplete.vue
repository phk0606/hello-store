<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">주문 완료</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h6>주문번호: 1111111</h6>
        <v-simple-table fixed-header dense height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">상품정보</th>
                <th class="text-center">수량</th>
                <th class="text-center">판매가격</th>
                <th class="text-center">배송비</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in orders.slice().reverse()"
                :key="index"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <v-row>
                    <v-col cols="3">
                      <v-img :src="order.imgSrc" max-width="100" />
                    </v-col>
                    <v-col>
                      <div>상품명: {{ order.productName }}</div>
                      <div>색상: {{ order.option1 }}</div>
                      <div>디자인: {{ order.option2 }}</div>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center">{{ order.quantity }}</td>
                <td class="text-center">{{ order.price }}</td>
                <td class="text-center">{{ order.deliveryCharge }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider />
        <template>
          <v-row>
            <v-col cols="10"> 총 상품 금액 </v-col>
            <v-col>{{ sumField('price') }}</v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="8">
        <v-card ref="form">
          <v-card-title>주문자 정보</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                <v-col
                  ><v-text-field
                    value="홍길동"
                    hide-details
                    dense
                    solo-inverted
                    required
                    readonly
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    hide-details
                    dense
                    solo-inverted
                    value="01012341234"
                    counter="11"
                    required
                    readonly
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>배송 정보</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                <v-col
                  ><v-text-field
                    hide-details
                    dense
                    required
                    solo-inverted
                    value="홍길동"
                    readonly
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2">
                  <div class="subtitle-1">*주소:</div>
                </v-col>
                <v-col>
                  <v-text-field
                    hide-details
                    dense
                    required
                    solo-inverted
                    value="경기도 수원시 장안구 천천동 123-12 105동 106호"
                    readonly
                  />
                </v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    hide-details
                    dense
                    solo-inverted
                    value="01012341234"
                    counter="11"
                    required
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">요청사항:</div></v-col>
                <v-col
                  ><v-textarea
                    hide-details
                    dense
                    filled
                    no-resize
                    value="빠른 배송 부탁합니다."
                    readonly
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>결제 정보</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">결제 방법:</div></v-col>
                <v-col>
                  <v-text-field
                    value="신용카드"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">결제 금액:</div></v-col>
                <v-col>
                  <v-text-field
                    value="78500"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
              <v-divider />
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <v-btn to="/style-shop/order-complete"
                    >주문내역/배송조회 확인</v-btn
                  >

                  <v-btn>쇼핑 계속하기</v-btn>
                  <v-btn>메인으로 가기</v-btn>
                  <v-btn>로그아웃</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderComplete',
  methods: {
    sumField(key) {
      // sum data in give key (property)
      return this.orders.reduce((a, b) => a + (b[key] || 0), 0);
    },
  },
  data() {
    return {
      orders: [
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠1',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠2',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠3',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠4',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠5',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠6',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
          deliveryCharge: 2500,
          option1: '화이트',
          option2: 'C형',
        },
      ],
    };
  },
};
</script>

<style></style>
