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
              이벤트 등록/수정하기
            </v-chip>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              label="제목을 입력하세요."
              v-model="title"
              dense
              hide-details
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              rows="3"
              outlined
              v-model="description"
              label="이벤트 요약 내용을 입력하세요."
              :counter="200"
            />
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto">이벤트 기간</v-col>
          <v-col cols="2">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="eventDateA"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="eventDateA" @input="menu = false" />
            </v-menu>
          </v-col>
          <v-col cols="2">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="eventDateB"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="eventDateB" @input="menu2 = false" />
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-file-input
              label="리스트 이미지"
              @change="Preview_image"
              v-model="image"
              show-size
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <v-img :src="url" max-width="700" max-height="500" />
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto">이벤트 내용</v-col>
        </v-row>
        <v-row>
          <v-col>
            <tiptap-vuetify v-model="content" :extensions="extensions" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn @click="createOrModifyEvent">저장</v-btn>
          </v-col>
          <v-col>
            <v-btn to="/admin/event-list">취소</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="removeEvents">삭제</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createEvent, getEvent, modifyEvent, removeEvents } from '@/api/event';
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
    const eventId = this.$route.params.eventId;

    if (eventId != null) {
      this.eventId = eventId;
      this.getEvent();
    }
  },
  methods: {
    async removeEvents() {
      try {
        const eventIds = [];
        eventIds.push(this.eventId);
        await removeEvents({
          eventIds,
        });
        this.$router.push('/admin/event-list');
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
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

        let dataImage = data.image;
        let contentType = 'image/png';
        let file = new File(
          [this.b64toBlob(dataImage, contentType)],
          data.imageFile.originalFileName,
        );
        this.image = file;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async createOrModifyEvent() {
      try {
        const formData = new FormData();

        if (this.image != null) {
          formData.append('eventImage', this.image);
        }

        const eventDto = {
          eventId: this.eventId,
          title: this.title,
          description: this.description,
          eventDateA: this.eventDateA,
          eventDateB: this.eventDateB,
          content: this.content,
        };

        formData.append(
          'eventDto',
          new Blob([JSON.stringify(eventDto)], {
            type: 'application/json',
          }),
        );

        if (this.eventId != null) {
          await modifyEvent(formData);
        } else {
          const response = await createEvent(formData);
          console.log(response);
        }

        this.$router.push('/admin/event-list');
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
      }
    },
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      eventId: null,
      image: null,
      url: null,
      menu: false,
      menu2: false,
      eventDateA: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .substr(0, 10),
      eventDateB: new Date(new Date().setDate(new Date().getDate() + 15))
        .toISOString()
        .substr(0, 10),
      title: '',
      description: '',
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
