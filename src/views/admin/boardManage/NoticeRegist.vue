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
              공지사항 글쓰기
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense align="center" justify="start">
          <v-col cols="3">
            <v-checkbox
              v-model="importantNotice"
              dense
              hide-details
              label="중요 공지"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              label="제목을 입력하세요."
              v-model="noticeTitle"
              dense
              hide-details
              outlined
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <tiptap-vuetify v-model="noticeContent" :extensions="extensions" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn @click="createNotice">등록</v-btn>
          </v-col>
          <v-col>
            <v-btn to="/admin/notice-list">취소</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNotice } from '@/api/notice';
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import {
  TiptapVuetify,
  Image,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';

export default {
  components: {
    AdminBoardLeft,
    TiptapVuetify,
  },
  methods: {
    async createNotice() {
      try {
        const noticeDto = {
          title: this.noticeTitle,
          content: this.noticeContent,
          important: this.importantNotice,
        };

        const response = await createNotice(noticeDto);
        console.log(response);
        this.$router.push('/admin/notice-list');
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
  },
  data() {
    return {
      importantNotice: false,
      noticeTitle: '',
      noticeContent: '',
      extensions: [
        History,
        Image,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '공지사항',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '글쓰기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
};
</script>

<style></style>
