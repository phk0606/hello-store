<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">장바구니</div>
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
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider />
        <template>
          <v-row>
            <v-col><v-btn>선택 삭제</v-btn></v-col>
            <v-col cols=""> 총 상품 금액 </v-col>
            <v-col>{{ sumField('price') }}</v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>계속 쇼핑하기</v-btn>
        <v-btn>선택 구매</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cart',
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
