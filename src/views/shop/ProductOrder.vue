<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="h5">구매 목록</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- <v-simple-table fixed-header dense height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">번호</th>
                <th class="text-center">상품정보</th>
                <th class="text-center">수량</th>
                <th class="text-center">판매가격</th>
                <th class="text-center">포인트</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in orders.slice().reverse()"
                :key="index"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <v-row>
                    <v-col cols="3">
                      <v-img :src="order.imgSrc" max-width="100" />
                    </v-col>
                    <v-col>
                      <div>상품명: {{ order.productName }}</div>
                      <div>색상: {{ order.option1 }}</div>
                      <div>디자인: {{ order.option2 }}</div>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center">{{ order.quantity }}</td>
                <td class="text-center">{{ order.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
        {{ $route.query.productName }}
        <!-- <v-img
          :src="`data:image/png;base64, ` + $route.query.image"
          max-width="100"
        /> -->
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="orders"
          item-key="productId"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              :src="'data:image/png;base64,' + item.image"
              style="width: 50px; height: 50px"
            />
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-row>{{ item.categoryName }}</v-row>
            <v-row>{{ item.name }}</v-row>
          </template>
        </v-data-table>
        <v-divider />
        <template>
          <v-row>
            <v-col cols="10"> 총 상품 금액 </v-col>
            <!-- <v-col>{{ sumField('price') }}</v-col> -->
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
                <v-col cols="2"><div class="subtitle-1">*이름:</div></v-col>
                <v-col
                  ><v-text-field hide-details dense solo-inverted required
                /></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
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
                  ><v-text-field hide-details dense required solo-inverted
                /></v-col>
              </v-row>
              <v-divider />
              <Address />
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">*연락처:</div></v-col>
                <v-col
                  ><v-text-field
                    hide-details
                    dense
                    solo-inverted
                    placeholder="01012341234"
                    counter="11"
                    required
                /></v-col>
              </v-row>
              <v-divider />
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">요청사항:</div></v-col>
                <v-col
                  ><v-textarea hide-details dense filled no-resize
                /></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-title>결제 금액 확인 및 결제 방법 선택</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense align="center">
                <v-col cols="2"
                  ><div class="subtitle-1">총 상품 가격:</div></v-col
                >
                <v-col>
                  <v-text-field
                    reverse
                    value="76000"
                    hide-details
                    dense
                    required
                    solo-inverted
                    readonly
                  />
                </v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"><div class="subtitle-1">배송비:</div></v-col>
                <v-col>
                  <v-text-field
                    reverse
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
                  ><div class="subtitle-1">총 결제 금액:</div></v-col
                >
                <v-col>
                  <v-text-field
                    reverse
                    value="78500"
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
              <v-col cols="2"> <div class="subtitle-1">일반결제</div> </v-col>
              <v-col>
                <v-radio-group
                  dense
                  hide-details
                  v-model="radios1"
                  row
                  class="mt-0"
                >
                  <v-radio value="1">
                    <template v-slot:label>무통장 입금</template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label> 카드결제 </template>
                  </v-radio>
                  <v-radio value="3">
                    <template v-slot:label> 계좌이체 </template>
                  </v-radio>
                  <v-radio value="4">
                    <template v-slot:label> 가상계좌 </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
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
            <v-divider />
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn class="mr-5" to="/style-shop/order-complete"
                  >결제하기</v-btn
                >

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

export default {
  async created() {
    const query = this.$route.query;
    await this.getListImage(query.productId);

    const orders = [
      {
        image: this.listImage,
        productId: query.productId,
        productName: query.productName,
        salePrice: query.salePrice,
        quantity: query.quantity,
        shippingFee: query.shippingFee,
        totalPrice: query.totalPrice,
        point: query.point,
      },
    ];
    this.orders = orders;
    console.log(orders);
  },
  components: {
    Address,
  },
  methods: {
    sumField(key) {
      // sum data in give key (property)
      return this.orders.reduce((a, b) => a + (b[key] || 0), 0);
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
  },
  data() {
    return {
      radios1: '1',
      radios2: '1',

      headers: [
        { text: '번호', align: 'center', value: 'productId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '카테고리와 상품명', align: 'center', value: 'productName' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '포인트', align: 'center', value: 'point' },
        { text: '배송비', align: 'center', value: 'shippingFee' },
        { text: '합계', align: 'center', value: 'totalPrice' },
      ],
      listImage: null,
      orders: [
        {
          productId: null,
          image: null,
          productName: '',
          salePrice: null,
          quantity: null,
          point: null,
          shippingFee: null,
          totalPrice: null,
          option1: '',
          option2: '',
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
