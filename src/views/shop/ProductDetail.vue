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

            <div>상품 요약: 깃털처럼 가벼운 것에 비해 최고 효과</div>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="auto">
                <v-select
                  :items="items"
                  label="옵션을 선택해 주세요."
                  hide-details
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                  class="pb-4"
                />

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
                <v-text-field outlined dense hide-details value="1" />
              </v-col>
              <v-col>
                <v-btn small class="mr-2" icon color="indigo"
                  ><v-icon>mdi-plus</v-icon></v-btn
                ><v-btn small icon color="indigo"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>총 금액:</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="pt-5">
          <v-btn dark block large color="black"> 구매하기 </v-btn>
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
            <v-container>
              <v-row justify="end">
                <v-col cols="auto">
                  <!-- <v-btn dark color="purple">상품평 작성</v-btn> -->
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="purple" dark v-bind="attrs" v-on="on">
                        상품평 작성
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5"
                          ><v-icon large color="indigo">
                            mdi-lead-pencil </v-icon
                          >상품평 작성하기</span
                        >
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-select
                                :items="items"
                                label="구매한 상품을 선택하세요."
                                hide-details
                                outlined
                                dense
                                :menu-props="{ offsetY: true }"
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <validation-provider
                                name="ProductComment"
                                v-slot="{ errors }"
                                rules="required|max:10"
                              >
                                <v-textarea
                                  rows="3"
                                  outlined
                                  v-model="productComment"
                                  label="상품평"
                                  :counter="10"
                                  :error-messages="errors"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-card>
                              <v-card-title>평점</v-card-title>
                              <v-card-text>
                                <v-radio-group
                                  dense
                                  hide-details
                                  v-model="radios"
                                  row
                                >
                                  <v-radio value="1">
                                    <template v-slot:label>
                                      매우 만족
                                      <v-rating
                                        background-color="indigo lighten-3"
                                        color="indigo"
                                        small
                                        readonly
                                        :value="5"
                                      />
                                    </template>
                                  </v-radio>
                                  <v-radio value="2">
                                    <template v-slot:label>
                                      만족
                                      <v-rating
                                        background-color="indigo lighten-3"
                                        color="indigo"
                                        small
                                        readonly
                                        :value="4"
                                      />
                                    </template>
                                  </v-radio>
                                  <v-radio value="3">
                                    <template v-slot:label>
                                      보통
                                      <v-rating
                                        background-color="indigo lighten-3"
                                        color="indigo"
                                        small
                                        readonly
                                        :value="3"
                                      />
                                    </template>
                                  </v-radio>
                                  <v-radio value="4">
                                    <template v-slot:label>
                                      불만
                                      <v-rating
                                        background-color="indigo lighten-3"
                                        color="indigo"
                                        small
                                        readonly
                                        :value="2"
                                      />
                                    </template>
                                  </v-radio>
                                  <v-radio value="5">
                                    <template v-slot:label>
                                      매우불만
                                      <v-rating
                                        background-color="indigo lighten-3"
                                        color="indigo"
                                        small
                                        readonly
                                        :value="1"
                                      />
                                    </template>
                                  </v-radio>
                                </v-radio-group>
                              </v-card-text>
                            </v-card>
                          </v-row>
                          <v-row>
                            <v-file-input
                              @change="Preview_image"
                              v-model="image"
                              show-size
                            />
                          </v-row>
                          <v-row>
                            <v-img :src="url" />
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
            <v-expansion-panels>
              <v-expansion-panel v-for="(item, i) in panelItems" :key="i">
                <v-expansion-panel-header>
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        src="//app-storage-edge-006.cafe24.com/bannermanage2/rooseoin0/2021/05/06/f0f36a4d1d86e805e2efd73894865765.jpg"
                        max-width="120"
                      />
                    </v-col>
                    <v-col cols="7">
                      <v-row>
                        <v-col cols="7" class="d-flex">
                          <div class="pr-2">2021-08-17 12:30:02</div>

                          <div>phk0606</div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div>
                            사진과 다르게 색감이 좋으며, 입었을 때 스판 원단으로
                            불편함이 없어요! 친절한 상담, 빠른 배송 감사합니다
                          </div>
                        </v-col>
                      </v-row>
                      <v-divider />
                      <!-- <v-row align="center">
                        <v-col cols="3">
                          <v-btn text>작성된 댓글(1)</v-btn>
                        </v-col>
                        <v-col>
                          <v-btn outlined small color="indigo" class="mr-2">
                            작성
                          </v-btn>
                          <v-btn outlined small color="orange"> 취소 </v-btn>
                        </v-col>
                      </v-row> -->
                    </v-col>
                    <v-col cols="2" align-self="center">
                      <v-rating v-model="rating" color="indigo" small />
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        src="//app-storage-edge-006.cafe24.com/bannermanage2/rooseoin0/2021/05/06/f0f36a4d1d86e805e2efd73894865765.jpg"
                        max-width="150"
                      />
                    </v-col>
                    <v-col cols="8">
                      <v-row>
                        <v-col>
                          <div>
                            사진과 다르게 색감이 좋으며, 입었을 때 스판 원단으로
                            불편함이 없어요! 친절한 상담, 빠른 배송 감사합니다
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1" class="d-flex">
                      <v-btn outlined small color="purple" class="mr-2">
                        수정
                      </v-btn>
                      <v-btn outlined small color="red"> 삭제 </v-btn>
                    </v-col>
                  </v-row>
                  <!-- <v-row>
                    <v-col cols="2">
                      <v-btn text>작성된 댓글(1)</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn outlined small color="indigo" class="mr-2">
                        작성
                      </v-btn>
                      <v-btn outlined small color="orange"> 취소 </v-btn>
                    </v-col>
                  </v-row> -->
                </v-expansion-panel-content>
                <v-card flat>
                  <v-row align="center">
                    <v-col cols="2">
                      <v-btn text @click.prevent="replistShowToggle(i)"
                        >작성된 댓글(1)</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        outlined
                        small
                        color="indigo"
                        class="mr-2"
                        @click.prevent="replyRegistShow(i)"
                      >
                        작성
                      </v-btn>
                      <v-btn
                        outlined
                        small
                        color="orange"
                        @click.prevent="replyRegistHidden(i)"
                      >
                        취소
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    ref="replyRegistRow"
                    v-show="false"
                    class="pb-1"
                  >
                    <v-col cols="1">
                      <v-spacer />
                    </v-col>
                    <v-col cols="7">
                      <v-textarea outlined hide-details rows="1" />
                    </v-col>
                    <v-col cols="4">
                      <v-btn dark color="deep-purple darken-3" class="mr-2">
                        등록
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row ref="replyListRow" v-show="false" class="mt-0">
                    <v-col cols="1">
                      <v-spacer />
                    </v-col>
                    <v-col cols="10">
                      <v-card flat>
                        <v-card-subtitle>
                          admin 2017-01-01 16:10
                        </v-card-subtitle>
                        <v-card-text>
                          안녕하세요 고객님 저희 쇼핑몰을 이용해 주셔서
                          감사합니다. 앞으로 더욱 노력하겠습니다.
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-container>
              <v-row justify="center" class="pt-2" style="text-align: center">
                <v-col cols="auto">
                  <pagination
                    :options="{
                      theme: 'bootstrap4',
                      edgeNavigation: true,
                      texts: {
                        first: '처음',
                        last: '마지막',
                        count:
                          '전체 {count} 개중 {from} 부터 {to}  |{count} 개| 1 개',
                      },
                    }"
                    v-model="page"
                    :records="40"
                    :per-page="20"
                    @paginate="myCallback"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card flat>
              <v-card-text
                >3333333333ffffffffffffffffffffffffffffffffff3</v-card-text
              >
            </v-card>
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
import Pagination from 'vue-pagination-2';

export default {
  data: () => ({
    url: null,
    image: null,
    radios: 'Duckduckgo',
    productComment: null,
    page: 1,
    panelItems: 5,
    rating: 4,
    tab: null,
    dialog: false,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  }),
  components: {
    Pagination,
  },
  methods: {
    replyRegistShow(index) {
      console.log(index);
      this.$refs.replyRegistRow[index].style.display = 'flex';
    },
    replyRegistHidden(index) {
      console.log(index);
      this.$refs.replyRegistRow[index].style.display = 'none';
    },
    replistShowToggle(index) {
      if (this.$refs.replyListRow[index].style.display === 'none') {
        this.$refs.replyListRow[index].style.display = 'flex';
      } else {
        this.$refs.replyListRow[index].style.display = 'none';
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
      }
    },
  },
};
</script>

<style></style>
