<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">주문 완료</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h6>주문번호: {{ orderId }}</h6>
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="orderProducts"
          item-key="orderProductId"
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
            <v-row>상품명: {{ item.productName }}</v-row>
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
          <v-row justify="end">
            <v-col cols="auto">
              총 상품 금액: {{ sumField('salePrice') }}
            </v-col>
            <v-col cols="auto"> 총 적립 포인트: {{ sumField('point') }} </v-col>
            <v-col cols="auto">
              총 배송비: {{ sumField('shippingFee') }}
            </v-col>
            <v-col cols="auto">
              총 결제 금액: {{ (totalPriceSum = sumField('totalPrice')) }}
            </v-col>
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
                <v-col
                  ><v-text-field
                    label="이름"
                    v-model="name"
                    hide-details
                    required
                    readonly
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col
                  ><v-text-field
                    label="연락처"
                    v-model="phoneNumber"
                    hide-details
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
                <v-col
                  ><v-text-field
                    label="이름"
                    v-model="recipientName"
                    hide-details
                    required
                    readonly
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col>
                  <v-text-field
                    label="주소"
                    v-model="fullAddress"
                    hide-details
                    required
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col
                  ><v-text-field
                    label="연락처"
                    v-model="recipientPhoneNumber"
                    hide-details
                    counter="11"
                    required
                    readonly
                /></v-col>
              </v-row>
              <v-row align="center">
                <v-col
                  ><v-textarea
                    label="요청사항"
                    v-model="requirement"
                    hide-details
                    no-resize
                    outlined
                    readonly
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>결제 정보</v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center">
                <v-col>
                  <v-text-field
                    reverse
                    label="결제 방법"
                    v-model="paymentMethodType"
                    hide-details
                    required
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col>
                  <v-text-field
                    reverse
                    label="결제 금액 합계"
                    v-model="totalPriceSum"
                    hide-details
                    required
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col>
                  <v-text-field
                    reverse
                    label="사용 포인트"
                    v-model="usedPoint"
                    hide-details
                    required
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col>
                  <v-text-field
                    reverse
                    label="최종 결제 금액"
                    v-model="paymentPrice"
                    hide-details
                    required
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-space-around">
                  <v-btn to="/my-page/order-info">주문내역/배송조회 확인</v-btn>

                  <v-btn to="/style-shop/product-list/null/null"
                    >쇼핑 계속하기</v-btn
                  >
                  <v-btn to="/">메인으로 가기</v-btn>
                  <v-btn @click="logoutUser">로그아웃</v-btn>
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
import { getOrder } from '@/api/order';
import { deleteCookie } from '@/utils/cookies';

export default {
  name: 'OrderComplete',
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  methods: {
    logoutUser() {
      deleteCookie('ecomm_accessToken');
      deleteCookie('ecomm_refreshToken');
      deleteCookie('ecomm_user');
      deleteCookie('ecomm_authority');
      deleteCookie('ecomm_cartProductCount');
      this.$store.commit('clearUsername');
      this.$store.commit('clearAccessToken');
      this.$store.commit('clearRefreshToken');
      this.$store.commit('clearAuthority');
      this.$store.commit('clearCartProductCount');

      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    async getOrder(orderId) {
      try {
        const { data } = await getOrder({
          orderId: orderId,
        });
        console.log(data);
        this.name = data.name;
        this.phoneNumber = data.phoneNumber;
        this.orderProducts = data.orderProducts;
        this.requirement = data.requirement;
        this.recipientName = data.recipientName;
        this.recipientPhoneNumber = data.recipientPhoneNumber;
        this.fullAddress =
          data.address.address + ' ' + data.address.detailAddress;

        let paymentMethodType = data.paymentMethodType;
        if (paymentMethodType === 'WITHOUT_BANKBOOK') {
          paymentMethodType = '무통장 입금';
        } else if (paymentMethodType === 'CREDIT_CARD') {
          paymentMethodType = '카드 결제';
        } else if (paymentMethodType === 'ACCOUNT_TRANSFER') {
          paymentMethodType = '계좌 이체';
        }
        this.paymentMethodType = paymentMethodType;
        this.paymentPrice = data.paymentPrice;
        this.usedPoint = data.usedPoint;
      } catch (error) {
        console.log(error);
      }
    },
    sumField(key) {
      // sum data in give key (property)
      return this.orderProducts.reduce((a, b) => a + (b[key] || 0), 0);
    },
  },
  data() {
    return {
      usedPoint: null,
      totalPriceSum: null,
      name: '',
      phoneNumber: '',
      requirement: '',
      recipientName: '',
      recipientPhoneNumber: '',
      fullAddress: '',
      paymentMethodType: '',
      paymentPrice: '',
      orderId: '',
      headers: [
        { text: '번호', align: 'center', value: 'orderProductId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'productName' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '포인트', align: 'center', value: 'point' },
        { text: '배송비', align: 'center', value: 'shippingFee' },
        { text: '합계', align: 'center', value: 'totalPrice' },
      ],
      orderProducts: [
        {
          image: null,
          productId: null,
          productName: '',
          salePrice: null,
          orderQuantity: null,
          orderShippingFee: null,
          totalPrice: null,
          point: null,
          orderProductOptions: [
            {
              optionGroupNumber: 1,
              optionName: this.firstOptionName,
              optionValue: this.firstOptionValue,
            },
            {
              optionGroupNumber: 2,
              optionName: this.secondOptionName,
              optionValue: this.secondOptionValue,
            },
          ],
        },
      ],
      selected: [],
    };
  },
};
</script>

<style></style>
