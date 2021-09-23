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
              커뮤니티 리스트
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
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.title`]="{ item }">
                <v-row justify="start">
                  {{ item.title }}
                </v-row>
              </template>
              <template v-slot:[`item.communityDetail`]="{ item }">
                <v-row justify="center"
                  ><v-btn :to="`/admin/community-detail/${item.communityId}`"
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
        <v-row align="center">
          <v-col cols="auto">
            <v-btn to="/admin/community-regist" color="indigo" dark
              >글쓰기</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCommunities } from '@/api/community';
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import Pagination from 'vue-pagination-2';

export default {
  created() {
    this.getCommunities(1);
  },
  components: {
    Pagination,
    AdminBoardLeft,
  },
  data() {
    return {
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '제목', value: 'title' },
        { text: '내용', value: 'content' },
      ],
      page: 1,
      records: 10,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'communityId',
        },
        { text: '제목', align: 'center', sortable: false, value: 'title' },
        { text: '작성일', align: 'center', value: 'createdDate' },
        { text: '작성자', align: 'center', value: 'createdBy' },
        { text: '상세보기', align: 'center', value: 'communityDetail' },
      ],
      contents: [],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '커뮤니티 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    async getCommunities(page) {
      try {
        const { data } = await getCommunities({
          page: page - 1,
          size: this.perPage,
          [this.searchSelected]: this.searchText,
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
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getCommunities(page);
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
