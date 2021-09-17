<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-order-left />
      </v-col>
      <v-col cols="10">
        <v-row dense align="center">
          <v-col cols="auto">
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-col>
          <v-col cols="">
            <v-breadcrumbs :items="items" class="pa-0">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              스타일 숍 주문 상세 보기
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              주문서 관리
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-card outlined>
              <v-container fluid>
                <v-row>
                  <v-col cols="3">주문일: {{ orderCreatedDate }}</v-col>
                  <v-col cols="3">주문고객: {{ name }}({{ username }})</v-col>
                  <v-col cols="auto">주문번호: {{ orderId }}</v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="auto">결제 상태:</v-col>
                  <v-col cols="3">
                    <v-select
                      class="ml-3"
                      label="항목 선택"
                      v-model="paymentStatusSelected"
                      :items="paymentStatus"
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                  /></v-col>
                  <v-col cols="auto" class="ml-3">주문 처리 상태:</v-col>
                  <v-col cols="3">
                    <v-select
                      label="항목 선택"
                      v-model="orderStatusSelected"
                      :items="orderStatus"
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                  /></v-col>
                  <v-spacer />
                  <v-col cols="auto"
                    ><v-btn class="mr-9">교환 진행</v-btn></v-col
                  >
                </v-row>
                <v-row align="center">
                  <v-col cols="auto">운송장번호:</v-col>
                  <v-col cols="3">
                    <v-select
                      label="택배 회사"
                      v-model="paymentStatusSelected"
                      :items="paymentStatus"
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                  /></v-col>
                  <v-col cols="4"
                    ><v-text-field
                      placeholder="운송장번호 입력"
                      hide-details
                      dense
                      solo-inverted
                      required
                  /></v-col>
                  <v-col cols="auto"><v-btn>배송 조회</v-btn></v-col>
                  <v-spacer />
                  <v-col cols="auto"><v-btn>주문 취소 하기</v-btn></v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              주문 상품
            </v-chip>
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
                <v-container>
                  <v-row dense
                    ><v-col cols="3" class="pr-0">
                      <div class="text-right">상품명:</div></v-col
                    >
                    <v-col
                      ><div class="text-left">
                        {{ item.productName }}
                      </div></v-col
                    ></v-row
                  >

                  <v-row
                    v-if="item.firstOptions && item.firstOptions[0].optionValue"
                    dense
                    align="center"
                  >
                    <v-col cols="3"
                      ><div class="text-right">
                        {{ item.firstOptions[0].optionName }}:
                      </div></v-col
                    >
                    <v-col>
                      <v-select
                        v-model="item.productOptions[0]"
                        :items="item.firstOptions"
                        item-text="optionValue"
                        item-value="optionValue"
                        hide-details
                        outlined
                        dense
                        :menu-props="{ offsetY: true }"
                        return-object
                        @change="
                          setFirstSelected(item.productOptions[0].optionValue)
                        "
                      />
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="
                      item.secondOptions && item.secondOptions[0].optionValue
                    "
                    dense
                    align="center"
                  >
                    <v-col cols="3"
                      ><div class="text-right">
                        {{ item.secondOptions[0].optionName }}:
                      </div></v-col
                    >
                    <v-col>
                      <v-select
                        v-model="item.productOptions[1]"
                        :items="item.secondOptions"
                        item-text="optionValue"
                        item-value="optionValue"
                        hide-details
                        outlined
                        dense
                        :menu-props="{ offsetY: true }"
                        return-object
                        @change="
                          setFirstSelected(item.productOptions[0].optionValue)
                        "
                      />
                    </v-col>
                  </v-row>
                </v-container>
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
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              배송 정보
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="8">
            <v-card ref="form">
              <v-card-title>주문자 정보</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row dense align="center">
                    <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                    <v-col
                      ><v-text-field
                        v-model="name"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">*연락처:</div></v-col
                    >
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
                </v-container>
              </v-card-text>
              <v-card-title>수령자 정보</v-card-title>
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
                    <v-col cols="2">
                      <div class="subtitle-1">*주소:</div>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="fullAddress"
                        hide-details
                        dense
                        required
                        solo-inverted
                      />
                    </v-col>
                  </v-row>
                  <v-divider />
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">*연락처:</div></v-col
                    >
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
                    <v-col cols="2"
                      ><div class="subtitle-1">요청사항:</div></v-col
                    >
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
              <v-card-title>결제 정보</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">결제 금액:</div></v-col
                    >
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
                    <v-col cols="2"
                      ><div class="subtitle-1">배송료:</div></v-col
                    >
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
                    <v-col cols="2"
                      ><div class="subtitle-1">결제 방법:</div></v-col
                    >
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
                  <v-row justify="center">
                    <v-col cols="auto">
                      <v-btn>저장</v-btn>
                      <v-btn color="ml-3">취소</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getOrder } from '@/api/order';
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';

export default {
  name: 'OrderDetailInfo',
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  components: {
    AdminOrderLeft,
  },
  methods: {
    setFirstSelected(selected) {
      console.log(selected);
      this.firstSelected = selected;
    },
    setSecondSelected(selected) {
      console.log(selected);
      this.secondSelected = selected;
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
        this.orderCreatedDate = data.createdDate;
        this.orderDeliveryStatusValue = data.orderDeliveryStatusValue;
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
      firstOptions: [
        {
          optionGroupNumber: 1,
          optionName: '',
          optionValue: '',
        },
      ],
      secondOptions: [
        {
          optionGroupNumber: 2,
          optionName: '',
          optionValue: '',
        },
      ],
      firstSelected: null,
      secondSelected: null,
      paymentStatusSelected: null,
      paymentStatus: [
        { text: '결제 전', value: 'BEFORE' },
        { text: '결제 완료', value: 'FINISHED' },
        { text: '결제 취소', value: 'CANCEL' },
      ],
      orderStatusSelected: null,
      orderStatus: [
        { text: '주문 확인 전', value: 'orderId' },
        { text: '주문 확인', value: 'orderProduct' },
        { text: '배송 준비 중', value: 'orderUsername' },
        { text: '배송 중', value: 'ordername' },
        { text: '배송 완료', value: 'ordername' },
      ],
      items: [
        {
          text: '주문 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '스타일 숍 주문 관리',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '상세 보기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
      orderDeliveryStatusValue: null,
      orderCreatedDate: null,
      name: '',
      username: '',
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
