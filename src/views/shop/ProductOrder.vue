<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">구매 목록</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table fixed-header dense height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center subtitle-1">번호</th>
                <th class="text-center">상품정보</th>
                <th class="text-center">수량</th>
                <th class="text-center">판매가격</th>
                <!-- <th class="text-center">포인트</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in orders.slice().reverse()"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
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
                <td>{{ order.quantity }}</td>
                <td>{{ order.price }}</td>
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
                  ><v-text-field hide-details dense solo-inverted required
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    hide-details
                    dense
                    solo-inverted
                    placeholder="01012341234"
                    counter="11"
                    required
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
                  ><v-text-field hide-details dense required solo-inverted
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2">
                  <div class="subtitle-1">*주소:</div>
                </v-col>
                <v-col>
                  <v-row dense align="center">
                    <v-col
                      ><v-text-field
                        hide-details
                        dense
                        solo-inverted
                        required
                        disabled
                    /></v-col>
                    <v-col><v-btn>우편번호 찾기</v-btn></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col
                      ><v-text-field
                        hide-details
                        dense
                        solo-inverted
                        required
                        disabled
                    /></v-col>
                    <v-col
                      ><v-text-field hide-details dense solo-inverted required
                    /></v-col>
                  </v-row>
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
                    placeholder="01012341234"
                    counter="11"
                    required
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">요청사항:</div></v-col>
                <v-col><v-textarea hide-details dense filled /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>결제 금액 확인 및 결제 방법 선택</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">총 상품 가격:</div></v-col
                >
                <v-col>
                  <v-text-field
                    reverse
                    value="76000"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">배송비:</div></v-col>
                <v-col>
                  <v-text-field
                    reverse
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
                  ><div class="subtitle-1">총 결제 금액:</div></v-col
                >
                <v-col>
                  <v-text-field
                    reverse
                    value="78500"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                    class="text-right"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-row align="center">
              <v-col cols="2"> 일반결제 </v-col>
              <v-col>
                <v-radio-group dense hide-details v-model="radios" row>
                  <v-radio value="1">
                    <template v-slot:label> 무통장 입금 </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label> 카드결제 </template>
                  </v-radio>
                  <v-radio value="3">
                    <template v-slot:label> 계좌이체 </template>
                  </v-radio>
                  <v-radio value="4">
                    <template v-slot:label> 가상계좌 </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row align="center">
              <v-col cols="auto"> 에스크로 결제 </v-col>
              <v-col>
                <v-radio-group dense hide-details v-model="radios" row>
                  <v-radio value="1">
                    <template v-slot:label> 계좌이체 </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label> 가상계좌 </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn to="/style-shop/order-info">결제하기</v-btn>
                <v-btn>취소</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    sumField(key) {
      // sum data in give key (property)
      return this.orders.reduce((a, b) => a + (b[key] || 0), 0);
    },
  },
  data() {
    return {
      adress: null,
      radios: 'Duckduckgo',
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
        },
        {
          productId: 12345,
          productName: '백프린팅 반팔티셔츠2',
          imgSrc:
            '//rooseoin.co.kr/web/product/tiny/202108/030e628575b77813bf8c1efc126dfd7e.webp',
          quantity: 1,
          price: 12000,
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
          option1: '화이트',
          option2: 'C형',
        },
      ],
    };
  },
};
</script>

<style></style>
