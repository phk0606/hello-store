<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              헬로 스토어를 소개합니다.
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-img
                class="white--text align-end"
                height="300px"
                src="https://cdnimg.heykorean.com/job/job/78/u786921/K71AZ3ROQ.jpg"
              />

              <v-card-subtitle>
                스타일 숍에서 판매되는 옷들은?
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div>
                  스타일 숍에서 판매되는 옷은 모두 프랑스, 이탈리아에서 직수입한
                  고급 원단으로 제작했습니다. 구매 후 세탁하지 않아도 피부에
                  이상이 없는 천연 바이오 기술이 적용된 고급 소재입니다.
                </div>
                <div>
                  유럽의 패션 디자이너가 직접 디자인하여 착용감이 뛰어나고
                  관리가 용이합니다. 직접 생산하고 유통하여 불필요한 작업 단계를
                  줄였습니다. 저렴한 가격으로 상품을 구매해 보세요!
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {},
  components: {},
  data() {
    return {};
  },
  methods: {},
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
