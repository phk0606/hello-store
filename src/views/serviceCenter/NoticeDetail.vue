<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              공지 사항 상세 보기
            </v-chip>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="auto">제목</v-col>
          <v-col cols="auto">
            {{ noticeTitle }}
          </v-col>
          <v-col>
            {{ createdDate }}
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div v-html="noticeContent" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn to="/service-center/notice">목록 보기</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getNotice, modifyNotice, removeNotice } from '@/api/notice';

export default {
  components: {},
  created() {
    this.noticeId = this.$route.params.noticeId;
    this.getNotice();
  },
  methods: {
    async getNotice() {
      try {
        const { data } = await getNotice({
          noticeId: this.noticeId,
        });
        this.noticeContent = data.content;
        this.noticeTitle = data.title;
        this.createdDate = data.createdDate;
        this.importantNotice = data.important;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async modifyNotice() {
      try {
        const noticeDto = {
          noticeId: this.noticeId,
          title: this.noticeTitle,
          content: this.noticeContent,
          important: this.importantNotice,
        };

        const response = await modifyNotice(noticeDto);
        console.log(response);

        this.$router.push('/admin/notice-list');
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeNotice() {
      try {
        const noticeDto = {
          noticeId: this.noticeId,
        };

        const response = await removeNotice(noticeDto);
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
      noticeId: '',
      importantNotice: false,
      noticeTitle: '',
      noticeContent: '',
      createdDate: '',
    };
  },
};
</script>

<style></style>
