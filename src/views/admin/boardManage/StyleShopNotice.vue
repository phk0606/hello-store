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
              스타일 숍 공지
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="start">
          <v-col cols="3">
            <v-select
              label="카테고리 선택"
              v-model="categorySelected"
              :items="categoryItems"
              item-text="name"
              item-value="id"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
              @change="getCategoryNotice"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-textarea
              rows="5"
              outlined
              hide-details
              v-model="categoryNotice"
              label="공지 내용"
              :counter="10"
            />
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto"> 모든 카테고리에 동일하게 적용 </v-col>
          <v-col cols="auto"><v-checkbox dense hide-details /></v-col>
        </v-row>
        <v-divider />
        <v-row dense>
          <v-col cols="10">
            <v-btn @click="mergeNoticeContent">저장</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import { getCategoryNotice, mergeNoticeContent } from '@/api/board';
import { getChildCategories } from '@/api/category';

export default {
  name: 'admin-style-shop-list-notice',
  created() {
    this.getChildCategories();
  },
  components: {
    AdminBoardLeft,
  },

  data() {
    return {
      id: '',
      categoryNotice: '',
      categorySelected: null,
      categoryItems: [],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '공지 사항',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '스타일 숍 공지',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    async getChildCategories() {
      const { data } = await getChildCategories({});
      // console.log(data);
      this.categoryItems = data;
    },
    async mergeNoticeContent() {
      try {
        const response = await mergeNoticeContent({
          id: this.id,
          categoryId: this.categorySelected,
          content: this.categoryNotice,
        });
        this.getCategoryNotice();
        console.log(response);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getCategoryNotice() {
      console.log(this.categorySelected);
      try {
        const { data } = await getCategoryNotice({
          categoryId: this.categorySelected,
        });
        console.log(data);
        this.categoryNotice = data.content;
        this.id = data.id;
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
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
