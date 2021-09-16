<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h5>교환/환불 신청</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card ref="form">
          <v-card-title>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">교환 환불 상품:</div></v-col
                >
                <v-col
                  ><v-text-field
                    label="상품명"
                    hide-details
                    dense
                    solo-inverted
                    required
                    disabled
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">교환 환불 선택</div></v-col
                >
                <v-col
                  ><v-radio-group v-model="showRadio" dense row hide-details>
                    <v-radio value="SHOW" label="교환" />
                    <v-radio
                      class="mr-0"
                      value="HIDE"
                      label="환불"
                    /> </v-radio-group
                ></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">사유 선택</div></v-col>
                <v-col
                  ><v-radio-group v-model="showRadio" dense row hide-details>
                    <v-radio value="SHOW" label="색상/사이즈 변경" />
                    <v-radio class="mr-0" value="HIDE" label="단순 변심" />
                    <v-radio class="mr-0" value="HIDE" label="제품 파손" />
                    <v-radio class="mr-0" value="HIDE" label="오배송" />
                    <v-radio value="HIDE" label="기타" /> </v-radio-group
                ></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">내용 작성:</div></v-col>
                <v-col
                  ><v-textarea hide-details dense filled no-resize
                /></v-col>
              </v-row>
              <v-divider />
              <v-row>
                <v-col cols="2"
                  ><div class="subtitle-1">이미지 업로드:</div></v-col
                >
                <v-col>
                  <v-file-input
                    dense
                    v-model="image1"
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                  />
                  <v-file-input
                    dense
                    v-model="image1"
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                  />
                  <v-file-input
                    dense
                    v-model="image1"
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                  />
                </v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">배송비 결제:</div></v-col
                >
                <v-col>
                  {배송비} 원 ※ 교환/환불 사유가 '사이즈, 색상 변경'. '단순
                  변심'의 경우 배송비를 고객님께서 부담하셔야 하므로, [교환/환불
                  신청하기] 클릭 시 배송비 결제가 진행됩니다.
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto"><v-btn>신청하기</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getOrder,
  modifyOrdererPhoneNumber,
  modifyDeliveryInfo,
} from '@/api/order';

export default {
  name: 'OrderDetailInfo',
  components: {},
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
