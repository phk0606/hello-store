<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          상품 소개
        </v-chip>
      </v-col>
    </v-row>
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
            <v-row
              v-if="firstOptions && firstOptions[0].optionValue"
              dense
              align="center"
            >
              <v-col cols="2"
                ><div class="subtitle-1">
                  {{ firstOptions[0].optionName }}:
                </div></v-col
              >
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
                  @change="getSecondOptionsInStockQuantity"
                  :menu-props="{ offsetY: true }"
                  return-object
                />
              </v-col>
            </v-row>
            <v-row
              v-if="secondOptions && secondOptions[0].optionValue"
              dense
              align="center"
            >
              <v-col cols="2"
                ><div class="subtitle-1">
                  {{ secondOptions[0].optionName }}:
                </div></v-col
              >
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
                >
                  <template slot="selection" slot-scope="data">
                    <span class="mr-5">{{ data.item.optionValue }}</span>
                    <span
                      >(남음:
                      {{ (stockQuantity = data.item.stockQuantity) }})</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <span class="mr-5">{{ data.item.optionValue }}</span>
                    <span
                      >(남음:
                      {{ (stockQuantity = data.item.stockQuantity) }})</span
                    >
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">수량:</div> </v-col>
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
                <div>총 포인트: {{ getTotalPoint }}</div>
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
import { getProductById, modifyClickCount } from '@/api/shopProduct';
import { addCartProduct } from '@/api/cart';
import {
  getFirstOptionsInStockQuantity,
  getSecondOptionsInStockQuantity,
} from '@/api/stockQuantity';

export default {
  async created() {
    const productId = this.$route.params.productId;
    this.productId = productId;
    await this.getProductById(productId);
    await this.getFirstOptionsInStockQuantity();
    await this.modifyClickCount();
  },
  computed: {
    getTotalPrice() {
      return this.salePrice * this.quantity + this.shippingFee;
    },
    getTotalPoint() {
      return this.point * this.quantity;
    },
  },
  data: () => ({
    stockQuantity: null,
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
        id: null,
        optionGroupNumber: 1,
        optionName: '',
        optionValue: '',
      },
    ],
    secondOptions: [
      {
        id: null,
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
    async getFirstOptionsInStockQuantity() {
      try {
        const { data } = await getFirstOptionsInStockQuantity({
          productId: this.productId,
        });
        if (data.length <= 0) {
          this.firstOptions = [
            {
              id: null,
              optionGroupNumber: 1,
              optionName: '',
              optionValue: '',
            },
          ];
        } else {
          this.firstOptions = data;
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getSecondOptionsInStockQuantity() {
      try {
        const { data } = await getSecondOptionsInStockQuantity({
          productId: this.productId,
          firstOptionId: this.firstSelected.id,
        });
        this.secondOptions = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async modifyClickCount() {
      try {
        const { data } = await modifyClickCount({
          productId: this.productId,
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async addCartProduct() {
      if (!this.$store.getters.isLogin) {
        alert('로그인이 필요합니다.');
        this.$router.push('/authentication/sign-in');
        return;
      }
      if (this.firstOptions[0].optionValue && !this.firstSelected) {
        alert('첫 번째 옵션을 선택해 주세요.');
        return;
      }
      if (this.secondOptions[0].optionValue && !this.secondSelected) {
        alert('두 번째 옵션을 선택해 주세요.');
        return;
      }

      try {
        const { data } = await addCartProduct({
          productId: this.productId,
          quantity: this.quantity,
          productOptions: [
            {
              optionGroupNumber: 1,
              optionId: this.firstSelected.id,
              optionName: this.firstSelected.optionName,
              optionValue: this.firstSelected.optionValue,
            },
            {
              optionGroupNumber: 2,
              optionId: this.secondSelected.id,
              optionName: this.secondSelected.optionName,
              optionValue: this.secondSelected.optionValue,
            },
          ],
        });
        console.log(data);
        await this.$store.dispatch(
          'GETCARTPRODUCTCOUNT',
          this.$store.state.username,
        );
        alert('장바구니에 추가하였습니다.');
      } catch (error) {
        console.log(error);
      }
    },
    order() {
      console.log(this.firstSelected);
      if (!this.$store.getters.isLogin) {
        alert('로그인이 필요합니다.');
        this.$router.push('/authentication/sign-in');
        return;
      }
      if (this.firstOptions[0].optionValue && !this.firstSelected) {
        alert('첫 번째 옵션을 선택해 주세요.');
        return;
      }
      if (this.secondOptions[0].optionValue && !this.secondSelected) {
        alert('두 번째 옵션을 선택해 주세요.');
        return;
      }
      if (this.stockQuantity - this.quantity < 0) {
        alert('재고 수량을 초과하였습니다.');
        return;
      }

      if (!confirm('구매 하시겠습니까?')) {
        return;
      }

      this.$router.push({
        path: '/style-shop/product-order',
        query: {
          productOptions: [
            {
              optionGroupNumber: 1,
              optionId: this.firstSelected.id,
              optionName: this.firstSelected.optionName,
              optionValue: this.firstSelected.optionValue,
            },
            {
              optionGroupNumber: 2,
              optionId: this.secondSelected.id,
              optionName: this.secondSelected.optionName,
              optionValue: this.secondSelected.optionValue,
            },
          ],
          productId: this.productId,
          // productName: this.productName,
          // salePrice: this.salePrice,
          quantity: this.quantity,
          // shippingFee: this.shippingFee,
          // totalPrice: this.getTotalPrice,
          // point: this.point,
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
        // this.firstOptions = data.firstOptions;
        // this.secondOptions = data.secondOptions;
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
