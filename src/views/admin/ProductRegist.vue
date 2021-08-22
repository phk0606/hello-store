<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-icon>mdi-drag-vertical</v-icon>
        상품 등록
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-icon>mdi-drag-vertical-variant</v-icon>
        상품 정보 입력
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductRegist',
  data() {
    return {
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
