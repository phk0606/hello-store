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
          <v-card flat>
            <v-card-title class="justify-center">
              <v-chip color="indigo darken-3" outlined label class="text-h6">
                공지사항
              </v-chip>
            </v-card-title>
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
          <v-card flat>
            <v-card-title class="justify-center">
              <v-chip color="indigo darken-3" outlined label class="text-h6">
                커뮤니티
              </v-chip>
            </v-card-title>
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
          <v-card flat>
            <v-card-title class="justify-center">
              <v-chip color="indigo darken-3" outlined label class="text-h6">
                상품평
              </v-chip>
            </v-card-title>
            <ul
              v-for="(productComment, i) in productComments"
              :key="i"
              class="mb-0"
            >
              <li>
                <v-btn
                  text
                  :to="`/style-shop/product-comment/${productComment.productId}`"
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
      <v-row dense>
        <v-col>
          <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto" class="ml-5"
          ><v-icon large>mdi-star-shooting</v-icon></v-col
        >
        <v-col> <h3>스타일 숍 신상품</h3></v-col></v-row
      >
      <v-row dense>
        <v-col
          v-for="(content, i) in newArrivals"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            height="100%"
            max-width="500"
            class="mx-auto"
            :to="`/style-shop/product-detail/${content.productId}`"
          >
            <v-img max-width="500" :src="`${imageUrl}${content.fileName}`" />
            <v-chip
              v-if="content.newArrival"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              신상품
            </v-chip>
            <v-chip
              v-if="content.best"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              Best
            </v-chip>
            <v-chip
              v-if="content.discount"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              할인
            </v-chip>
            <v-card-text class="text--primary">
              <div v-if="content.salePrice">
                <del>{{ content.regularPrice }}</del> → {{ content.salePrice }}
              </div>
              <div v-else>{{ content.regularPrice }}</div>

              <div>{{ content.productName }}</div>
              <div>{{ content.description }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="auto" class="ml-5"
          ><v-icon large>mdi-star-shooting</v-icon></v-col
        >
        <v-col> <h3>스타일 숍 베스트</h3></v-col></v-row
      >
      <v-row dense>
        <v-col
          v-for="(content, i) in bests"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            height="100%"
            max-width="500"
            class="mx-auto"
            :to="`/style-shop/product-detail/${content.productId}`"
          >
            <v-img max-width="500" :src="`${imageUrl}${content.fileName}`" />
            <v-chip
              v-if="content.newArrival"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              신상품
            </v-chip>
            <v-chip
              v-if="content.best"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              Best
            </v-chip>
            <v-chip
              v-if="content.discount"
              class="ml-2"
              x-small
              color="pink"
              label
              text-color="white"
            >
              <!-- <v-icon left> mdi-label </v-icon> -->
              할인
            </v-chip>
            <v-card-text class="text--primary">
              <div v-if="content.salePrice">
                <del>{{ content.regularPrice }}</del> → {{ content.salePrice }}
              </div>
              <div v-else>{{ content.regularPrice }}</div>

              <div>{{ content.productName }}</div>
              <div>{{ content.description }}</div>
            </v-card-text>
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
import { getProductsPageCondition } from '@/api/shopProduct';

export default {
  name: 'MainPage',
  async created() {
    await this.getNotices();
    await this.getCommunities();
    await this.getProductComments();
    await this.getProductsPageCondition('newArrival');
    await this.getProductsPageCondition('best');
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      newArrivals: [],
      bests: [],
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
    };
  },
  methods: {
    async getProductsPageCondition(productProperty) {
      try {
        const { data } = await getProductsPageCondition({
          page: 0,
          size: 12,
          productProperty: productProperty,
        });

        if (productProperty === 'newArrival') {
          this.newArrivals = data.content;
        } else {
          this.bests = data.content;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
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
