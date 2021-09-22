<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(content, i) in contents" :key="i">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="auto">
              {{ content.productQuestionId }}
            </v-col>
            <v-col cols="6">
              <div>{{ content.questionContent }}</div>
            </v-col>

            <v-col cols="2">
              <div>{{ content.questionUsername }}</div>
            </v-col>
            <v-col cols="auto" class="d-flex">
              <div class="pr-2">{{ content.questionCreatedDate }}</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="7">
              <div>Q. {{ content.questionContent }}</div>

              <div>A. {{ content.answerContent }}</div>
            </v-col>
            <v-col cols="1" class="d-flex">
              <v-btn outlined small color="purple" class="mr-2"> 수정 </v-btn>
              <v-btn outlined small color="red"> 삭제 </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-card flat>
          <v-row align="center">
            <v-col cols="1" />
            <v-col cols="6" v-if="content.answerContent">
              {{ content.answerContent }}
            </v-col>
            <v-col cols="6" v-else>
              답변 준비중입니다. 신속하게 답변 드리겠습니다.
            </v-col>
            <v-col cols="2">
              <div>{{ content.answerUsername }}</div>
            </v-col>
            <v-col cols="auto" class="d-flex">
              <div class="pr-2">{{ content.answerCreatedDate }}</div>
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
            :records="records"
            :per-page="perPage"
            @paginate="myCallback"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col> 상품 문의하기 </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="10">
          <v-textarea
            v-model="productQuestion"
            outlined
            rows="3"
            hide-details
            clearable
            placeholder="- 띄어쓰기를 포함하여 최대 1000자까지 작성할 수 있습니다.
※ 욕설, 영업에 방해되는 글은 관리자에 의해 삭제됩니다.
"
          />
        </v-col>
        <v-col>
          <v-btn @click="createProductQuestion" large>등록</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import { createProductQuestion, getProductQnA } from '@/api/productQnA';

export default {
  created() {
    this.productId = this.$route.params.productId;
    this.getProductQnA(1);
  },
  data() {
    return {
      contents: null,
      productId: '',
      productQuestion: '',
      page: 1,
      records: 10,
      perPage: 5,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    async getProductQnA(page) {
      try {
        const { data } = await getProductQnA({
          page: page - 1,
          size: this.perPage,

          productId: this.productId,
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
          productId: this.productId,
        };

        const response = await createProductQuestion(productQnADto);

        console.log(response);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
  },
};
</script>

<style></style>
