<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        Copyright {{ new Date().getFullYear() }} —
        <strong>헬로스토어</strong> Corp. All Rights Reserved.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      '헬로스토어 블로그',
      '회사소개',
      '이용약관',
      '개인정보처리방침',
      '고객센터',
      '판매자 등록',
    ],
  }),
};
</script>

<style></style>
