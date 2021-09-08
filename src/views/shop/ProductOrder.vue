<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">구매 목록</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="orderProducts"
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
            <v-row v-if="item.orderProductOptions[0].optionName"
              >{{ item.orderProductOptions[0].optionName }}:
              {{ item.orderProductOptions[0].optionValue }}</v-row
            >
            <v-row v-if="item.orderProductOptions[1].optionName"
              >{{ item.orderProductOptions[1].optionName }}:
              {{ item.orderProductOptions[1].optionValue }}</v-row
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
              <v-col cols="auto">{{ sumField('orderShippingFee') }}</v-col>
              <v-col cols="auto"> 총 결제 금액 </v-col>
              <v-col cols="auto">{{ sumField('totalPrice') }}</v-col>
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
                <v-col>
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
                <v-col cols="2"><div class="subtitle-1">총 배송비:</div></v-col>
                <v-col>
                  <v-text-field
                    reverse
                    :value="sumField('orderShippingFee')"
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
                  ><div class="subtitle-1">총 결제 금액:</div></v-col
                >
                <v-col>
                  <v-text-field
                    reverse
                    :value="sumField('totalPrice')"
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
                        <v-radio value="WITHOUT_BANKBOOK">
                          <template v-slot:label>무통장 입금</template>
                        </v-radio>
                        <v-radio value="CREDIT_CARD">
                          <template v-slot:label> 카드결제 </template>
                        </v-radio>
                        <v-radio value="ACCOUNT_TRANSFER">
                          <template v-slot:label> 계좌이체 </template>
                        </v-radio>
                        <!-- <v-radio value="4">
                    <template v-slot:label> 가상계좌 </template>
                  </v-radio> -->
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <template v-if="paymentMethodType === 'WITHOUT_BANKBOOK'">
                    <v-row dense align="center">
                      <v-col cols="3"> ● 입금 계좌 선택 </v-col>
                      <v-col
                        ><v-select
                          v-model="selectedBank"
                          :items="depositAccount"
                          item-text="optionText"
                          item-value="optionValue"
                          label="입금 은행을 선택해 주세요."
                          hide-details
                          outlined
                          dense
                          :menu-props="{ offsetY: true }"
                          return-object
                      /></v-col>
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
                              v-model="date1"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="date1"
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
                <v-btn>취소</v-btn>
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
import { getListImage } from '@/api/shopProduct';
import { getUser } from '@/api/user';
import { createOrder } from '@/api/order';

export default {
  async created() {
    const query = this.$route.query;
    await this.getListImage(query.productId);

    const orderProducts = [
      {
        image: this.listImage,
        productId: query.productId,
        productName: query.productName,
        salePrice: query.salePrice,
        orderQuantity: query.quantity,
        orderShippingFee: query.shippingFee,
        totalPrice: query.totalPrice,
        point: query.point,
        orderProductOptions: [
          {
            optionGroupNumber: 1,
            optionName: query.firstOptionName,
            optionValue: query.firstOptionValue,
          },
          {
            optionGroupNumber: 2,
            optionName: query.secondOptionName,
            optionValue: query.secondOptionValue,
          },
        ],
      },
    ];
    this.orderProducts = orderProducts;
    this.productId = query.productId;
    const username = this.$store.state.username;
    console.log(username);

    this.getUser(username);
  },
  components: {
    Address,
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
    async payment() {
      this.orderProducts.map(orderProduct => {
        delete orderProduct.image;
        return orderProduct;
      });

      const orderDto = {
        productId: this.productId,
        userNo: this.user.userNo,
        username: this.user.username,
        phoneNumber: this.user.phoneNumber,
        paymentMethodType: this.paymentMethodType,
        orderProducts: this.orderProducts,
        delivery: {
          recipientName: this.recipientName,
          phoneNumber: this.recipientPhoneNumber,
          requirement: this.requirement,
          address: {
            zoneCode: this.zonecode,
            address: this.address,
            detailAddress: this.detailAddress,
          },
        },
      };

      console.log(orderDto);
      try {
        const { data } = await createOrder(orderDto);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    sumField(key) {
      // sum data in give key (property)
      let total = 0;
      return this.orderProducts.reduce((accumulator, currentValue) => {
        return (total += +currentValue[key]);
      }, 0);
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      selectedBank: null,
      depositorName: '',
      depositAccount: [
        {
          optionText: '하나은행 110-234-05234 헬로스토어',
          optionValue: 'HanaBank',
        },
        {
          optionText: '우리은행 110-234-05234 헬로스토어',
          optionValue: 'WooriBank',
        },
        {
          optionText: '국민은행 110-234-05234 헬로스토어',
          optionValue: 'KBBank',
        },
      ],
      requirement: '',
      productId: null,
      user: {},
      paymentMethodType: 'WITHOUT_BANKBOOK',
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
        { text: '수량', align: 'center', value: 'orderQuantity' },
        { text: '포인트', align: 'center', value: 'point' },
        { text: '배송비', align: 'center', value: 'orderShippingFee' },
        { text: '합계', align: 'center', value: 'totalPrice' },
      ],
      listImage: null,
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

<style>
label {
  margin-bottom: 0;
}
</style>
