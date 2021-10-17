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
                  <v-col cols="auto" class="ml-3">주문 상태:</v-col>
                  <v-col cols="3">
                    <v-select
                      label="항목 선택"
                      v-model="orderDeliveryStatusSelected"
                      :items="orderDeliveryStatus"
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
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                  /></v-col>
                  <v-col cols="4"
                    ><v-text-field
                      label="운송장번호 입력"
                      hide-details
                      dense
                      required
                  /></v-col>
                  <v-col cols="auto"><v-btn>배송 조회</v-btn></v-col>
                  <v-spacer />
                  <v-col cols="auto"
                    ><v-btn @click="orderCancel(orderId)"
                      >주문 취소 하기</v-btn
                    ></v-col
                  >
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
                  <v-col cols="auto">
                    총 상품 금액: {{ sumField('salePrice') }}
                  </v-col>
                  <v-col cols="auto">
                    총 적립 포인트: {{ sumField('point') }}
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
                  <v-row align="center">
                    <v-col
                      ><v-text-field
                        label="이름"
                        v-model="name"
                        hide-details
                        readonly
                        required
                    /></v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col
                      ><v-text-field
                        label="연락처"
                        hide-details
                        value="01012341234"
                        counter="11"
                        readonly
                        required
                    /></v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-title>수령자 정보</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row align="center">
                    <v-col
                      ><v-text-field
                        label="이름"
                        v-model="recipientName"
                        hide-details
                        required
                        clearable
                    /></v-col>
                  </v-row>
                  <v-divider />
                  <v-row dense align="center">
                    <v-col>
                      <Address
                        v-on:setAddress="setAddress"
                        v-on:setDetailAddress="setDetailAddress"
                        :zonecode="zoneCode"
                        :roadAddress="roadAddress"
                        :address="address"
                        :detailAddress="detailAddress"
                      />
                    </v-col>
                  </v-row>
                  <v-divider />
                  <v-row align="center">
                    <v-col
                      ><v-text-field
                        label="연락처"
                        v-model="recipientPhoneNumber"
                        hide-details
                        counter="11"
                        required
                        clearable
                    /></v-col>
                  </v-row>
                  <v-divider />
                  <v-row align="center">
                    <v-col
                      ><v-textarea
                        label="요청사항"
                        v-model="requirement"
                        hide-details
                        outlined
                        no-resize
                        clearable
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
                        label="결제 금액"
                        v-model="paymentPrice"
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
                        label="배송료"
                        :value="sumField('shippingFee')"
                        hide-details
                        required
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col>
                      <v-text-field
                        label="사용포인트"
                        reverse
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
                        label="결제 방법"
                        v-model="paymentMethodTypeValue"
                        hide-details
                        required
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <template v-if="paymentMethodType === 'WITHOUT_BANKBOOK'">
                    <v-row align="center">
                      <v-col>
                        <v-text-field
                          label="입금 계좌"
                          reverse
                          v-model="depositAccount"
                          hide-details
                          required
                          readonly
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col>
                        <v-text-field
                          label="입금자 명"
                          reverse
                          v-model="depositorName"
                          hide-details
                          required
                          readonly
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col>
                        <v-text-field
                          label="입금 예정일"
                          reverse
                          v-model="depositDueDate"
                          hide-details
                          required
                          readonly
                        />
                      </v-col>
                    </v-row>
                  </template>
                  <v-row justify="center">
                    <v-col cols="auto">
                      <v-btn @click="modifyOrder">저장</v-btn>
                      <v-btn to="/admin/order-list" color="ml-3">취소</v-btn>
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
import { getOrder, orderCancel, modifyOrder } from '@/api/order';
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';
import Address from '@/components/Address';

export default {
  name: 'OrderDetailInfo',
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  components: {
    AdminOrderLeft,
    Address,
  },
  methods: {
    setAddress(zonecode, roadAddress, address) {
      // console.log(zonecode, roadAddress, address);
      this.zoneCode = zonecode;
      this.roadAddress = roadAddress;
      this.address = address;
    },
    setDetailAddress(detailAddress) {
      // console.log(detailAddress);
      this.detailAddress = detailAddress;
    },
    async modifyOrder() {
      try {
        const { data } = await modifyOrder({
          orderId: this.orderId,
          paymentStatus: this.paymentStatusSelected,
          orderDeliveryStatus: this.orderDeliveryStatusSelected,
          recipientName: this.recipientName,
          deliveryId: this.deliveryId,
          orderProducts: this.orderProducts,
          address: {
            zoneCode: this.zoneCode,
            roadAddress: this.roadAddress,
            address: this.address,
            detailAddress: this.detailAddress,
          },
          recipientPhoneNumber: this.recipientPhoneNumber,
          requirement: this.requirement,
        });
        console.log(data);

        alert('주문이 수정 되었습니다.');
        this.$router.push('/admin/order-list');
      } catch (error) {
        console.error(error);
      }
    },
    async orderCancel(orderId) {
      try {
        const { data } = await orderCancel({
          orderId: orderId,
        });
        console.log(data);
        alert('주문이 취소 되었습니다.');
        this.$router.push('/admin/order-list');
        // this.getOrder(orderId);
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
        this.deliveryId = data.deliveryId;
        this.requirement = data.requirement;
        this.recipientName = data.recipientName;
        this.recipientPhoneNumber = data.recipientPhoneNumber;
        this.zoneCode = data.address.zoneCode;
        this.roadAddress = data.address.roadAddress;
        this.address = data.address.address;
        this.detailAddress = data.address.detailAddress;

        this.paymentMethodType = data.paymentMethodType;
        this.paymentMethodTypeValue = data.paymentMethodTypeValue;
        this.paymentPrice = data.paymentPrice;
        this.orderCreatedDate = data.createdDate;
        this.orderDeliveryStatusValue = data.orderDeliveryStatusValue;
        this.paymentStatusSelected = data.paymentStatus;
        this.orderDeliveryStatusSelected = data.orderDeliveryStatus;
        this.depositAccount = data.depositAccount;
        this.depositorName = data.depositorName;
        this.depositDueDate = data.depositDueDate;
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
      zoneCode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      usedPoint: null,
      depositAccount: '',
      depositorName: '',
      depositDueDate: '',
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
      paymentStatusSelected: null,
      paymentStatus: [
        { text: '결제 전', value: 'BEFORE' },
        { text: '결제 완료', value: 'FINISHED' },
        { text: '결제 취소', value: 'CANCEL' },
      ],
      orderDeliveryStatusSelected: null,
      orderDeliveryStatus: [
        { text: '주문 확인 전', value: 'ORDER_CONFIRM_BEFORE' },
        { text: '주문 확인 완료', value: 'ORDER_CONFIRM_COMPLETE' },
        { text: '배송 준비 중', value: 'SHIPPING_READY' },
        { text: '배송 중', value: 'SHIPPING' },
        { text: '배송 완료', value: 'SHIPPING_COMPLETE' },
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
      deliveryId: null,
      recipientName: '',
      recipientPhoneNumber: '',
      paymentMethodType: '',
      paymentMethodTypeValue: '',
      paymentPrice: '',
      orderId: '',
      headers: [
        { text: '번호', align: 'center', value: 'orderProductId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        {
          text: '상품 정보',
          align: 'center',
          value: 'productName',
          width: '30%',
        },
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
