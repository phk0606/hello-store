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
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="orderProducts"
          item-key="orderProductId"
          show-select
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
          <v-row>
            <v-col cols="10"> 총 상품 금액 </v-col>
            <v-col>{{ sumField('totalPrice') }}</v-col>
          </v-row>
        </template>
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
import { getOrder } from '@/api/order';

export default {
  name: 'OrderDetailInfo',
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  methods: {
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
