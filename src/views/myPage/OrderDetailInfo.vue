<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h5>주문 상세 내역</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="auto">주문번호: {{ orderId }}</v-col>
          <v-col cols="auto">주문일: {{ orderCreatedDate }}</v-col>
          <v-spacer />
          <v-col cols="auto">[주문 배송 상태]</v-col
          ><v-col cols="auto">{{ orderDeliveryStatusValue }}</v-col>
        </v-row>
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
      <v-col cols="8">
        <v-card ref="form">
          <v-card-title>
            <v-container>
              <v-row align="center" justify="space-between">
                <v-col cols="auto">주문자 정보</v-col>
                <v-col cols="auto"
                  ><v-btn
                    v-if="orderDeliveryStatus !== 'COMPLETE_SHIP'"
                    @click="modifyPhoneNumber"
                    >수정</v-btn
                  ></v-col
                >
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="name"
                    hide-details
                    dense
                    solo-inverted
                    required
                    disabled
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="phoneNumber"
                    hide-details
                    dense
                    solo-inverted
                    value="01012341234"
                    counter="11"
                    required
                /></v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-title>
            <v-container>
              <v-row align="center" justify="space-between">
                <v-col cols="auto">배송 정보</v-col>
                <v-col cols="auto"
                  ><v-btn
                    v-if="orderDeliveryStatus !== 'COMPLETE_SHIP'"
                    @click="modifyDeliveryInfo"
                    >수정</v-btn
                  ></v-col
                >
              </v-row>
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
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    v-model="recipientPhoneNumber"
                    hide-details
                    dense
                    solo-inverted
                    counter="11"
                    required
                /></v-col>
              </v-row>
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
          </v-card-title>
          <v-card-title>
            <v-container>
              <v-row align="center" justify="space-between">
                <v-col cols="auto">결제 정보</v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">결제 금액:</div></v-col>
                <v-col>
                  <v-text-field
                    v-model="paymentPrice"
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
                  ><div class="subtitle-1">사용포인트:</div></v-col
                >
                <v-col>
                  <v-text-field
                    value=""
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
                    v-model="paymentMethodType"
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
                  <v-btn
                    class="ml-3"
                    @click="orderCancel(orderId)"
                    v-if="
                      orderDeliveryStatus === 'BEFORE_CONFIRM' ||
                      orderDeliveryStatus === 'CONFIRM_ORDER'
                    "
                    >주문취소</v-btn
                  >
                  <v-btn
                    class="ml-3"
                    v-if="
                      orderDeliveryStatus === 'READY_SHIP' ||
                      orderDeliveryStatus === 'SHIPPING' ||
                      orderDeliveryStatus === 'COMPLETE_SHIP'
                    "
                    >교환/환불</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Address from '@/components/Address';
import {
  getOrder,
  modifyOrdererPhoneNumber,
  modifyDeliveryInfo,
  orderCancel,
} from '@/api/order';

export default {
  name: 'OrderDetailInfo',
  components: {
    Address,
  },
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  methods: {
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
    async modifyPhoneNumber() {
      const orderDeliveryStatus = this.orderDeliveryStatus;
      if (
        orderDeliveryStatus === 'READY_SHIP' ||
        orderDeliveryStatus === 'SHIPPING'
      ) {
        alert('배송 단계이므로 정보를 수정할 수 없습니다.');
        return;
      } else {
        try {
          await modifyOrdererPhoneNumber({
            orderId: this.orderId,
            phoneNumber: this.phoneNumber,
          });
          //console.log(data);
        } catch (error) {
          console.log(error.response);
          // this.logMessage = error.response.data.message;
        }
      }
    },
    async modifyDeliveryInfo() {
      const orderDeliveryStatus = this.orderDeliveryStatus;
      if (
        orderDeliveryStatus === 'READY_SHIP' ||
        orderDeliveryStatus === 'SHIPPING'
      ) {
        alert('배송 단계이므로 정보를 수정할 수 없습니다.');
        return;
      } else {
        try {
          await modifyDeliveryInfo({
            orderId: this.orderId,
            recipientName: this.recipientName,
            recipientPhoneNumber: this.recipientPhoneNumber,
            requirement: this.requirement,
            address: {
              zoneCode: this.zonecode,
              roadAddress: this.roadAddress,
              address: this.address,
              detailAddress: this.detailAddress,
            },
          });
          //console.log(data);
        } catch (error) {
          console.log(error.response);
          // this.logMessage = error.response.data.message;
        }
      }
    },
    async orderCancel(orderId) {
      try {
        const { data } = await orderCancel({
          orderId: orderId,
        });
        console.log(data);

        this.getOrder(orderId);
      } catch (error) {
        console.log(error);
      }
    },
    async getOrder(orderId) {
      try {
        const { data } = await getOrder({
          orderId: orderId,
        });
        console.log(data);
        this.name = data.name;
        this.username = data.username;
        this.phoneNumber = data.phoneNumber;
        this.orderProducts = data.orderProducts;
        this.requirement = data.requirement;
        this.recipientName = data.recipientName;
        this.recipientPhoneNumber = data.recipientPhoneNumber;
        this.zonecode = data.address.zoneCode;
        this.roadAddress = data.address.roadAddress;
        this.address = data.address.address;
        this.detailAddress = data.address.detailAddress;
        this.paymentMethodType = data.paymentMethodTypeValue;
        this.paymentPrice = data.paymentPrice;
        this.orderCreatedDate = data.createdDate;
        this.orderDeliveryStatusValue = data.orderDeliveryStatusValue;
        this.orderDeliveryStatus = data.orderDeliveryStatus;
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
      zonecode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      orderDeliveryStatusValue: null,
      orderDeliveryStatus: null,
      orderCreatedDate: null,
      name: '',
      username: '',
      phoneNumber: '',
      requirement: '',
      recipientName: '',
      recipientPhoneNumber: '',
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
