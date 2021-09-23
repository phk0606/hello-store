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
              커뮤니티 상세 보기
            </v-chip>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto">제목</v-col>
          <v-col cols="auto">
            <v-text-field v-model="title" dense hide-details outlined />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <tiptap-vuetify v-model="content" :extensions="extensions" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn to="/admin/community-list">목록 보기</v-btn>
          </v-col>
          <v-col>
            <v-btn to="/admin/community-regist" color="indigo" dark class="mr-3"
              >글쓰기</v-btn
            >
            <v-btn @click="modifyCommunity" class="mr-3">수정</v-btn>
            <v-btn @click="removeCommunity">삭제</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getCommunity,
  modifyCommunity,
  removeCommunity,
} from '@/api/community';
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
  created() {
    this.communityId = this.$route.params.communityId;
    this.getCommunity();
  },
  methods: {
    async getCommunity() {
      try {
        const { data } = await getCommunity({
          communityId: this.communityId,
        });
        this.content = data.content;
        this.title = data.title;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async modifyCommunity() {
      try {
        const communityDto = {
          communityId: this.communityId,
          title: this.title,
          content: this.content,
        };

        const response = await modifyCommunity(communityDto);
        console.log(response);
        this.$router.push('/admin/community-list');
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeCommunity() {
      try {
        const communityeDto = {
          communityId: this.communityId,
        };

        const response = await removeCommunity(communityeDto);
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
      communityId: '',
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
          text: '상세 보기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
};
</script>

<style></style>
