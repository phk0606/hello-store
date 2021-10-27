<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          상품평
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="start">
      <v-col cols="3">
        <v-select
          v-model="searchCategory1Select"
          :items="searchCategory1"
          label="카테고리 선택"
          outlined
          dense
          hide-details
          @change="changeSearchCategory"
          :menu-props="{ offsetY: true }"
          clearable
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="searchCategory2Select"
          :items="searchCategory2"
          label="카테고리 선택"
          outlined
          dense
          hide-details
          :menu-props="{ offsetY: true }"
          clearable
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="상품명"
          v-model="searchText"
          dense
          hide-details
          outlined
          clearable
        />
      </v-col>
      <v-col cols="auto">
        <v-btn color="indigo" dark @click="getProductComments(1)">검색</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="openDialog" color="purple" dark> 상품평 작성 </v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <!-- <v-btn dark color="purple">상품평 작성</v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
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
                  <v-col>(1개월 이내 구매 상품, 상품당 1회만 작성 가능.)</v-col>
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
                        <v-radio-group dense hide-details v-model="gradeRadios">
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
    <v-divider />
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
                  {{ content.categoryName }} >
                  {{ content.productName }} (productId: {{ content.productId }})
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
          <v-row align="center">
            <v-col cols="10">
              <v-row>
                <v-col>
                  <div>
                    <v-text-field
                      v-model="content.content"
                      hide-details
                      dense
                      required
                      solo-inverted
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="d-flex">
              <v-btn
                @click="modifyProductComment(i)"
                outlined
                small
                color="purple"
                class="mr-2"
              >
                수정
              </v-btn>
              <v-btn
                @click="removeProductComment(i)"
                outlined
                small
                color="red"
              >
                삭제
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-card flat>
          <v-row align="center">
            <v-col cols="2">
              <v-btn text @click.prevent="replyListShowToggle(i)"
                >작성된 댓글({{ content.replyCount }})</v-btn
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
              <v-textarea
                v-model="content.replyRegistContent"
                outlined
                hide-details
                rows="1"
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                @click="createReply(i)"
                dark
                color="deep-purple darken-3"
                class="mr-2"
              >
                등록
              </v-btn>
            </v-col>
          </v-row>
          <div v-show="false" ref="replyList">
            <v-row
              v-for="(productCommentReply, j) in content.productCommentReplies"
              :key="j"
              dense
              align="center"
            >
              <v-col cols="1">
                <v-spacer />
              </v-col>
              <v-col cols="auto">
                <v-icon>mdi-arrow-right-bottom</v-icon>
              </v-col>
              <v-col cols="7">
                <v-card flat>
                  <v-card-subtitle>
                    {{ productCommentReply.username }}
                    {{ productCommentReply.createdDate }}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-row
                      v-if="
                        $store.state.username ===
                          productCommentReply.username ||
                        $store.state.authority.includes('ROLE_ADMIN')
                      "
                      align="center"
                    >
                      <v-textarea
                        v-model="productCommentReply.content"
                        outlined
                        hide-details
                        rows="1"
                      />
                      <v-btn
                        @click="modifyProductCommentReply(i, j)"
                        outlined
                        small
                        color="purple"
                        class="mx-2"
                      >
                        수정
                      </v-btn>
                      <v-btn
                        @click="removeProductCommentReply(i, j)"
                        outlined
                        small
                        color="red"
                      >
                        삭제
                      </v-btn>
                    </v-row>
                    <v-row v-else>
                      {{ productCommentReply.content }}
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-expansion-panel>
      <v-expansion-panel v-if="contents.length === 0">
        <v-card flat>
          <v-card-text> 데이터가 없습니다. </v-card-text>
        </v-card>
      </v-expansion-panel>
    </v-expansion-panels>

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
          :records="records"
          :per-page="perPage"
          @paginate="myCallback"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from 'vue-pagination-2';
import { getOrderProductsByUsername } from '@/api/order';
import {
  createProductComment,
  createProductCommentReply,
  getProductComments,
  getProductCommentReplyList,
  modifyProductComment,
  removeProductComment,
  modifyProductCommentReply,
  removeProductCommentReply,
} from '@/api/productComment';
import { getCategory } from '@/api/category';

export default {
  created() {
    this.productId = this.$route.params.productId;
    this.getOrderProductsByUsername();
    this.getProductComments(1);
    this.changeSearchCategory();
  },
  data() {
    return {
      searchText: '',
      searchCategory1Select: null,
      searchCategory2Select: null,
      searchCategory1: [],
      searchCategory2: [],
      replyRegistContent: [],
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      productId: null,
      url: null,
      image: null,
      gradeRadios: '5',
      contents: [],
      content: null,
      page: 1,
      records: 0,
      perPage: 5,
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
    openDialog() {
      this.dialog = true;
    },
    async changeSearchCategory() {
      try {
        const { data } = await getCategory({
          parentId: this.searchCategory1Select,
        });

        if (this.searchCategory1Select == null) {
          this.searchCategory1 = data;
        } else {
          this.searchCategory2 = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeProductCommentReply(i, j) {
      try {
        await removeProductCommentReply({
          productCommentReplyId:
            this.contents[i].productCommentReplies[j].productCommentReplyId,
        });
        //console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyProductCommentReply(i, j) {
      try {
        const { data } = await modifyProductCommentReply({
          productCommentReplyId:
            this.contents[i].productCommentReplies[j].productCommentReplyId,
          content: this.contents[i].productCommentReplies[j].content,
        });
        console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.error(error);
      }
    },
    async removeProductComment(index) {
      try {
        await removeProductComment({
          productCommentId: this.contents[index].productCommentId,
        });
        //console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyProductComment(index) {
      try {
        const { data } = await modifyProductComment({
          productCommentId: this.contents[index].productCommentId,
          content: this.contents[index].content,
        });
        console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.error(error);
      }
    },
    async getProductCommentReplies(index) {
      try {
        const { data } = await getProductCommentReplyList({
          productCommentId: this.contents[index].productCommentId,
        });
        console.log(data);
        this.contents[index].productCommentReplies = data;
        this.contents[index].replyCount = data.length;
        this.contents[index].replyRegistContent = '';
      } catch (error) {
        console.error(error);
      }
    },
    async createReply(index) {
      try {
        if (!this.$store.getters.isLogin) {
          alert('로그인이 필요합니다.');
          return;
        }
        const replyRegistContent = this.contents[index].replyRegistContent;
        console.log(replyRegistContent);
        if (!replyRegistContent) {
          alert('내용을 입력하세요.');
          return;
        }
        const productCommentId = this.contents[index].productCommentId;
        const replyDto = {
          productCommentId: productCommentId,
          content: replyRegistContent,
          username: this.$store.state.username,
        };
        const response = await createProductCommentReply(replyDto);

        console.log(response);
        this.getProductCommentReplies(index);
        this.$refs.replyList[index].style.display = 'block';
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getProductComments(page) {
      try {
        const { data } = await getProductComments({
          page: page - 1,
          size: this.perPage,

          productId: this.productId,
          username: this.$store.state.username,
          productName: this.searchText,
          firstCategoryId: this.searchCategory1Select,
          secondCategoryId: this.searchCategory2Select,
        });
        this.contents = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
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
          productId: this.purchasedProductSelected.productId,
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
        this.getProductComments(1);
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
    replyListShowToggle(index) {
      if (this.$refs.replyList[index].style.display === 'none') {
        this.$refs.replyList[index].style.display = 'block';
      } else {
        this.$refs.replyList[index].style.display = 'none';
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getProductComments(page);
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
