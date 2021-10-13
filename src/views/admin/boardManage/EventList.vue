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
              이벤트 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="start">
          <v-col cols="auto">
            <v-text-field v-model="searchText" dense hide-details outlined>
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getEvents(1)">검색</v-btn>
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
              item-key="eventId"
              class="elevation-1"
              disable-sort
              show-select
            >
              <template v-slot:[`item.image`]="{ item }">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-img
                        :src="`${imageUrl}${item.imageFile.fileName}`"
                        max-width="200"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </template>
              <template v-slot:[`item.title`]="{ item }">
                <v-row no-gutters>
                  <v-col cols="auto">
                    <h5>{{ item.title }}</h5>
                  </v-col>
                </v-row>
                <v-row class="text-start" no-gutters>
                  <v-col>
                    {{ item.description }}
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="auto">
                    {{ item.eventDateA }}
                  </v-col>
                  <v-col cols="auto"> ~ </v-col>
                  <v-col cols="auto">
                    {{ item.eventDateB }}
                  </v-col>
                </v-row>
              </template>
              <template v-slot:[`item.detail`]="{ item }">
                <v-row justify="center"
                  ><v-btn :to="`/admin/event-detail/${item.eventId}`"
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
            <v-btn @click="removeEvents" outlined small color="red"
              >선택 삭제</v-btn
            >
          </v-col>
          <v-col cols="auto">
            <v-btn to="/admin/event-regist" outlined small color="indigo"
              >이벤트 등록</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getEvents, removeEvents } from '@/api/event';
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import Pagination from 'vue-pagination-2';

export default {
  created() {
    this.getEvents(1);
  },
  components: {
    Pagination,
    AdminBoardLeft,
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      searchText: '',
      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'eventId',
        },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '내용', align: 'center', value: 'title' },
        { text: '상세보기', align: 'center', value: 'detail' },
      ],
      contents: [],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '이벤트 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    async removeEvents() {
      const events = this.selected;
      const eventIds = [];

      for (const key in events) {
        const eventId = events[key].eventId;
        console.log(eventId);
        eventIds.push(eventId);
      }
      try {
        await removeEvents({
          eventIds,
        });
        //console.log(data);
        this.getEvents(1);
      } catch (error) {
        console.log(error);
      }
    },
    async getEvents(page) {
      console.log(this.searchSelected);
      try {
        const { data } = await getEvents({
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
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getNotices(page);
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
