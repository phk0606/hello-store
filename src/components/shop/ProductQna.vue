<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in panelItems" :key="i">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="auto">
              {{ i }}
            </v-col>
            <v-col cols="6">
              <div>색상이 2가지 뿐인데요. 다른 색은 없는 것인가요?...</div>
            </v-col>

            <v-col cols="2">
              <div>phk0606</div>
            </v-col>
            <v-col cols="auto" class="d-flex">
              <div class="pr-2">2021-08-17 12:30:02</div>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="7">
              <div>Q. 색상이 2가지 뿐인데요. 다른 색은 없는 것인가요?...</div>

              <div>A. 관리자에서 등록한 답변</div>
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
            <v-col cols="6">
              답변 여부 : 답변 준비중 입니다. 신속하게 답변 드리겠습니다.
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
      <v-row>
        <v-col> 상품 문의하기 </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="10">
          <v-textarea
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
          <v-btn large>등록</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';

export default {
  data() {
    return {
      panelItems: 5,
      page: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
  },
};
</script>

<style></style>
