<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-policy-left />
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
              정책 관리
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              배송 정책
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="auto"
            ><v-text-field
              v-model="defaultShippingFee"
              hide-details
              dense
              outlined
              required
              suffix="원"
              ><template v-slot:prepend>
                <v-card width="120" flat>- 기본 배송료:</v-card></template
              >
            </v-text-field></v-col
          >
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto"
            ><v-text-field
              v-model="defaultShippingFee"
              hide-details
              dense
              outlined
              required
              suffix="원"
              ><template v-slot:prepend>
                <v-card width="120" flat>- 무료 배송:</v-card></template
              >
            </v-text-field></v-col
          ><v-col>이상 구매 시 무료 배송</v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              포인트 정책
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto"
            ><v-text-field
              v-model="defaultShippingFee"
              hide-details
              dense
              outlined
              required
              suffix="원"
              ><template v-slot:prepend>
                <v-card width="120" flat>- 가입 포인트:</v-card></template
              >
            </v-text-field></v-col
          ><v-col>적립</v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto"
            ><v-text-field
              v-model="defaultShippingFee"
              hide-details
              dense
              outlined
              required
              suffix="%"
              ><template v-slot:prepend>
                <v-card width="120" flat>- 구매 포인트:</v-card></template
              >
            </v-text-field></v-col
          ><v-col>적립 (구매 금액의)</v-col>
        </v-row>
        <v-divider />
        <v-row dense>
          <v-col cols="auto">
            <v-btn @click="mergeNoticeContent">저장</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="mergeNoticeContent">취소</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminPolicyLeft from '@/components/admin/AdminPolicyLeft.vue';

export default {
  name: 'admin-policy',
  created() {},
  components: {
    AdminPolicyLeft,
  },

  data() {
    return {
      id: '',
      categoryNotice: '',
      categorySelected: null,
      categoryItems: [],
      items: [
        {
          text: '기본 정책 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '정책 관리',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
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
