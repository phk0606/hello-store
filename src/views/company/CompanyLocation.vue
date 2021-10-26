<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              찾아오시는 길
            </v-chip>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="12">
            <div id="map" style="width: 700px; height: 418px" />
          </v-col>
        </v-row>
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-card-title class="pb-0"> 주소</v-card-title>
          </v-col>
          <v-col>
            <v-card-subtitle class="pb-0"
              >서울시 영등포구 당산로 41길 11 SK V1 센터 W동
              323호</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-card-title class="pb-0">자동차</v-card-title>
          </v-col>
          <v-col>
            <v-card-subtitle class="pb-0"
              >내비게이션 '당산 SK V1센터' 검색</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-card-title class="pb-0">대중교통</v-card-title>
          </v-col>
          <v-col>
            <v-card-subtitle class="pb-0"
              >지하철 - 2호선 당산역 11번 출구에서 도보 5분 버스 - 000
              승강장에서 도보 10분
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b86a7eefad6be497476399ad3b00a34a';
      document.head.appendChild(script);
    }
  },
  components: {},
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      const container = document.querySelector('#map');
      const options = {
        center: new kakao.maps.LatLng(37.530846057894834, 126.89835281545423),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(
        37.530846057894834,
        126.89835281545423,
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    },
  },
};
</script>

<style>
.v-input__prepend-outer {
  margin: 0 !important;
  align-self: center;
}
.v-input {
  margin-top: 0 !important;
}
label {
  margin-bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
