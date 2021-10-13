<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          스타일 숍
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <div class="h5">구매 목록</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="orderProducts"
          item-key="cartProductId"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-container>
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
        <v-divider />
        <template>
          <v-container>
            <v-row justify="end">
              <v-col cols="auto">
                총 상품 금액: {{ sumField('salePrice') }}
              </v-col>
              <v-col cols="auto">
                총 적립 포인트: {{ (addPoint = sumField('calculatedPoint')) }}
              </v-col>
              <v-col cols="auto">
                총 배송비: {{ sumField('shippingFee') }}
              </v-col>
              <v-col cols="auto">
                총 결제 금액: {{ sumField('totalPrice') }}
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col cols="9">
        <v-card ref="form">
          <v-card-title>주문자 정보</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="user.name"
                    hide-details
                    dense
                    solo-inverted
                    required
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="user.phoneNumber"
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
                  ><v-text-field
                    v-model="recipientName"
                    hide-details
                    dense
                    required
                    solo-inverted
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="recipientPhoneNumber"
                    hide-details
                    dense
                    solo-inverted
                    placeholder="01012341234"
                    counter="11"
                    required
                /></v-col>
              </v-row>
              <v-divider />
              <Address
                v-on:setAddress="setAddress"
                v-on:setDetailAddress="setDetailAddress"
                :zonecode="zonecode"
                :roadAddress="roadAddress"
                :address="address"
                :detailAddress="detailAddress"
              />
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">요청사항:</div></v-col>
                <v-col
                  ><v-textarea
                    v-model="requirement"
                    hide-details
                    dense
                    filled
                    no-resize
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>결제 금액 확인 및 결제 방법 선택</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">총 상품 금액:</div></v-col
                >
                <v-col cols="3">
                  <v-text-field
                    reverse
                    :value="sumField('salePrice')"
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
                  ><div class="subtitle-1">포인트 사용:</div></v-col
                >
                <v-col cols="3">
                  <v-text-field
                    v-model="pointUsed"
                    reverse
                    hide-details
                    dense
                    required
                    solo-inverted
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="pointUse">적용</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="pointUseCancel">적용 취소</v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="2" />
                <v-col cols="auto">
                  보유 포인트({{ userPoint }}원) (100포인트 단위로 사용)
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">사용 포인트:</div></v-col
                >
                <v-col cols="3">
                  <v-text-field
                    reverse
                    :value="userPointTemp - userPoint"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">총 배송비:</div></v-col>
                <v-col cols="3">
                  <v-text-field
                    reverse
                    :value="sumField('shippingFee')"
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
                  ><div class="subtitle-1">최종 결제 금액:</div></v-col
                >
                <v-col cols="3">
                  <v-text-field
                    v-model="paymentPrice"
                    reverse
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
            <v-row dense align="center">
              <v-col cols="2"> <div class="subtitle-1">결제 방법</div> </v-col>
              <v-col>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-radio-group
                        dense
                        hide-details
                        v-model="paymentMethodType"
                        row
                        class="mt-0"
                      >
                        <v-radio
                          v-for="(paymentMethodType, i) in paymentMethodTypes"
                          :key="i"
                          :value="paymentMethodType.paymentMethodType"
                        >
                          <template v-slot:label>{{
                            paymentMethodType.paymentMethodTypeValue
                          }}</template>
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <template v-if="paymentMethodType === 'WITHOUT_BANKBOOK'">
                    <v-row dense align="center">
                      <v-col cols="3"> ● 입금 계좌 선택 </v-col>
                      <v-col
                        ><v-select
                          v-model="selectedAccount"
                          :items="bankAccounts"
                          item-value="bankAccountId"
                          label="입금 은행을 선택해 주세요."
                          hide-details
                          outlined
                          dense
                          :menu-props="{ offsetY: true }"
                          return-object
                        >
                          <template slot="selection" slot-scope="data">
                            {{ data.item.bankName }}
                            {{ data.item.accountNumber }}
                            {{ data.item.accountHolder }}
                          </template>
                          <template slot="item" slot-scope="data">
                            {{ data.item.bankName }}
                            {{ data.item.accountNumber }}
                            {{ data.item.accountHolder }}
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row dense align="center">
                      <v-col cols="3"> ● 입금 예정일 </v-col>
                      <v-col
                        ><v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="depositDueDate"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="depositDueDate"
                            @input="menu = false"
                          /> </v-menu
                      ></v-col>
                    </v-row>
                    <v-row dense align="center">
                      <v-col cols="3"> ● 입금자 명 </v-col>
                      <v-col
                        ><v-text-field
                          outlined
                          dense
                          hide-details
                          v-model="depositorName"
                      /></v-col>
                    </v-row>
                  </template>
                </v-container>
              </v-col>
            </v-row>
            <v-divider />
            <!-- <v-row dense align="center">
              <v-col cols="2">
                <div class="subtitle-1">에스크로 결제</div>
              </v-col>
              <v-col>
                <v-radio-group
                  dense
                  hide-details
                  v-model="radios2"
                  row
                  class="mt-0"
                >
                  <v-radio value="1">
                    <template v-slot:label> 계좌이체 </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label> 가상계좌 </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider /> -->
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn @click="payment" class="mr-5">결제하기</v-btn>
                <!-- to="/style-shop/order-complete" -->
                <v-btn to="/">취소</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Address from '@/components/Address';
