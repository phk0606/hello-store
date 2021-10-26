<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          이벤트 상세 보기
        </v-chip>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12">
        {{ title }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ description }}
      </v-col>
    </v-row>
    <v-row dense align="center">
      <v-col cols="auto">이벤트 기간: </v-col>
      <v-col cols="auto">
        {{ eventDateA }}
      </v-col>
      <v-col cols="auto">~</v-col>
      <v-col cols="2">
        {{ eventDateB }}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="11">
        <v-img :src="url" max-width="350" max-height="200" />
      </v-col>
    </v-row>
    <v-divider />
    <v-row dense align="center">
      <v-col cols="auto">이벤트 내용</v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-html="content" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn to="/event/event-list">목록</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getEvent } from '@/api/event';

export default {
  components: {},
  created() {
    const eventId = this.$route.params.eventId;

    if (eventId != null) {
      this.eventId = eventId;
      this.getEvent();
    }
  },
  methods: {
    async getEvent() {
      try {
        const { data } = await getEvent({
          eventId: this.eventId,
        });
        this.content = data.content;
        this.title = data.title;
        this.description = data.description;
        this.eventDateA = data.eventDateA;
        this.eventDateB = data.eventDateB;
        this.url = this.imageUrl + data.imageFile.fileName;

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
      }
    },
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      eventId: null,
      url: null,
      eventDateA: '',
      eventDateB: '',
      title: '',
      description: '',
      content: '',

      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '이벤트 등록/수정하기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
};
</script>

<style></style>
