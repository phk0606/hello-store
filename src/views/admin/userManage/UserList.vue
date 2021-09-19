<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-user-left />
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
              회원 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="center">
          <v-col cols="2">
            <v-select
              label="항목 선택"
              v-model="searchSelected"
              :items="searchItems"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="searchText" dense hide-details outlined>
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark>검색</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn small text @click="detailSearchShow">상세 검색</v-btn>
          </v-col>
        </v-row>
        <transition name="fade">
          <v-row>
            <v-card v-show="detailSearchShowYn">
              <v-container>
                <v-row dense align="center" justify="center">
                  <v-col cols="auto">가입일</v-col>
                  <v-col cols="2">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="userJoinDateA"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="userJoinDateA"
                        @input="menu = false"
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="userJoinDateB"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="userJoinDateB"
                        @input="menu2 = false"
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="auto" class="ml-5">구매 금액</v-col>
                  <v-col cols="2">
                    <v-text-field dense hide-details outlined suffix="원" />
                  </v-col>
                  <v-col cols="auto">~</v-col>
                  <v-col cols="2">
                    <v-text-field dense hide-details outlined suffix="원" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-row>
        </transition>
        <v-divider />
        <v-row>
          <v-col>총 등록 상품: 0000개/검색된 상품: 0000개</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="userList"
              item-key="productId"
              show-select
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.userDetailInfo`]="{ item }">
                <v-row justify="center"
                  ><v-btn :to="`/admin/user-detail-info/${item.username}`"
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
        <v-row>
          <v-col>
            <v-btn class="mr-5">선택 탈퇴</v-btn>
            <v-btn class="mr-5">선택 회원 포인트 지급</v-btn>
            <v-btn class="mr-5">검색된 회원 포인트 지급</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminUserLeft from '@/components/admin/AdminUserLeft.vue';
import Pagination from 'vue-pagination-2';
import { getUsers } from '@/api/user';

export default {
  created() {
    this.getUsers(1);
  },
  components: {
    Pagination,
    AdminUserLeft,
  },

  data() {
    return {
      searchText: '',
      searchSelected: null,
      searchItems: [
        { value: 'name', text: '이름' },
        { value: 'username', text: '아이디' },
      ],
      detailSearchShowYn: false,
      page: 1,
      records: 10,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'userNo',
        },
        {
          text: '가입일',
          align: 'center',
          sortable: false,
          value: 'createdDate',
        },
        { text: '이름', align: 'center', value: 'name' },
        { text: '아이디', align: 'center', value: 'username' },
        { text: '구매금액', align: 'center', value: 'purchasePrice' },
        { text: '적립 포인트', align: 'center', value: 'point' },
        { text: '상세 보기', align: 'center', value: 'userDetailInfo' },
      ],
      userList: [],
      userJoinDateA: '',
      userJoinDateB: '',
      purchasePriceMin: '',
      purchasePriceMax: '',
      menu: false,
      menu2: false,
      items: [
        {
          text: '회원 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '회원 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    async getUsers(page) {
      const { data } = await getUsers({
        activated: true,
        page: page - 1,
        size: this.perPage,
        name: this.name,
        userJoinDateA: this.userJoinDateA,
        userJoinDateB: this.userJoinDateB,
        purchasePriceMin: this.purchasePriceMin,
        purchasePriceMax: this.purchasePriceMax,
        [this.searchSelected]: this.searchText,
      });
      this.userList = data.content;
      this.perPage = data.size;
      this.records = data.totalElements;
      this.page = data.pageable.pageNumber + 1;
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getUsers(page);
    },
    detailSearchShow() {
      this.detailSearchShowYn = !this.detailSearchShowYn;
      if (this.detailSearchShowYn) {
        this.date1 = new Date(new Date().setDate(new Date().getDate() - 3))
          .toISOString()
          .substr(0, 10);
        this.date2 = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000,
        )
          .toISOString()
          .substr(0, 10);
      } else {
        this.date1 = '';
        this.date2 = '';
      }
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
