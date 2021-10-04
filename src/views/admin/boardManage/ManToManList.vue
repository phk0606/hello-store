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
              1:1 문의 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center">
          <v-col cols="3">
            <v-checkbox
              v-model="noAnswer"
              dense
              hide-details
              label="답변 없는 문의만 보기"
              class="mr-2"
            />
          </v-col>
          <v-col cols="auto">
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
              :headers="headers"
              :items="contents"
              item-key="communityId"
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.manToManDetail`]="{ item }">
                <v-row justify="center"
                  ><v-btn :to="`/admin/notice-detail/${item.noticeId}`"
                    >상세 보기</v-btn
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getFaqs, getFaq } from '@/api/faq';
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
      noAnswer: null,
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
      page: 1,
      records: 0,
      perPage: 5,
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'faqId',
        },
        { text: '유형', align: 'center', value: 'faqTypeValue' },
        { text: '제목', align: 'center', sortable: false, value: 'question' },
        { text: '작성자', align: 'center', sortable: false, value: 'question' },
        {
          text: '답변여부',
          align: 'center',
          sortable: false,
          value: 'answerYn',
        },
        { text: '작성일', align: 'center', sortable: false, value: 'question' },
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
    getFaqsBest(text) {
      this.searchText = text;
      this.getFaqs(1);
    },

    async getFaqs(page) {
      try {
        const { data } = await getFaqs({
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
