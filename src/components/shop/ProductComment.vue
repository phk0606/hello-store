<template>
  <div>
    <v-container fluid>
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
                  ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>상품평
                  작성하기</span
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row align="center">
                    <v-col cols="12">
                      <v-select
                        v-model="purchasedProductSelected"
                        :items="purchasedProducts"
                        label="구매한 상품을 선택하세요."
                        hide-details
                        outlined
                        dense
                        :menu-props="{ offsetY: true }"
                      >
                        <template slot="selection" slot-scope="data">
                          {{ data.item.productName }} (주문일:
                          {{ data.item.createdDate }})
                        </template>
                        <template slot="item" slot-scope="data">
                          {{ data.item.productName }} (주문일:
                          {{ data.item.createdDate }})
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>(1개월 이내 구매 상품)</v-col>
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
                          v-model="content"
                          label="상품평"
                          :counter="10"
                          :error-messages="errors"
                        />
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-card flat>
                        <v-card-text class="pa-0">
                          <v-radio-group
                            dense
                            hide-details
                            v-model="gradeRadios"
                          >
                            <v-row>
                              <v-col> 평점 </v-col>
                            </v-row>
                            <v-row dense align="center">
                              <v-col cols="auto">
                                <v-radio value="5" />
                              </v-col>
                              <v-col cols="2"> 매우 만족 </v-col>
                              <v-col>
                                <v-rating
                                  background-color="indigo lighten-3"
                                  color="indigo"
                                  small
                                  readonly
                                  :value="5"
                                />
                              </v-col>
                            </v-row>
                            <v-row dense align="center"
                              ><v-col cols="auto">
                                <v-radio value="4" />
                              </v-col>
                              <v-col cols="2"> 만족 </v-col>
                              <v-col>
                                <v-rating
                                  background-color="indigo lighten-3"
                                  color="indigo"
                                  small
                                  readonly
                                  :value="4"
                                /> </v-col
                            ></v-row>
                            <v-row dense align="center"
                              ><v-col cols="auto">
                                <v-radio value="3" />
                              </v-col>
                              <v-col cols="2"> 보통 </v-col>
                              <v-col>
                                <v-rating
                                  background-color="indigo lighten-3"
                                  color="indigo"
                                  small
                                  readonly
                                  :value="3"
                                /> </v-col
                            ></v-row>
                            <v-row dense align="center">
                              <v-col cols="auto">
                                <v-radio value="2" />
                              </v-col>
                              <v-col cols="2"> 불만 </v-col>
                              <v-col>
                                <v-rating
                                  background-color="indigo lighten-3"
                                  color="indigo"
                                  small
                                  readonly
                                  :value="2"
                                />
                              </v-col>
                            </v-row>
                            <v-row dense align="center">
                              <v-col cols="auto">
                                <v-radio value="1" />
                              </v-col>
                              <v-col cols="2"> 매우불만 </v-col>
                              <v-col>
                                <v-rating
                                  background-color="indigo lighten-3"
                                  color="indigo"
                                  small
                                  readonly
                                  :value="1"
                                />
                              </v-col>
                            </v-row>
                          </v-radio-group>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-file-input
                      @change="Preview_image"
                      v-model="image"
                      show-size
                    />
                  </v-row>
                  <v-row>
                    <v-img :src="url" max-width="300" />
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="dialog = false">
                  닫기
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    createProductComment();
                    dialog = false;
                  "
                >
                  저장
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="(content, i) in contents" :key="i">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="2">
              <v-img :src="`${imageUrl}${content.fileName}`" max-width="120" />
            </v-col>
            <v-col cols="7">
              <v-row>
                <v-col cols="7" class="d-flex">
                  <div class="pr-2">{{ content.createdDate }}</div>

                  <div>{{ content.username }}</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>
                    {{ content.content }}
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-rating :value="content.grade" color="indigo" small readonly />
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="10">
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
              <v-btn outlined small color="purple" class="mr-2"> 수정 </v-btn>
              <v-btn outlined small color="red"> 삭제 </v-btn>
            </v-col>
          </v-row>
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
                <v-card-subtitle> admin 2017-01-01 16:10 </v-card-subtitle>
                <v-card-text>
                  안녕하세요 고객님 저희 쇼핑몰을 이용해 주셔서 감사합니다.
                  앞으로 더욱 노력하겠습니다.
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
                count: '전체 {count} 개중 {from} 부터 {to}  |{count} 개| 1 개',
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
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import { getOrderProductsByUsername } from '@/api/order';
import { createProductComment, getProductComments } from '@/api/productComment';

export default {
  created() {
    this.productId = this.$route.params.productId;
    this.getOrderProductsByUsername();
    this.getProductComments();
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      productId: null,
      url: null,
      image: null,
      gradeRadios: '5',
      contents: null,
      content: null,
      page: 1,
      panelItems: 1,
      rating: 4,
      dialog: false,
      purchasedProducts: [],
      purchasedProductSelected: null,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    async getProductComments() {
      try {
        const { data } = await getProductComments({
          productId: this.productId,
        });
        this.contents = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async createProductComment() {
      try {
        const formData = new FormData();

        if (this.image != null) {
          formData.append('productCommentImages', this.image);
        }

        const productCommentDto = {
          username: this.$store.state.username,
          orderProductId: this.purchasedProductSelected.orderProductId,
          content: this.content,
          grade: this.gradeRadios,
        };

        formData.append(
          'productCommentDto',
          new Blob([JSON.stringify(productCommentDto)], {
            type: 'application/json',
          }),
        );

        const response = await createProductComment(formData);

        console.log(response);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getOrderProductsByUsername() {
      try {
        const { data } = await getOrderProductsByUsername({
          username: this.$store.state.username,
        });
        console.log(data);
        this.purchasedProducts = data;
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
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
