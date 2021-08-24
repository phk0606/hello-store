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
    <v-row>{{ selectedCategoryId }}: {{ selectedCategoryName }}</v-row>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="400">
          <v-subheader class="indigo lighten-4">스타일숍</v-subheader>
          <v-treeview
            dense
            activatable
            color="warning"
            :items="productCategories"
            ><template slot="label" slot-scope="{ item }">
              <div @click="selectCategory(item)">{{ item.name }}</div>
            </template>
          </v-treeview>
          <v-subheader class="indigo lighten-4">오픈숍</v-subheader>
          <v-treeview
            dense
            activatable
            color="warning"
            :items="productCategories"
          />
        </v-card>
      </v-col>
      <v-col cols="8">
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
import { getCategories } from '@/api/category';

export default {
  async created() {
    const { data } = await getCategories();
    this.productCategories = data;
  },
  methods: {
    selectCategory(a) {
      console.log(a);
      this.selectedCategoryId = a.id;
      this.selectedCategoryName = a.name;
    },
  },
  data() {
    return {
      selectedCategoryId: null,
      selectedCategoryName: null,
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
      productCategories: [],
      selectedCategory: [],
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