import { getListImage, getProductById } from '@/api/shopProduct';
import { getUser } from '@/api/user';
import { createOrder } from '@/api/order';
import { getCartProducts, removeCartProducts } from '@/api/cart';
import { getPaymentMethodTypesWithValues } from '@/api/paymentMethod';
import { getBankAccounts } from '@/api/bankAccount';

export default {
  async created() {
    const cartId = this.$route.query.cartId;
    this.cartId = cartId;
    const ids = this.$route.query.cartProductIds;
    this.cartProductIds = ids;
    const query = this.$route.query;
    console.log(Array.isArray(ids));

    if (ids) {
      const cartProductIds = [];
      if (Array.isArray(ids)) {
        for (const key in ids) {
          const cartProductId = ids[key];
          console.log(cartProductId);
          cartProductIds.push(cartProductId);
        }
      } else {
        cartProductIds.push(ids);
      }

      console.log(cartProductIds);
      await this.getCartProducts(cartProductIds);
    } else {
      console.log(orderProduct);

      await this.getListImage(query.productId);
      await this.getProductById(query.productId);

      const orderProduct = [
        {
          image: this.listImage,
          productOptions: query.productOptions,
          productId: query.productId,
          quantity: query.quantity,

          productName: this.productName,
          salePrice: this.salePrice,
          shippingFee: this.shippingFee,
          totalPrice: this.salePrice * query.quantity + this.shippingFee,
          calculatedPoint: this.point * query.quantity,
        },
      ];
      this.orderProducts = orderProduct;

      // 총 결제 금액 할당(포인트 사용 계산을 위해 바인딩 전 할당)
      let total = 0;
      const sumValue = orderProduct.reduce((accumulator, currentValue) => {
        return (total += +currentValue['totalPrice']);
      }, 0);
      this.paymentPrice = sumValue;
      this.paymentPriceTemp = sumValue;
    }

    const username = this.$store.state.username;
    console.log(username);

    await this.getUser(username);
    await this.getPaymentMethodTypesWithValues();
    await this.getBankAccounts();
  },
  components: {
    Address,
  },
  methods: {
    async getBankAccounts() {
      try {
        const { data } = await getBankAccounts();
        this.bankAccounts = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getPaymentMethodTypesWithValues() {
      try {
        const { data } = await getPaymentMethodTypesWithValues();
        this.paymentMethodTypes = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    pointUseCancel() {
      this.userPoint = this.userPointTemp;
      this.paymentPrice = this.paymentPriceTemp;
      this.pointUsed = 0;
    },
    pointUse() {
      if (this.userPoint <= 0) {
        alert('포인트가 없습니다.');
        this.pointUsed = 0;
        return;
      }

      if (this.userPoint < this.pointUsed) {
        alert('보유 포인트를 초과할 수 없습니다.');
        this.pointUsed = 0;
        return;
      }

      if (this.pointUsed % 100 !== 0) {
        alert('100 포인트 단위로 사용 가능합니다.');
        this.pointUsed = 0;
        return;
      }
      this.paymentPrice = this.paymentPrice - this.pointUsed;
      this.userPoint = this.userPoint - this.pointUsed;
      this.pointUsed = 0;
    },
    setAddress(zonecode, roadAddress, address) {
      // console.log(zonecode, roadAddress, address);
      this.zonecode = zonecode;
      this.roadAddress = roadAddress;
      this.address = address;
    },
    setDetailAddress(detailAddress) {
      // console.log(detailAddress);
      this.detailAddress = detailAddress;
    },
    async getProductById(productId) {
      try {
        const { data } = await getProductById({
          productId: productId,
        });
        console.log(data);
        this.productName = data.productName;
        this.salePrice = data.salePrice;
        this.point = data.point;
        this.shippingFee = data.shippingFee;
      } catch (error) {
        console.log(error);
      }
    },
    async getCartProducts(cartProductIds) {
      console.log(cartProductIds);
      try {
        const { data } = await getCartProducts({
          cartProductIds: cartProductIds.join(','),
        });
        console.log(data);
        this.orderProducts = data;

        // 총 결제 금액 할당(포인트 사용 계산을 위해 바인딩 전 할당)
        let total = 0;
        const sumValue = data.reduce((accumulator, currentValue) => {
          return (total += +currentValue['totalPrice']);
        }, 0);
        this.paymentPrice = sumValue;
        this.paymentPriceTemp = sumValue;
      } catch (error) {
        console.log(error);
      }
    },
    async removeCartProducts() {
      try {
        await removeCartProducts({
          cartId: this.cartId,
          cartProductIds: this.cartProductIds,
        });

        await this.$store.dispatch(
          'GETCARTPRODUCTCOUNT',
          this.$store.state.username,
        );
      } catch (error) {
        console.log(error);
      }
    },
    async payment() {
      this.orderProducts.map(orderProduct => {
        delete orderProduct.image;
        return orderProduct;
      });

      const orderDto = {
        userNo: this.user.userNo,
        username: this.user.username,
        phoneNumber: this.user.phoneNumber,
        paymentMethodType: this.paymentMethodType,
        paymentPrice: this.paymentPrice,
        addPoint: this.addPoint,
        usedPoint: this.userPointTemp - this.userPoint,
        depositorName: this.depositorName,
        depositAccountId:
          this.selectedAccount !== null
            ? this.selectedAccount.bankAccountId
            : '',
        depositDueDate:
          this.paymentMethodType === 'WITHOUT_BANKBOOK'
            ? this.depositDueDate
            : '',
        orderProducts: this.orderProducts,
        delivery: {
          recipientName: this.recipientName,
          phoneNumber: this.recipientPhoneNumber,
          requirement: this.requirement,
          address: {
            zoneCode: this.zonecode,
            roadAddress: this.roadAddress,
            address: this.address,
            detailAddress: this.detailAddress,
          },
        },
      };

      console.log(orderDto);
      try {
        const { data } = await createOrder(orderDto);
        console.log(data);

        if (this.cartId) {
          this.removeCartProducts();
        }
        this.$router.push(`/style-shop/order-complete/${data}`);
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
        if (message === '재고 부족') {
          alert('재고 수량을 초과하였습니다.');
          return;
        }
      }
    },
    sumField(key) {
      // sum data in give key (property)
      // let total = 0;
      // const sumValue = this.orderProducts.reduce(
      //   (a, b) => a + (b[key] || 0),
      //   0,
      // );
      let total = 0;
      const sumValue = this.orderProducts.reduce(
        (accumulator, currentValue) => {
          return (total += +currentValue[key]);
        },
        0,
      );

      return sumValue;
    },
    async getListImage(productId) {
      try {
        const { data } = await getListImage({
          productId: productId,
        });
        console.log(data);
        this.listImage = data.byteImage;
      } catch (error) {
        console.log(error);
      }
    },
    async getUser(username) {
      try {
        const { data } = await getUser({
          username: username,
        });
        console.log(data);
        this.user = data;
        this.userPoint = data.pointSum;
        this.userPointTemp = data.pointSum;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      bankAccounts: [],
      paymentMethodTypes: [],
      paymentPriceTemp: null,
      userPointTemp: null,
      addPoint: null,
      pointUsed: 0,
      productName: '',
      salePrice: null,
      shippingFee: null,
      totalPrice: null,
      point: null,
      userPoint: null,
      cartProductIds: null,
      depositDueDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .substr(0, 10),
      menu: false,
      selectedAccount: null,
      depositorName: '',
      depositAccount: [],
      requirement: '',
      productId: null,
      user: {},
      paymentMethodType: 'WITHOUT_BANKBOOK',
      paymentPrice: null,
      radios2: '1',
      recipientName: '',
      recipientPhoneNumber: '',
      zonecode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      headers: [
        { text: '번호', align: 'center', value: 'productId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'productName' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '포인트', align: 'center', value: 'calculatedPoint' },
        { text: '배송비', align: 'center', value: 'shippingFee' },
        { text: '합계', align: 'center', value: 'totalPrice' },
      ],
      listImage: null,
      orderProducts: [],
    };
  },
};
</script>

<style>
label {
  margin-bottom: 0;
}
</style>
