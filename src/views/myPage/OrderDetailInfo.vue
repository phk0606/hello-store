<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h5>주문 상세 내역</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-row>
            <v-col cols="auto">주문번호: 11111111</v-col>
            <v-col cols="">주문일: 2021-08-17 12:15:13</v-col>
            <v-spacer />
            <v-col cols="">[주문 배송 상태]</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5>구매 상품</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table fixed-header dense height="200px">
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
              <tr v-for="(order, index) in orders" :key="index">
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
                <td class="text-center">{{ order.deliveryFee }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card ref="form">
          <v-card-title>주문자 정보</v-card-title>
          <v-btn>수정</v-btn>
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
          <v-btn>수정</v-btn>
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
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">배송료:</div></v-col>
                <v-col>
                  <v-text-field
                    value="2500"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">사용포인트:</div></v-col
                >
                <v-col>
                  <v-text-field
                    value="1000"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
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
              <v-divider />
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <v-btn to="/style-shop/order-complete">목록</v-btn>

                  <v-btn>확인</v-btn>
                  <v-btn>주문 취소</v-btn>
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
  name: 'OrderDetailInfo',
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
          option1: '화이트',
          option2: 'C형',
          deliveryFee: 2500,
        },
      ],
    };
  },
};
</script>

<style></style>
