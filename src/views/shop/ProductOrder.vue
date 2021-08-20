<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-subheader>구매 목록</v-subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table fixed-header dense height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">번호</th>
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
                      <v-img :src="order.imgSrc" max-width="90" />
                    </v-col>
                    <v-col>
                      <div>{{ order.productName }}</div>
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

    <v-row justify="">
      <v-col cols="12">
        <v-card ref="form">
          <v-card-title>주문자 정보</v-card-title>
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="*이름"
              required
            />
            <v-text-field
              ref="address"
              v-model="address"
              label="*연락처"
              placeholder="01012341234"
              counter="25"
              required
            />
          </v-card-text>
          <v-card-title>배송 정보</v-card-title>
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="*이름(회사)"
              required
            />
            <v-text-field
              ref="address"
              v-model="address"
              label="주소"
              placeholder=""
              counter="25"
              required
            />
            <v-text-field
              ref="address"
              v-model="address"
              label="연락처"
              placeholder="01012341234"
              counter="25"
              required
            />
            <v-textarea outlined label="요청사항" />
          </v-card-text>
          <v-card-title>결제 금액 확인 및 결제 방법 선택</v-card-title>
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="총 상품 가격"
              required
            />
            <v-text-field
              ref="address"
              v-model="address"
              label="배송비"
              placeholder=""
              counter="25"
              required
            />
            <v-text-field
              ref="address"
              v-model="address"
              label="총 결제 금액"
              placeholder="01012341234"
              counter="25"
              required
            />
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
