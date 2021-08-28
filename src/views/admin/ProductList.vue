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
      <v-col cols="2">단일 검색</v-col>
      <v-col cols="4">
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
        <v-text-field dense hide-details outlined />
      </v-col>
      <v-col cols="3">
        <v-btn small>상세 검색</v-btn>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center">
      <v-col cols="2">카테고리 선택</v-col>
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
    <v-row>
      <v-col><v-btn>검색</v-btn></v-col>
    </v-row>

    <v-row>
      <v-col>총 등록 상품: 0000개/검색된 상품: 0000개</v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="desserts"
          item-key="name"
          show-select
          class="elevation-1"
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
  </v-container>
</template>

<script>
import Pagination from 'vue-pagination-2';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      page: 1,
      selected: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
      ],
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
  },
};
</script>

<style>
.v-input {
  margin-top: 0 !important;
}
label {
  margin-bottom: 0;
}
</style>
