<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">장바구니</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="cartProducts"
          item-key="cartProductId"
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
                    class="mx-auto"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-row>{{ item.productName }}</v-row>
            <v-row v-if="item.firstOptionName"
              >{{ item.firstOptionName }}: {{ item.firstOptionValue }}</v-row
            >
            <v-row v-if="item.secondOptionName"
              >{{ item.secondOptionName }}: {{ item.secondOptionValue }}</v-row
            >
          </template>
          <template v-slot:[`item.quantity`]="{ item }">
            <v-row
              ><v-col cols="3"
                ><v-text-field
                  v-model="item.quantity"
                  @input="
                    item.totalPrice = item.salePrice * item.quantity
                  " /></v-col
            ></v-row>
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
            <v-col>{{ sumField('totalPrice') }}</v-col>
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
  computed: {},
  methods: {
    getTotalPrice(salePrice, quantity) {
      console.log(salePrice, quantity);
      return salePrice * quantity;
    },
    async getCartProducts() {
      try {
        const username = this.$store.state.username;
        const { data } = await getCartProducts({
          username: username,
        });
        console.log(data);
        this.cartProducts = data;
      } catch (error) {
        console.log(error);
      }
    },
    sumField(key) {
      // sum data in give key (property)
      return this.cartProducts.reduce((a, b) => a + (b[key] || 0), 0);
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
          value: 'cartProductId',
        },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'name' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '수정', align: 'center', value: 'modify' },
        { text: '합계 금액', align: 'center', value: 'totalPrice' },
      ],
      cartProducts: [],
    };
  },
};
</script>

<style></style>
