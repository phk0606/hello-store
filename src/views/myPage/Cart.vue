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
            <v-row align="center" justify="center" dense>
              <v-col cols="5">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="item.quantity"
                  @input="
                    item.totalPrice =
                      item.salePrice * item.quantity + item.shippingFee
                  "
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  small
                  class="mr-2"
                  icon
                  color="indigo"
                  @click="
                    item.quantity += 1;
                    item.totalPrice =
                      item.salePrice * item.quantity + item.shippingFee;
                  "
                  ><v-icon>mdi-plus</v-icon></v-btn
                ><v-btn
                  small
                  icon
                  color="indigo"
                  @click="
                    item.quantity > 1 ? (item.quantity -= 1) : 0;
                    item.totalPrice =
                      item.salePrice * item.quantity + item.shippingFee;
                  "
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.modify`]="{ item }">
            <v-row>
              <v-col>
                <v-btn
                  @click="
                    modifyQuantity(`${item.cartProductId}`, `${item.quantity}`)
                  "
                  >수정</v-btn
                >
              </v-col>
            </v-row>
          </template>
        </v-data-table>
        <v-divider />
        <template>
          <v-row>
            <v-col><v-btn @click="removeCartProducts">선택 삭제</v-btn></v-col>
            <!-- <v-col cols=""> 총 상품 금액 </v-col>
            <v-col>{{ sumField('totalPrice') }}</v-col> -->
          </v-row>
          <v-container>
            <v-row justify="end">
              <v-col cols="auto"> 총 상품 금액 </v-col>
              <v-col cols="auto">{{ sumField('salePrice') }}</v-col>
              <v-col cols="auto"> 총 배송비 </v-col>
              <v-col cols="auto">{{ sumField('shippingFee') }}</v-col>
              <v-col cols="auto"> 총 결제 금액 </v-col>
              <v-col cols="auto">{{ sumField('totalPrice') }}</v-col>
            </v-row>
          </v-container>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>계속 쇼핑하기</v-btn>
        <v-btn @click="order">선택 구매</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getCartProducts,
  modifyQuantity,
  removeCartProducts,
} from '@/api/cart';

export default {
  name: 'Cart',
  created() {
    this.getCartProducts();
  },
  computed: {},
  methods: {
    order() {
      const cartProducts = this.selected;
      const cartProductIds = [];

      for (const key in cartProducts) {
        const cartProductId = cartProducts[key].cartProductId;
        console.log(cartProductId);
        cartProductIds.push(cartProductId);
      }

      this.$router.push({
        name: 'style-shop-product-order',
        query: {
          cartProductIds: cartProductIds,
        },
      });
    },
    async removeCartProducts() {
      const cartProducts = this.selected;
      const cartProductIds = [];
      const cartId = this.selected[0].cartId;

      console.log(cartId);
      for (const key in cartProducts) {
        const cartProductId = cartProducts[key].cartProductId;
        console.log(cartProductId);
        cartProductIds.push(cartProductId);
      }

      try {
        await removeCartProducts({
          cartId,
          cartProductIds,
        });
        //console.log(data);
        this.getCartProducts();
      } catch (error) {
        console.log(error);
      }
    },
    async modifyQuantity(cartProductId, quantity) {
      console.log(cartProductId, quantity);
      try {
        await modifyQuantity({
          cartProductId: cartProductId,
          quantity: quantity,
        });

        this.getCartProducts();
      } catch (error) {
        console.log(error);
      }
    },
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
        { text: '수량', align: 'center', value: 'quantity', width: '20%' },
        { text: '수량 수정', align: 'center', value: 'modify' },
        { text: '포인트', align: 'center', value: 'point' },
        { text: '배송비', align: 'center', value: 'shippingFee' },
        { text: '합계 금액', align: 'center', value: 'totalPrice' },
      ],
      cartProducts: [],
    };
  },
};
</script>

<style></style>
