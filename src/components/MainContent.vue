<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <v-carousel
            cycle
            height="300"
            hide-delimiter-background
            show-arrows-on-hover
            :touch="{ left: () => activeSlide--, right: () => activeSlide++ }"
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.src"
            />
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined style="border: 0">
            <v-card-title
              style="border: 1px solid indigo"
              class="justify-center text-subtitle-2"
              >공지사항</v-card-title
            >
            <ul v-for="(notice, i) in notices" :key="i" class="mb-0">
              <li>
                <v-btn
                  text
                  :to="`/service-center/notice-detail/${notice.noticeId}`"
                  >{{ notice.title.substr(0, 20)
                  }}<span v-if="notice.title.length >= 20">...</span></v-btn
                >
              </li>
            </ul>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined style="border: 0">
            <v-card-title
              style="border: 1px solid indigo"
              class="justify-center text-subtitle-2"
              >커뮤니티</v-card-title
            >
            <ul v-for="(community, i) in communities" :key="i" class="mb-0">
              <li>
                <v-btn
                  text
                  :to="`/service-center/community-detail/${community.communityId}`"
                  >{{ community.title.substr(0, 20)
                  }}<span v-if="community.title.length >= 20">...</span></v-btn
                >
              </li>
            </ul>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined style="border: 0">
            <v-card-title
              style="border: 1px solid indigo"
              class="justify-center text-subtitle-2"
              >상품평</v-card-title
            >
            <ul
              v-for="(productComment, i) in productComments"
              :key="i"
              class="mb-0"
            >
              <li>
                <v-btn text
                  >{{ productComment.content.substr(0, 20)
                  }}<span v-if="productComment.content.length >= 20"
                    >...</span
                  ></v-btn
                >
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { getNotices } from '@/api/notice';
import { getCommunities } from '@/api/community';
import { getProductComments } from '@/api/productComment';

export default {
  name: 'MainPage',
  created() {
    this.getNotices();
    this.getCommunities();
    this.getProductComments();
  },
  data() {
    return {
      notices: [],
      communities: [],
      productComments: [],
      slides: [
        {
          src: 'https://openimage.interpark.com/milti/displayclassBanner/001208/02/20210722052934.jpg',
        },
        {
          src: 'https://openimage.interpark.com/milti/displayclassBanner/001208/03/20210722053134.jpg',
        },
        {
          src: 'https://openimage.interpark.com/milti/displayclassBanner/001208/01/20210728040546.jpg',
        },
        {
          src: 'https://openimage.interpark.com/dia/images/225/4/210714004/1ce05972123c4aef87b4812197c85ef5.jpg',
        },
      ],
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      // slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    };
  },
  methods: {
    async getNotices() {
      console.log(this.searchSelected);
      try {
        const { data } = await getNotices({
          page: 0,
          size: 5,
        });
        this.notices = data.content;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getCommunities() {
      try {
        const { data } = await getCommunities({
          page: 0,
          size: 5,
        });
        this.communities = data.content;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getProductComments() {
      try {
        const { data } = await getProductComments({
          page: 0,
          size: 5,
        });
        this.productComments = data.content;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
