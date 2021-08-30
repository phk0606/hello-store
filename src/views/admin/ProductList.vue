<template>
  <v-container fluid>
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
          스타일 숍 상품 리스트
        </v-chip>
      </v-col>
    </v-row>

    <v-row dense align="center" justify="center">
      <v-col cols="auto" class="d-flex">
        <v-select
          :items="items1"
          label=""
          outlined
          hide-details
          dense
          :menu-props="{ offsetY: true }"
        >
          <template v-slot:prepend>
            <v-card width="80" flat>단일 검색:</v-card></template
          >
        </v-select>
        <v-text-field dense hide-details outlined>
          <template v-slot:prepend> <v-card width="10" flat /></template>
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn>검색</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn small text @click="detailSearchShow">상세 검색</v-btn>
      </v-col>
    </v-row>
    <transition name="fade">
      <v-card v-show="detailSearchShowYn">
        <v-container>
          <v-row dense align="center" justify="center">
            <v-col cols="auto">카테고리 선택</v-col>
            <v-col cols="3">
              <v-select
                :items="items1"
                label=""
                outlined
                hide-details
                dense
                :menu-props="{ offsetY: true }"
              />
            </v-col>

            <v-col cols="3">
              <v-select
                :items="items1"
                label=""
                outlined
                hide-details
                dense
                :menu-props="{ offsetY: true }"
              />
            </v-col>
            <v-col cols="auto">판매 가격</v-col>
            <v-col>
              <v-text-field dense hide-details outlined />
            </v-col>
            <v-col>
              <v-text-field dense hide-details outlined />
            </v-col>
          </v-row>
          <v-row dense align="center" justify="center">
            <v-col cols="auto">상품 등록일</v-col>
            <v-col>
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
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" @input="menu = false" />
              </v-menu>
            </v-col>
            <v-col>
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
                    v-model="date2"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" @input="menu2 = false" />
              </v-menu>
            </v-col>
            <v-col cols="auto">진열 여부</v-col>
            <v-col class="d-flex">
              <v-checkbox dense hide-details label="진열" class="mr-2" />
              <v-checkbox dense hide-details label="품절" class="mr-2" />
              <v-checkbox dense hide-details label="숨김" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
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
          :items="itemsWithSno"
          item-key="name"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              :src="'data:image/png;base64,' + item.image"
              style="width: 50px; height: 50px"
            />
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-row>{{ item.categoryName }}</v-row>
            <v-row>{{ item.name }}</v-row>
          </template>
          <template v-slot:[`item.createdDate`]="{ item }">
            <v-row>{{ item.createdDate }}</v-row>
            <v-row>({{ item.lastModifiedDate }})</v-row>
          </template>
          <template v-slot:[`item.productShowType`]="{ item }">
            <v-row justify="center" v-if="item.productShowType === 'SHOW'">
              진열
            </v-row>
            <v-row v-else-if="item.productShowType === 'HIDE'"> 숨김 </v-row>
            <v-row v-else-if="item.productShowType === 'SOLDOUT'"> 품절 </v-row>
          </template>
          <template v-slot:[`item.modify`]>
            <v-row><v-btn>수정</v-btn></v-row>
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
          :records="500"
          :per-page="20"
          @paginate="myCallback"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>삭제</v-btn>
        <v-btn>진열</v-btn>
        <v-btn>숨김</v-btn>
        <v-btn>품절</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from 'vue-pagination-2';
import { getProducts } from '@/api/product';

export default {
  created() {
    this.getProducts();
  },
  components: {
    Pagination,
  },
  computed: {
    itemsWithSno() {
      return this.contentList.map((d, index) => ({ ...d, sno: index + 1 }));
    },
  },
  data() {
    return {
      detailSearchShowYn: false,
      page: 1,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'sno',
        },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '카테고리와 상품명', align: 'center', value: 'name' },
        { text: '판매 가격(적립금)', align: 'center', value: 'salePrice' },
        { text: '진열상태', align: 'center', value: 'productShowType' },
        { text: '등록일(수정일)', align: 'center', value: 'createdDate' },
        { text: '아이디', align: 'center', value: 'createBy' },
        { text: '조회수', align: 'center', value: 'clickCount' },
        { text: '수정', align: 'center', value: 'modify' },
      ],
      contentList: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      items1: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '스타일 숍',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
    detailSearchShow() {
      this.detailSearchShowYn = !this.detailSearchShowYn;
    },
    async getProducts() {
      try {
        const { data } = await getProducts();
        this.contentList = data;
        console.log(data);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
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
