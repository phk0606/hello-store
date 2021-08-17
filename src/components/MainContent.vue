<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel
            cycle
            height="400"
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
            <v-card-title>공지사항</v-card-title>
            <ul class="text-subtitle-2">
              <li>상품을 주문하는 방법 안내해 드립니다.</li>
              <li>결제가 잘 되지 않을 때 이렇게 해보세요!</li>
              <li>장바구니를 이렇게 이용하면 좋습니다.</li>
              <li>배송은 주문 후 2일이내 완료 됩니다</li>
              <li>상품 등록 시 주의 사항 알려드립니다.</li>
            </ul>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined style="border: 0">
            <v-card-title>커뮤니티</v-card-title>
            <ul class="text-subtitle-2">
              <li>상품 판매는 어떻게 하나요?. 2017.07.07</li>
              <li>상품 판매 후 금액은 어떻... 2017.07.07</li>
              <li>포인트는 어떻게 사용하면... 2017.07.07</li>
              <li>배송완료된 상품은 삭제해... 2017.07.07</li>
              <li>상품은 언제까지 배송가능... 2017.07.07</li>
            </ul>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined style="border: 0">
            <v-card-title>상품평</v-card-title>
            <ul class="text-subtitle-2">
              <li>옷 정말 잘 산 거 같아요! 다음에도 또…</li>
              <li>고급 소재라서 그런지 너무 부드럽고...</li>
              <li>너무 좋아서 맨날 입고 다니고 있어요..</li>
              <li>세탁을 해도 옷 색이 전혀 변하지 않아...</li>
              <li>지금 입기에 딱 좋은 옷이네요! 다른 색..</li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
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
  // components: {},
};
</script>
