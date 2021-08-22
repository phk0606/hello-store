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
        <span><v-icon>mdi-drag-vertical</v-icon> 상품 등록</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon> 상품 정보 입력</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-select
          :items="items1"
          label="카테고리 선택"
          outlined
          dense
          :menu-props="{ offsetY: true }"
        />
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="상품명"
          placeholder="상품명을 입력하세요."
          outlined
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductRegist',
  data() {
    return {
      items1: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품 등록',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
};
</script>

<style></style>
