<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img
          height="550px"
          src="http://gdimg.gmarket.co.kr/1677536429/still/600?ver=1569323291"
        >
          <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
        </v-img>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>상품명: 기모티셔츠</v-card-title>
          <v-card-text>
            <v-row>
              <div>
                <v-chip
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
            <div>판매 가격: 15,000 원</div>
            <div>포인트: 250</div>
            <div>상품 요약: 깃털처럼 가벼운 것에 비해 최고 효과</div>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="auto">
                <v-subheader>옵션1</v-subheader>
                <v-select
                  :items="items"
                  label="옵션을 선택해 주세요."
                  hide-details
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                  class="pb-4"
                />
                <v-subheader>옵션2</v-subheader>
                <v-select
                  :items="items"
                  label="옵션을 선택해 주세요."
                  hide-details
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-container fluid>
            <v-row dense align="center">
              <v-col cols="2" class="pr-0"> 수량: </v-col>
              <v-col cols="3">
                <v-text-field outlined dense hide-details v-model="num" />
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
                <div>배송비:</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>총 결제 금액:</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="pt-5">
          <v-btn dark block large color="black" to="/style-shop/product-order">
            구매하기
          </v-btn>
        </div>
        <div class="pt-5" />
        <div>
          <v-btn block outlined large color="indigo" rai> 장바구니 </v-btn>
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
              <v-img
                src="//rooseoin.co.kr/web/upload/NNEditor/20210126/5d9bcb9618446c391134799c5ecea042.jpg"
              />
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
              <v-img
                src="https://beidelli.com/_d1/img/detailfix_delivery.jpg"
              />
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-5">
            <v-card flat>
              <v-img
                src="https://app-storage-edge-006.cafe24.com/bannerplus/ju021026/2020/06/30/8735105994f4f71748fce77753053d07.jpg"
              />
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

export default {
  data: () => ({
    tab: null,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    num: 1,
  }),
  components: {
    ProductComment,
    ProductQna,
  },
  methods: {
    plus() {
      this.num += 1;
    },
    minus() {
      if (this.num > 1) {
        this.num -= 1;
      }
    },
  },
};
</script>

<style></style>
