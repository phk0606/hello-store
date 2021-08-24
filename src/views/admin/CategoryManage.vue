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
          <v-form id="categoryForm" @submit.prevent="submitForm">
            <v-row align="center" dense>
              <v-col cols="auto">1차 카테고리 명 </v-col>
              <v-col>
                <v-text-field
                  v-model="firstCategoryName"
                  outlined
                  dense
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row align="center" dense>
              <v-col cols="auto"> 카테고리 노출 </v-col>
              <v-col>
                <v-radio-group v-model="radioGroup1" dense row hide-details>
                  <v-radio value="Y" label="노출" />
                  <v-radio value="N" label="숨김" />
                </v-radio-group>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-card>
          <v-row align="center" dense>
            <v-col>1차 카테고리 명: {{ selectedCategoryName }}</v-col>
          </v-row>
          <v-row align="center" dense>
            <v-col cols="auto">2차 카테고리 명 </v-col>
            <v-col>
              <v-text-field
                v-model="secondCategoryName"
                outlined
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row align="center" dense>
            <v-col cols="auto"> 카테고리 노출 </v-col>
            <v-col>
              <v-radio-group v-model="radioGroup2" dense row hide-details>
                <v-radio value="Y" label="노출" />
                <v-radio value="N" label="숨김" />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto"
        ><v-btn type="submit" color="indigo" form="categoryForm" dark
          >저장</v-btn
        ></v-col
      ><v-col cols="5"><v-btn>취소</v-btn></v-col>
      <v-col cols="2"><v-btn>삭제</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getProductCategories, createProductCategory } from '@/api/category';

export default {
  created() {
    this.getProductCategories();
  },
  methods: {
    selectCategory(a) {
      console.log(a);
      this.selectedCategoryId = a.id;
      this.selectedCategoryName = a.name;
    },
    async getProductCategories() {
      const { data } = await getProductCategories();
      this.productCategories = data;
    },
    async submitForm() {
      try {
        const response = await createProductCategory({
          name: this.firstCategoryName,
          showYn: this.radioGroup1,
        });
        this.getProductCategories();
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
  },
  data() {
    return {
      logMessage: '',
      firstCategoryId: 0,
      firstCategoryName: '',
      secondCategoryName: '',
      radioGroup1: 'Y',
      radioGroup2: 'Y',
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
