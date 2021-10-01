<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              포인트 이용 내역
            </v-chip>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col class="text-h6"> 보유 포인트: {{ userHavePoint }} </v-col>
        </v-row>

        <v-row dense align="center" justify="start">
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
            <v-btn color="indigo" dark @click="getNotices(1)">검색</v-btn>
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
              item-key="orderId"
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.noticeId`]="{ item }">
                <v-row v-if="item.important" justify="center"
                  ><v-chip color="pink" label text-color="white"
                    >중요</v-chip
                  ></v-row
                >
                <v-row v-else justify="center">{{ item.noticeId }}</v-row>
              </template>
              <template v-slot:[`item.title`]="{ item }">
                <v-row justify="start">
                  {{ item.title }}
                </v-row>
              </template>
              <template v-slot:[`item.noticeDetail`]="{ item }">
                <v-row justify="center"
                  ><v-btn :to="`/service-center/notice-detail/${item.noticeId}`"
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
import { getPointHistory, getUserHavePoint } from '@/api/pointHistory';
import Pagination from 'vue-pagination-2';

export default {
  async created() {
    await this.getPointHistory(1);
    await this.getUserHavePoint();
  },
  components: {
    Pagination,
  },
  data() {
    return {
      userHavePoint: null,
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '제목', value: 'title' },
        { text: '내용', value: 'content' },
      ],
      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'pointHistoryId',
        },
        {
          text: '날짜',
          align: 'center',
          sortable: false,
          value: 'createdDate',
        },
        { text: '적립/사용', align: 'center', value: 'pointUseTypeValue' },
        { text: '내용', align: 'center', value: 'pointUseDetailTypeValue' },
        { text: '포인트', align: 'center', value: 'point' },
      ],
      contents: [],
    };
  },
  methods: {
    async getPointHistory(page) {
      try {
        const { data } = await getPointHistory({
          page: page - 1,
          size: this.perPage,
          [this.searchSelected]: this.searchText,
          username: this.$store.state.username,
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
    async getUserHavePoint() {
      try {
        const { data } = await getUserHavePoint({
          username: this.$store.state.username,
        });
        this.userHavePoint = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getPointHistory(page);
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
