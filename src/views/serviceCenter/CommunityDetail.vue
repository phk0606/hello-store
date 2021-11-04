<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              커뮤니티 상세 보기
            </v-chip>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="auto"
            v-if="
              $store.state.username === content.username ||
              $store.state.authority.includes('ROLE_ADMIN')
            "
          >
            <v-text-field
              v-model="title"
              label="제목"
              dense
              hide-details
              outlined
            />
          </v-col>
          <v-col v-else cols="auto">
            {{ title }}
          </v-col>
          <v-col>
            <v-spacer />
          </v-col>
          <v-col cols="auto"> {{ createdBy }} {{ createdDate }} </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-divider />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col
            v-if="
              $store.state.username === content.username ||
              $store.state.authority.includes('ROLE_ADMIN')
            "
          >
            <tiptap-vuetify v-model="content" :extensions="extensions" />
          </v-col>
          <v-col v-else>
            <div v-html="content" />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="auto">작성된 댓글({{ replyCount }}개)</v-col>
          <v-col>
            <v-btn
              outlined
              small
              color="indigo"
              class="mr-2"
              @click.prevent="replyRegistShow"
            >
              작성
            </v-btn>
            <v-btn
              outlined
              small
              color="orange"
              @click.prevent="replyRegistHidden"
            >
              취소
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" v-show="replyRegistShowYn" class="pb-1">
          <v-col cols="7">
            <v-textarea
              v-model="replyRegistContent"
              outlined
              hide-details
              rows="1"
            />
          </v-col>
          <v-col>
            <v-btn
              @click="createCommunityReply"
              dark
              color="deep-purple darken-3"
              class="mr-2"
            >
              등록
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-for="(reply, i) in replies" :key="i" dense align="center">
          <v-col cols="1">
            <v-spacer />
          </v-col>
          <v-col cols="auto">
            <v-icon>mdi-arrow-right-bottom</v-icon>
          </v-col>
          <v-col cols="10">
            <v-card flat>
              <v-card-subtitle>
                {{ reply.createdBy }}
                {{ reply.createdDate }}
              </v-card-subtitle>
              <v-card-text>
                <v-row align="center">
                  <v-col cols="">
                    <v-textarea
                      v-model="reply.content"
                      outlined
                      hide-details
                      rows="1"
                    />
                  </v-col>
                  <v-col>
                    <v-btn
                      @click="modifyCommunityReply(i)"
                      outlined
                      small
                      color="purple"
                      class="mr-2"
                    >
                      수정
                    </v-btn>
                    <v-btn
                      @click="removeCommunityReply(i)"
                      outlined
                      small
                      color="red"
                    >
                      삭제
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="auto">
            <v-btn to="/service-center/community">목록 보기</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="toCommunityRegist" color="indigo" dark class="mr-3"
              >글쓰기</v-btn
            >
            <v-btn
              v-if="
                $store.state.username === content.username ||
                $store.state.authority.includes('ROLE_ADMIN')
              "
              @click="modifyCommunity"
              class="mr-3"
              >수정</v-btn
            >
            <v-btn
              v-if="
                $store.state.username === content.username ||
                $store.state.authority.includes('ROLE_ADMIN')
              "
              @click="removeCommunity"
              >삭제</v-btn
            >
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
  createCommunityReply,
  removeCommunityReply,
  modifyCommunityReply,
} from '@/api/community';
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
  created() {
    this.communityId = this.$route.params.communityId;
    this.getCommunity();
  },
  methods: {
    toCommunityRegist() {
      if (!this.$store.getters.isLogin) {
        alert('로그인이 필요합니다.');
        return;
      }
      this.$router.push('/service-center/community-regist');
    },
    replyRegistShow() {
      this.replyRegistShowYn = true;
    },
    replyRegistHidden() {
      this.replyRegistShowYn = false;
    },
    async removeCommunityReply(i) {
      try {
        await removeCommunityReply({
          communityReplyId: this.replies[i].communityReplyId,
        });
        //console.log(data);
        this.getCommunity();
      } catch (error) {
        console.log(error);
      }
    },
    async modifyCommunityReply(i) {
      try {
        const { data } = await modifyCommunityReply({
          communityReplyId: this.replies[i].communityReplyId,
          content: this.replies[i].content,
        });
        console.log(data);
        this.getCommunity();
      } catch (error) {
        console.error(error);
      }
    },
    async createCommunityReply() {
      try {
        if (!this.$store.getters.isLogin) {
          alert('로그인이 필요합니다.');
          return;
        }
        const replyRegistContent = this.replyRegistContent;
        console.log(replyRegistContent);
        if (!replyRegistContent) {
          alert('내용을 입력하세요.');
          return;
        }
        const replyDto = {
          communityId: this.communityId,
          content: this.replyRegistContent,
        };
        const response = await createCommunityReply(replyDto);

        console.log(response);
        this.getCommunity();
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getCommunity() {
      try {
        const { data } = await getCommunity({
          communityId: this.communityId,
        });
        this.content = data.content;
        this.title = data.title;
        this.replies = data.replies;
        this.createdBy = data.createdBy;
        this.createdDate = data.createdDate;
        this.replyCount = data.replyCount;
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
      createdBy: '',
      createdDate: '',
      replyCount: '',
      replies: [],
      replyRegistContent: '',
      replyRegistShowYn: false,
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
    };
  },
};
</script>

<style></style>
