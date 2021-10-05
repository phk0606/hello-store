<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h5>교환/환불 신청</h5>
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
          show-select
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
          <template v-slot:[`item.exchangeRefund`]="{ item }">
            <v-row dense align="center">
              <v-col
                ><v-radio-group
                  v-model="item.exchangeRefund"
                  dense
                  row
                  hide-details
                >
                  <v-radio value="exchange" label="교환" />
                  <v-radio
                    class="mr-0"
                    value="refund"
                    label="환불"
                  /> </v-radio-group
              ></v-col>
            </v-row>
          </template>
        </v-data-table>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card ref="form">
          <v-container>
            <v-row dense align="center">
              <v-col cols="2"
                ><div class="subtitle-1">교환 환불 상품:</div></v-col
              >
              <v-col
                ><v-row
                  v-for="(
                    getExchangeRefundProduct, i
                  ) in getExchangeRefundProducts"
                  :key="i"
                  >{{ getExchangeRefundProduct }}</v-row
                ></v-col
              >
            </v-row>
            <v-divider />

            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">사유 선택</div></v-col>
              <v-col
                ><v-radio-group dense row hide-details>
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
              <v-col><v-textarea hide-details dense filled no-resize /></v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="2"
                ><div class="subtitle-1">이미지 업로드:</div></v-col
              >
              <v-col>
                <v-file-input
                  dense
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                />
                <v-file-input
                  dense
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                />
                <v-file-input
                  dense
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">배송비 결제:</div></v-col>
              <v-col>
                {배송비} 원 ※ 교환/환불 사유가 '사이즈, 색상 변경'. '단순
                변심'의 경우 배송비를 고객님께서 부담하셔야 하므로, [교환/환불
                신청하기] 클릭 시 배송비 결제가 진행됩니다.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto"><v-btn>신청하기</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getOrder } from '@/api/order';

export default {
  name: 'Exchange',
  components: {},
  created() {
    const orderId = this.$route.params.orderId;
    this.getOrder(orderId);
    this.orderId = orderId;
  },
  computed: {
    getExchangeRefundProducts() {
      return this.selected.map(item => {
        let exchangeRefund = '';
        if (item.exchangeRefund === 'exchange') {
          exchangeRefund = '교환';
        } else if (item.exchangeRefund === 'refund') {
          exchangeRefund = '환불';
        } else {
          exchangeRefund = '교환 또는 환불 선택 필요';
        }
        return (
          item.orderProductId +
          ': ' +
          item.productName +
          ' (' +
          exchangeRefund +
          ')'
        );
      });
    },
  },
  methods: {
    async getOrder(orderId) {
      try {
        const { data } = await getOrder({
          orderId: orderId,
        });
        console.log(data);

        this.orderProducts = data.orderProducts;
      } catch (error) {
        console.log(error);
      }
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
        { text: '교환/환불', align: 'center', value: 'exchangeRefund' },
      ],
      orderProducts: [],
      selected: [],
    };
  },
};
</script>

<style></style>
