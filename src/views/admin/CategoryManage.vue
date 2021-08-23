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
    <v-row />
    <v-row>
      <v-col>
        <span
          ><v-icon>mdi-drag-vertical</v-icon>스타일 숍 상품 카테고리 관리</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span
          ><v-icon>mdi-drag-vertical-variant</v-icon>카테고리
          등록/수정/삭제</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn small>1차 카테고리 생성</v-btn>
      </v-col>
      <v-col>
        <v-btn small>2차 카테고리 생성</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="400">
          <v-subheader class="indigo lighten-4">스타일숍</v-subheader>
          <v-treeview dense activatable color="warning" :items="items2" />
          <v-subheader class="indigo lighten-4">오픈숍</v-subheader>
          <v-treeview dense activatable color="warning" :items="items2" />
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-row align="center" dense>
            <v-col cols="auto">1차 카테고리 명 </v-col>
            <v-col>
              <v-text-field outlined dense hide-details />
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-row align="center" dense>
            <v-col>1차 카테고리 명: Outer</v-col>
          </v-row>
          <v-row align="center" dense>
            <v-col cols="auto">2차 카테고리 명 </v-col>
            <v-col>
              <v-text-field outlined dense hide-details />
            </v-col>
          </v-row>
          <v-row align="center" dense>
            <v-col cols="auto"> 카테고리 노출 </v-col>
            <v-col>
              <v-radio-group dense row hide-details>
                <v-radio value="1" label="노출" />

                <v-radio value="2" label="숨김" />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto"> <v-btn>저장</v-btn></v-col
      ><v-col cols="5"><v-btn>취소</v-btn></v-col>
      <v-col cols="2"><v-btn>삭제</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '카테고리 관리',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '스타일 숍',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
      items2: [
        {
          id: 1,
          name: 'Outer',
          children: [
            { id: 2, name: '가디건' },
            { id: 3, name: '자켓' },
            { id: 4, name: '점퍼' },
            { id: 5, name: '코트' },
          ],
        },
        {
          id: 6,
          name: '상의',
          children: [
            { id: 7, name: '니트' },
            { id: 8, name: '브라우스' },
            { id: 9, name: '셔츠' },
            { id: 10, name: '티' },
          ],
        },
        {
          id: 11,
          name: '하의',
          children: [
            { id: 12, name: '슬랙스' },
            { id: 13, name: '일자팬츠' },
            { id: 14, name: '데님팬츠' },
            { id: 15, name: '반바지' },
          ],
        },
        {
          id: 16,
          name: '스커트',
          children: [
            { id: 17, name: '미니스커트' },
            { id: 18, name: '롱스커트' },
            { id: 19, name: '맥시스커트' },
            { id: 20, name: 'A라인' },
          ],
        },
        {
          id: 21,
          name: '원피스',
          children: [
            { id: 22, name: '캐주얼원피스' },
            { id: 23, name: '정장원피스' },
            { id: 24, name: '니트원피스' },
            { id: 25, name: '청/데님원피스' },
          ],
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
