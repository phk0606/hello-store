<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              커뮤니티 글쓰기
            </v-chip>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="8">
            <v-text-field
              v-model="title"
              label="제목"
              dense
              hide-details
              outlined
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <tiptap-vuetify v-model="content" :extensions="extensions" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn @click="createCommunity">등록</v-btn>
          </v-col>
          <v-col>
            <v-btn to="/service-center/community">취소</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createCommunity } from '@/api/community';
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
    TiptapVuetify,
  },
  methods: {
    async createCommunity() {
      console.log(this.title);
      if (this.title === '') {
        alert('제목을 입력해주세요.');
        return;
      }
      if (this.content === '') {
        alert('내용을 입력해주세요.');
        return;
      }
      if (!confirm('글을 등록하시겠습니까?')) {
        return;
      }

      try {
        const communityDto = {
          title: this.title,
          content: this.content,
        };

        const response = await createCommunity(communityDto);
        console.log(response);
        this.$router.push('/admin/community-list');
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
  },
  data() {
    return {
      importantNotice: false,
      title: '',
      content: '',
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
    };
  },
};
</script>

<style></style>
