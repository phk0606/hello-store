<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              상품 문의 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="start">
          <v-col cols="4">
            <v-text-field
              v-model="searchText"
              dense
              hide-details
              outlined
              placeholder="예) 배송일"
            >
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getProductQnA(1)">검색</v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <v-expansion-panels>
              <v-expansion-panel v-for="(content, i) in contents" :key="i">
                <v-expansion-panel-header>
                  <v-container>
                    <v-row>
                      <v-col>
                        {{ content.categoryName }} >
                        {{ content.productName }} (productId:
                        {{ content.productId }})
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="auto">
                        {{ content.productQuestionId }}
                      </v-col>
                      <v-col cols="auto">
                        <div>Q. {{ content.questionContent }}</div>
                      </v-col>
                      <v-spacer />
                      <v-col cols="auto">
                        <div>{{ content.questionUsername }}</div>
                      </v-col>
                      <v-col cols="auto" class="mr-5">
                        <div>{{ content.questionCreatedDate }}</div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-container>
                    <v-row>
                      <v-col cols="8">
                        <v-row align="center"
                          >Q.
                          <v-textarea
                            v-model="content.questionContent"
                            rows="3"
                            outlined
                            :counter="100"
                          />
                          <v-btn
                            @click="modifyQuestion(i)"
                            outlined
                            small
                            color="purple"
                            class="mx-2"
                          >
                            수정
                          </v-btn>
                          <v-btn
                            @click="removeQuestion(i)"
                            outlined
                            small
                            color="red"
                          >
                            삭제
                          </v-btn>
                        </v-row>

                        <v-row align="center" v-if="content.answerContent">
                          A.
                          <v-textarea
                            v-model="content.answerContent"
                            rows="3"
                            outlined
                            :counter="100"
                          />
                          <v-btn
                            @click="modifyAnswer(i)"
                            outlined
                            small
                            color="purple"
                            class="mx-2"
                          >
                            수정
                          </v-btn>
                          <v-btn
                            @click="removeAnswer(i)"
                            outlined
                            small
                            color="red"
                          >
                            삭제
                          </v-btn>
                        </v-row>
                        <v-row v-else>
                          <v-col> A. 등록된 답변이 없습니다. </v-col>
                          <v-col cols="">
                            <v-dialog
                              v-model="dialog"
                              persistent
                              max-width="600px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="purple"
                                  small
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  답변하기
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5"
                                    ><v-icon large color="indigo">
                                      mdi-lead-pencil </v-icon
                                    >상품 문의 답변/수정 하기</span
                                  >
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col>
                                        <v-textarea
                                          v-model="content.answer"
                                          rows="3"
                                          outlined
                                          label="답변"
                                          :counter="100"
                                        />
                                      </v-col>
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
                                    닫기
                                  </v-btn>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="
                                      createProductAnswer(
                                        content.productQuestionId,
                                        content.answer,
                                      );
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
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>

                <v-container fluid>
                  <v-row align="center">
                    <v-col cols="auto" class="ml-6">
                      {{ content.productAnswerId }}</v-col
                    >
                    <v-col cols="auto" v-if="content.answerContent">
                      A. {{ content.answerContent }}
                    </v-col>
                    <v-col v-else>A. 등록된 답변이 없습니다. </v-col>
                    <v-spacer />
                    <v-col cols="auto">
                      <div>{{ content.answerUsername }}</div>
                    </v-col>
                    <v-col cols="auto" class="mr-11">
                      <div>{{ content.answerCreatedDate }}</div>
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
                      <v-btn
                        @click="createProductQuestion"
                        dark
                        color="deep-purple darken-3"
                        class="mr-2"
                      >
                        등록
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
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
                    :records="records"
                    :per-page="perPage"
                    @paginate="myCallback"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from 'vue-pagination-2';
import {
  createProductQuestion,
  getProductQnA,
  createProductAnswer,
  removeQuestion,
  modifyQuestion,
  removeAnswer,
  modifyAnswer,
} from '@/api/productQnA';
import { getCategory } from '@/api/category';
import { getProductsByCategoryId } from '@/api/product';

export default {
  created() {
    this.getProductQnA(1);
    this.getCategory();
  },
  components: {
    Pagination,
  },

  data() {
    return {
      productSelected: null,
      products: [],
      category1Select: null,
      category2Select: null,
      category1: [],
      category2: [],
      categoryName: '',
      productName: '',
      noAnswer: null,
      dialog: false,
      contents: null,
      productId: '',
      productQuestion: '',
      page: 1,
      records: 10,
      perPage: 5,
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '주문 번호', value: 'orderId' },
        { text: '주문 상품', value: 'productName' },
        { text: '주문자 아이디', value: 'ordererId' },
        { text: '주문자 이름', value: 'ordererName' },
      ],
      selected: [],
    };
  },
  methods: {
    async getProductsByCategoryId() {
      try {
        const { data } = await getProductsByCategoryId({
          categoryId: this.category2Select,
        });
        this.products = data;
      } catch (error) {
        console.error(error);
      }
    },
    async getCategory(secondCategoryId) {
      try {
        const { data } = await getCategory({
          parentId: this.category1Select,
        });
        if (this.category1Select == null) {
          this.category1 = data;
        } else {
          this.category2 = data;
          this.category2Select =
            secondCategoryId !== null ? secondCategoryId : null;
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    changeCategory() {
      this.getCategory();
    },
    async removeQuestion(index) {
      try {
        await removeQuestion({
          productQuestionId: this.contents[index].productQuestionId,
        });
        //console.log(data);
        this.getProductQnA(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyQuestion(index) {
      try {
        const { data } = await modifyQuestion({
          productQuestionId: this.contents[index].productQuestionId,
          questionContent: this.contents[index].questionContent,
        });
        console.log(data);
        this.getProductQnA(1);
      } catch (error) {
        console.error(error);
      }
    },
    async removeAnswer(index) {
      try {
        await removeAnswer({
          productQuestionId: this.contents[index].productQuestionId,
        });
        //console.log(data);
        this.getProductQnA(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyAnswer(index) {
      try {
        const { data } = await modifyAnswer({
          productQuestionId: this.contents[index].productQuestionId,
          answerContent: this.contents[index].answerContent,
        });
        console.log(data);
        this.getProductQnA(1);
      } catch (error) {
        console.error(error);
      }
    },
    async getProductQnA(page) {
      try {
        const { data } = await getProductQnA({
          page: page - 1,
          size: this.perPage,

          productId: this.productId,
          noAnswer: this.noAnswer,
          searchText: this.searchText,
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
    async createProductQuestion() {
      try {
        const productQnADto = {
          questionUsername: this.$store.state.username,
          questionContent: this.productQuestion,
          productId: this.productSelected,
        };

        const response = await createProductQuestion(productQnADto);
        console.log(response);
        this.getProductQnA(1);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async createProductAnswer(productQuestionId, answerContent) {
      try {
        const productQnADto = {
          productQuestionId: productQuestionId,
          answerContent: answerContent,
        };

        const response = await createProductAnswer(productQnADto);

        console.log(response);
        this.getProductQnA(1);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getProductQnA(page);
    },
  },
};
</script>

<style>
.v-input__prepend-outer {
  margin: 0 !important;
  align-self: center;
}
.v-input {
  margin-top: 0 !important;
}
label {
  margin-bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
