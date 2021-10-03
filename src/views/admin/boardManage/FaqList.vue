<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-board-left />
      </v-col>
      <v-col cols="10">
        <v-row dense align="center">
          <v-col cols="auto">
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-col>
          <v-col cols="">
            <v-breadcrumbs :items="items" class="pa-0">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              자주 하는 질문 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center">
          <v-col cols="2">
            <v-select
              label="제목 + 내용"
              v-model="searchSelected"
              :items="searchKeyword"
              clearable
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="auto">
            <v-text-field v-model="searchText" dense hide-details outlined>
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getCommunities(1)">검색</v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="contents"
              item-key="communityId"
              single-expand
              show-expand
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.title`]="{ item }">
                <v-row justify="start">
                  {{ item.title }}
                </v-row>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-container>
                    <v-row align="center">
                      <v-col cols="10">
                        <v-row>
                          <v-col> Q. {{ item.question }} </v-col>
                        </v-row>
                        <v-row>
                          <v-col> A. {{ item.answer }} </v-col>
                        </v-row>
                      </v-col>
                      <v-col>
                        <v-btn @click="openDialog(item.faqId)">수정</v-btn
                        ><v-btn @click="removeFaq(item.faqId)">삭제</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </td>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row justify="center" style="text-align: center">
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
        <v-row align="center">
          <v-col cols="auto">
            <v-btn @click="openDialog(null)" color="indigo" dark>등록</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>자주
                하는 질문/답변 등록(수정)</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col>
                    <v-select
                      label="카테고리 선택"
                      v-model="faqTypeSelected"
                      :items="faqTypes"
                      item-text="faqTypeValue"
                      item-value="faqType"
                      clearable
                      outlined
                      hide-details
                      dense
                      :menu-props="{ offsetY: true }"
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="question"
                      label="질문을 입력하세요."
                      hide-details
                      dense
                      required
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <v-textarea
                      v-model="answer"
                      label="답변을 입력하세요."
                      outlined
                      hide-details
                      rows="3"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="createOrModifyFaq" color="blue darken-1" text>
                저장
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                닫기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getCategories,
  createFaq,
  getFaqs,
  getFaq,
  modifyFaq,
  removeFaq,
} from '@/api/faq';
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import Pagination from 'vue-pagination-2';

export default {
  created() {
    this.getFaqs(1);
  },
  components: {
    Pagination,
    AdminBoardLeft,
  },
  data() {
    return {
      faqId: null,
      question: '',
      answer: '',
      dialog: false,
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '제목', value: 'title' },
        { text: '내용', value: 'content' },
      ],
      faqTypeSelected: [],
      faqTypes: [],
      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'faqId',
          width: '10%',
        },
        { text: '분류', align: 'center', value: 'faqTypeValue', width: '20%' },
        { text: '제목', align: 'center', sortable: false, value: 'question' },
        { text: '', value: 'data-table-expand' },
      ],
      contents: [],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '자주 하는 질문 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    createOrModifyFaq() {
      if (this.faqId) {
        this.modifyFaq(this.faqId);
      } else {
        this.createFaq();
      }
      this.closeDialog();
    },
    openDialog(faqId) {
      console.log(faqId);
      this.getCategories();
      this.dialog = true;

      if (faqId) {
        this.getFaq(faqId);
      }
    },
    closeDialog() {
      this.dialog = false;
      this.faqId = null;
      this.question = '';
      this.answer = '';
      this.faqTypeSelected = [];
    },
    async getCategories() {
      try {
        const { data } = await getCategories({});
        this.faqTypes = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async createFaq() {
      try {
        const faqDto = {
          question: this.question,
          answer: this.answer,
          faqType: this.faqTypeSelected,
        };

        const response = await createFaq(faqDto);
        console.log(response);
        this.getFaqs(1);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeFaq(faqId) {
      try {
        await removeFaq({
          faqId: faqId,
        });
        //console.log(data);
        this.getFaqs(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyFaq(faqId) {
      try {
        const { data } = await modifyFaq({
          faqId: faqId,
          question: this.question,
          answer: this.answer,
          faqType: this.faqTypeSelected,
        });
        console.log(data);
        this.getFaqs(1);
      } catch (error) {
        console.error(error);
      }
    },
    async getFaqs(page) {
      try {
        const { data } = await getFaqs({
          page: page - 1,
          size: this.perPage,
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
    async getFaq(faqId) {
      try {
        const { data } = await getFaq({
          faqId: faqId,
        });
        this.faqId = data.faqId;
        this.faqTypeSelected = data.faqType;
        this.question = data.question;
        this.answer = data.answer;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getFaqs(page);
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
