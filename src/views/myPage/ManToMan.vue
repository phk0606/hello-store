<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          1:1 문의
        </v-chip>
      </v-col>
    </v-row>

    <v-row dense align="center" justify="center">
      <v-col cols="auto">
        <v-text-field
          v-model="searchText"
          dense
          hide-details
          outlined
          label="제목 또는 내용"
          clearable
        >
          <template v-slot:prepend> <v-card width="10" flat /></template>
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="indigo" dark @click="getManToManQuestions(1)">검색</v-btn>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="contents"
          item-key="manToManQuestionId"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.manToManDetail`]="{ item }">
            <v-row justify="center"
              ><v-btn @click="openDialog(item.manToManQuestionId)"
                >상세 보기</v-btn
              ></v-row
            >
          </template>
          <template v-slot:[`item.answerYn`]="{ item }">
            <v-row justify="center"
              ><v-col
                ><span v-if="item.manToManAnswerId">답변완료</span
                ><span v-else>미답변</span></v-col
              ></v-row
            >
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
    <v-row align="center" justify="end">
      <v-col cols="auto">
        <v-btn @click="openDialog(null)" color="indigo" dark
          >1:1 문의하기</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5"
            ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>1:1
            문의</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="9">
                <v-row justify="end">
                  <v-col cols="auto">{{ createdBy }}</v-col
                  ><v-col cols="auto">{{ createdDate }}</v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="9">
                <v-select
                  label="질문 유형 선택"
                  v-model="manToManQuestionSelected"
                  :items="manToManQuestionTypes"
                  item-text="manToManQuestionTypeValue"
                  item-value="manToManQuestionType"
                  clearable
                  outlined
                  hide-details
                  dense
                  :menu-props="{ offsetY: true }"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="9">
                <v-text-field
                  v-model="manToManQuestionTitle"
                  label="질문을 입력하세요."
                  hide-details
                  dense
                  required
                  outlined
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="9">
                <v-textarea
                  v-model="manToManQuestionContent"
                  label="내용을 입력하세요."
                  outlined
                  hide-details
                  rows="5"
                />
              </v-col>
              <v-col cols="1" class="d-flex">
                <v-btn
                  @click="createOrModifyManToManQuestion"
                  outlined
                  small
                  color="purple"
                  class="mr-2"
                >
                  질문 저장
                </v-btn>
                <v-btn
                  @click="removeManToManQuestion"
                  outlined
                  small
                  color="red"
                >
                  삭제
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="manToManAnswerContent" dense>
              <v-col cols="9">
                <v-textarea
                  label="답변"
                  v-model="manToManAnswerContent"
                  outlined
                  hide-details
                  rows="5"
                  readonly
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  createManToManQuestion,
  getManToManQnA,
  getManToManQuestions,
  getManToManQuestionTypes,
  modifyManToManQuestion,
  removeManToManQuestion,
} from '@/api/manToManQnA';
import Pagination from 'vue-pagination-2';

export default {
  created() {
    this.getManToManQuestions(1);
  },
  components: {
    Pagination,
  },
  data() {
    return {
      manToManQuestionTypes: [],
      manToManQuestionSelected: null,
      manToManQuestionId: null,
      manToManQuestionTitle: '',
      manToManQuestionContent: '',
      manToManAnswerContent: '',
      createdBy: '',
      createdDate: '',
      dialog: false,
      searchText: '',
      page: 1,
      records: 0,
      perPage: 5,
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'manToManQuestionId',
        },
        { text: '유형', align: 'center', value: 'manToManQuestionTypeValue' },
        {
          text: '제목',
          align: 'center',
          sortable: false,
          value: 'manToManQuestionTitle',
        },
        {
          text: '작성자',
          align: 'center',
          sortable: false,
          value: 'createdBy',
        },
        {
          text: '답변여부',
          align: 'center',
          sortable: false,
          value: 'answerYn',
        },
        {
          text: '작성일',
          align: 'center',
          sortable: false,
          value: 'createdDate',
        },
        { text: '상세보기', align: 'center', value: 'manToManDetail' },
      ],
      contents: [],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '1:1 문의 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    openDialog(manToManQuestionId) {
      console.log(manToManQuestionId);
      this.getManToManQuestionTypes();
      this.dialog = true;

      if (manToManQuestionId) {
        this.getManToManQnA(manToManQuestionId);
      }
    },
    closeDialog() {
      this.dialog = false;
      this.manToManQuestionId = null;
      this.manToManQuestionTitle = '';
      this.manToManQuestionContent = '';
      this.manToManAnswerContent = '';
      this.manToManQuestionTypeSelected = [];
    },
    createOrModifyManToManQuestion() {
      if (this.manToManQuestionId) {
        this.modifyManToManQuestion();
      } else {
        this.createManToManQuestion();
      }
    },
    async removeManToManQuestion() {
      try {
        await removeManToManQuestion({
          manToManQuestionId: this.manToManQuestionId,
        });
        //console.log(data);
        this.closeDialog();
        this.getManToManQuestions(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyManToManQuestion() {
      try {
        const { data } = await modifyManToManQuestion({
          manToManQuestionId: this.manToManQuestionId,
          manToManQuestionTitle: this.manToManQuestionTitle,
          manToManQuestionContent: this.manToManQuestionContent,
          manToManQuestionType: this.manToManQuestionSelected,
        });
        console.log(data);

        this.closeDialog();

        this.getManToManQuestions(1);
      } catch (error) {
        console.error(error);
      }
    },
    async getManToManQuestionTypes() {
      try {
        const { data } = await getManToManQuestionTypes({});
        this.manToManQuestionTypes = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async createManToManQuestion() {
      try {
        const manToManQuestionDto = {
          manToManQuestionTitle: this.manToManQuestionTitle,
          manToManQuestionContent: this.manToManQuestionContent,
          manToManQuestionType: this.manToManQuestionSelected,
        };

        const response = await createManToManQuestion(manToManQuestionDto);
        console.log(response);
        this.closeDialog();
        this.getManToManQuestions(1);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },

    async getManToManQuestions(page) {
      try {
        const { data } = await getManToManQuestions({
          page: page - 1,
          size: this.perPage,

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
    async getManToManQnA(manToManQuestionId) {
      try {
        const { data } = await getManToManQnA({
          manToManQuestionId: manToManQuestionId,
        });
        this.manToManQuestionId = data.manToManQuestionId;
        this.manToManQuestionTitle = data.manToManQuestionTitle;
        this.manToManQuestionContent = data.manToManQuestionContent;
        this.manToManAnswerContent = data.manToManAnswerContent;
        this.manToManQuestionSelected = data.manToManQuestionType;
        this.createdBy = data.createdBy;
        this.createdDate = data.createdDate;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getManToManQuestions(page);
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
