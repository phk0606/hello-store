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
        <span><v-icon>mdi-drag-vertical</v-icon> 스타일 숍 상품 리스트</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-row dense align="center" justify="center">
            <v-col cols="auto">단일 검색</v-col>
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
              <v-text-field dense hide-details outlined />
            </v-col>
            <v-col>
              <v-btn small>상세 검색</v-btn>
            </v-col>
          </v-row>
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
          <v-row>
            <v-col><v-btn>검색</v-btn></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
