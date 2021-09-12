<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-carousel
          cycle
          height="550px"
          hide-delimiter-background
          show-arrows-on-hover
          :touch="{ left: () => activeSlide--, right: () => activeSlide++ }"
        >
          <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="`data:image/png;base64, ${image}`"
          />
        </v-carousel>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>상품명: {{ productName }}</v-card-title>
          <v-card-text>
            <v-row>
              <div>
                <v-chip
                  v-if="newArrival"
                  x-small
                  color="pink"
                  class="mx-1"
                  label
                  text-color="white"
                >
                  <!-- <v-icon left> mdi-label </v-icon> -->
                  신상품
                </v-chip>
                <v-chip
                  v-if="best"
                  x-small
                  color="pink"
                  class="mx-1"
                  label
                  text-color="white"
                >
                  <!-- <v-icon left> mdi-label </v-icon> -->
                  Best
                </v-chip>
                <v-chip
                  v-if="discount"
                  x-small
                  color="pink"
                  class="mx-1"
                  label
                  text-color="white"
                >
                  <!-- <v-icon left> mdi-label </v-icon> -->
                  할인
                </v-chip>
                <v-chip
                  v-if="productShowType === 'SOLDOUT'"
                  x-small
                  color="pink"
                  class="mx-1"
                  label
                  text-color="white"
                >
                  <!-- <v-icon left> mdi-label </v-icon> -->
                  품절
                </v-chip>
              </div>
            </v-row>
          </v-card-text>

          <v-card-text class="text--primary">
            <div>
              판매 가격: {{ salePrice }} 원, 정상 가격: {{ regularPrice }}
            </div>
            <div>포인트: {{ point }}</div>
            <div>상품 요약: {{ description }}</div>
          </v-card-text>
          <v-container>
            <v-row v-if="firstOptions[0].optionValue" dense align="center">
              <v-col cols="auto"><div class="subtitle-1">옵션1:</div></v-col>
              <v-col>
                <v-select
                  v-model="firstSelected"
                  :items="firstOptions"
                  item-text="optionValue"
                  item-value="optionValue"
                  label="옵션을 선택해 주세요."
                  hide-details
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                  return-object
                />
              </v-col>
            </v-row>
            <v-row v-if="secondOptions[0].optionValue" dense align="center">
              <v-col cols="auto"><div class="subtitle-1">옵션2:</div></v-col>
              <v-col>
                <v-select
                  v-model="secondSelected"
                  :items="secondOptions"
                  item-text="optionValue"
                  item-value="optionValue"
                  label="옵션을 선택해 주세요."
                  hide-details
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                  return-object
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row dense align="center">
              <v-col cols="auto"><div class="subtitle-1">수량:</div> </v-col>
              <v-col cols="3">
                <v-text-field outlined dense hide-details v-model="quantity" />
              </v-col>
              <v-col>
                <v-btn small class="mr-2" icon color="indigo" @click="plus"
                  ><v-icon>mdi-plus</v-icon></v-btn
                ><v-btn small icon color="indigo" @click="minus"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>배송비: {{ shippingFee }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>총 결제 금액: {{ getTotalPrice }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="pt-5">
          <v-btn @click="order" dark block large color="black">
            구매하기
          </v-btn>
        </div>
        <div class="pt-5" />
        <div>
          <v-btn
            @click="addCartProduct"
            block
            outlined
            large
            color="indigo"
            rai
          >
            장바구니
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          centered
          fixed-tabs
          background-color="indigo"
          dark
          slider-color="red"
          slider-size="5"
        >
          <v-tab href="#tab-1"> 상품상세정보 </v-tab>
          <v-tab href="#tab-2"> 상품평 </v-tab>
          <v-tab href="#tab-3"> 상품문의 </v-tab>
          <v-tab href="#tab-4"> 배송안내 </v-tab>
          <v-tab href="#tab-5"> 교환 및 반품 </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-card flat>
              <p v-html="detailInfo" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <product-comment />
          </v-tab-item>
          <v-tab-item value="tab-3">
            <product-qna />
          </v-tab-item>
          <v-tab-item value="tab-4">
            <v-card flat>
              <p v-html="shippingInfo" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-5">
            <v-card flat>
              <p v-html="exchangeReturnInfo" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductComment from '@/components/shop/ProductComment';
import ProductQna from '@/components/shop/ProductQna.vue';
import { getProductById } from '@/api/shopProduct';
import { addCartProduct } from '@/api/cart';

export default {
  created() {
    const productId = this.$route.params.productId;
    this.productId = productId;
    this.getProductById(productId);
  },
  computed: {
    getTotalPrice() {
      return this.salePrice * this.quantity + this.shippingFee;
    },
  },
  data: () => ({
    productId: null,
    images: null,
    productName: '',
    newArrival: null,
    best: null,
    discount: null,
    productShowType: null,
    salePrice: null,
    regularPrice: null,
    point: null,
    description: null,
    shippingFee: null,
    detailInfo: null,
    shippingInfo: null,
    exchangeReturnInfo: null,
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
    tab: null,
    quantity: 1,
  }),
  components: {
    ProductComment,
    ProductQna,
  },
  methods: {
    async addCartProduct() {
      try {
        const { data } = await addCartProduct({
          productId: this.productId,
          quantity: this.quantity,
          firstOptionName: this.firstSelected.optionName,
          firstOptionValue: this.firstSelected.optionValue,
          secondOptionName: this.secondSelected.optionName,
          secondOptionValue: this.secondSelected.optionValue,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    order() {
      console.log(this.firstSelected);
      this.$router.push({
        path: '/style-shop/product-order',
        query: {
          firstOptionName: this.firstSelected.optionName,
          firstOptionValue: this.firstSelected.optionValue,
          secondOptionName: this.secondSelected.optionName,
          secondOptionValue: this.secondSelected.optionValue,
          productId: this.productId,
          productName: this.productName,
          salePrice: this.salePrice,
          quantity: this.quantity,
          shippingFee: this.shippingFee,
          totalPrice: this.getTotalPrice,
          point: this.point,
        },
      });
    },
    async getProductById(productId) {
      try {
        const { data } = await getProductById({
          productId: productId,
        });
        console.log(data);
        this.productId = data.productId;
        this.images = data.byteImages;
        this.productName = data.productName;
        this.newArrival = data.newArrival;
        this.best = data.best;
        this.discount = data.discount;
        this.productShowType = data.productShowType;
        this.salePrice = data.salePrice;
        this.regularPrice = data.regularPrice;
        this.point = data.point;
        this.shippingFee = data.shippingFee;
        this.description = data.description;
        this.detailInfo = data.detailInfo;
        this.shippingInfo = data.shippingInfo;
        this.exchangeReturnInfo = data.exchangeReturnInfo;
        this.firstOptions = data.firstOptions;
        this.secondOptions = data.secondOptions;
      } catch (error) {
        console.log(error);
      }
    },
    plus() {
      this.quantity += 1;
    },
    minus() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
  },
};
</script>

<style></style>
