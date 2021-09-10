<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">장바구니</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- <v-simple-table fixed-header dense height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">상품정보</th>
                <th class="text-center">수량</th>
                <th class="text-center">판매가격</th>
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
        </v-simple-table> -->
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="cartProductList"
          item-key="productId"
          show-select
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-container>
              <v-row>
                <v-col>
                  <v-img
                    :src="'data:image/png;base64,' + item.image"
                    style="width: 100px; height: 100px"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-row>{{ item.categoryName }}</v-row>
            <v-row>{{ item.name }}</v-row>
          </template>

          <template v-slot:[`item.modify`]="{ item }">
            <v-row
              ><v-btn :to="`/admin/product-modify/${item.productId}`"
                >수정</v-btn
              ></v-row
            >
          </template>
        </v-data-table>
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
import { getCartProducts } from '@/api/cart';

export default {
  name: 'Cart',
  created() {
    this.getCartProducts();
  },
  methods: {
    async getCartProducts() {
      try {
        const username = this.$store.state.username;
        const { data } = await getCartProducts({
          username: username,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    sumField(key) {
      // sum data in give key (property)
      return this.cartProductList.reduce((a, b) => a + (b[key] || 0), 0);
    },
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'productId',
        },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'name' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '수정', align: 'center', value: 'modify' },
        { text: '합계 금액', align: 'center', value: 'totalPrice' },
      ],
      cartProductList: [],
    };
  },
};
</script>

<style></style>
