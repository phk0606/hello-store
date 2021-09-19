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
          <v-col cols="2">
            <v-select
              label="카테고리 선택"
              v-model="categorySelected"
              :items="categoryItems"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="10">
            <v-textarea
              rows="5"
              outlined
              hide-details
              v-model="styleShopListNotice"
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
            <v-btn>저장</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import { getStyleShopListNotice } from '@/api/board';
import { getCategory } from '@/api/category';

export default {
  name: 'admin-style-shop-list-notice',
  created() {},
  components: {
    AdminBoardLeft,
  },

  data() {
    return {
      styleShopListNotice: '',
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
    async getCategory() {
      const { data } = await getCategory({
        parentId: this.category1Select,
      });
      if (this.category1Select == null) {
        this.category1 = data;
      } else {
        this.category2 = data;
        this.category2Select = null;
        console.log(data);
        //this.category2Select = data[0].value;
      }
    },
    async getStyleShopListNotice() {
      try {
        const { data } = await getStyleShopListNotice({
          category: this.categorySelected,
        });

        console.log(data);
        // this.activeTab = 0;
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
