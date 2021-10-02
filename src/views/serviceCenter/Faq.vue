<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              자주 하는 질문
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
          <v-col cols="12">
            <template>
              <v-tabs
                v-model="activeTab"
                background-color="blue-grey"
                slider-color="red"
                dark
              >
                <v-tab v-for="tab of tabs" :key="tab.value">
                  {{ tab.text }}
                </v-tab>
              </v-tabs>
            </template>
          </v-col>
        </v-row>
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
                  More info about {{ item.name }}
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCommunities } from '@/api/community';
import Pagination from 'vue-pagination-2';

export default {
  created() {
    this.getCommunities(1);
  },
  components: {
    Pagination,
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        { value: 'ORDER', text: '주문' },
        { value: 'SHIPPING', text: '배송' },
        { value: 'PRODUCT', text: '상품' },
        { value: 'EXCHANGE', text: '교환/반품' },
        { value: 'CANCEL', text: '취소' },
      ],
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
          value: 'communityId',
        },
        { text: '분류', align: 'center', value: 'category' },
        { text: '제목', align: 'center', sortable: false, value: 'title' },
        { text: '', value: 'data-table-expand' },
      ],
      contents: [],
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
