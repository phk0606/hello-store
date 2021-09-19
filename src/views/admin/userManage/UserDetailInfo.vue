<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-order-left />
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
              회원 정보 상세 보기
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              가입 정보
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="8">
            <v-card ref="form">
              <v-card-text>
                <v-container>
                  <v-row dense align="center">
                    <v-col cols="2"><div class="subtitle-1">이름:</div></v-col>
                    <v-col
                      ><v-text-field
                        v-model="name"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">아이디:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="username"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">비밀번호:</div></v-col
                    >
                    <v-col
                      ><v-text-field hide-details dense solo-inverted required
                    /></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">이메일:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="email"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">연락처:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="phoneNumber"
                        hide-details
                        dense
                        solo-inverted
                        counter="11"
                        required
                    /></v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <Address
                        v-on:setAddress="setAddress"
                        v-on:setDetailAddress="setDetailAddress"
                        :zonecode="zonecode"
                        :roadAddress="roadAddress"
                        :address="address"
                        :detailAddress="detailAddress"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              이용/운영 정보
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="8">
            <v-card ref="form">
              <v-card-text>
                <v-container>
                  <v-row dense align="center">
                    <v-col cols="3"
                      ><div class="subtitle-1">가입일:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="createdDate"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                    <!-- <v-col cols="2"
                      ><div class="subtitle-1">회원 등급:</div></v-col
                    >
                    <v-col
                      ><v-text-field hide-details dense solo-inverted required
                    /></v-col> -->
                  </v-row>

                  <v-row dense align="center">
                    <v-col cols="3"
                      ><div class="subtitle-1">총 구매 금액:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="purchasePrice"
                        hide-details
                        dense
                        solo-inverted
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3"
                      ><div class="subtitle-1">포인트:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        v-model="point"
                        hide-details
                        dense
                        solo-inverted
                        required
                    /></v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn>회원 탈퇴</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn>수정</v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn>목록 보기</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getUser } from '@/api/user';
import Address from '@/components/Address';
import AdminOrderLeft from '@/components/admin/AdminUserLeft.vue';

export default {
  name: 'UserDetailInfo',
  created() {
    const username = this.$route.params.username;
    console.log(username);
    this.getUser(username);
    this.username = username;
  },
  components: {
    AdminOrderLeft,
    Address,
  },
  methods: {
    setAddress(zonecode, roadAddress, address) {
      // console.log(zonecode, roadAddress, address);
      this.zonecode = zonecode;
      this.roadAddress = roadAddress;
      this.address = address;
    },
    setDetailAddress(detailAddress) {
      // console.log(detailAddress);
      this.detailAddress = detailAddress;
    },
    async getUser(username) {
      try {
        const { data } = await getUser({
          username: username,
        });
        console.log(data);
        this.username = data.username;
        this.name = data.name;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.zonecode = data.zoneCode;
        this.roadAddress = data.roadAddress;
        this.address = data.address;
        this.createdDate = data.createdDate;
        this.detailAddress = data.detailAddress;
        this.purchasePrice = data.purchasePrice;
        this.point = data.point;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      createdDate: '',
      zonecode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      items: [
        {
          text: '회원 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '회원 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '회원 정보 상세 보기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
      username: '',
      name: '',
      email: '',
      phoneNumber: '',
      purchasePrice: '',
      point: '',
      selected: [],
    };
  },
};
</script>

<style></style>
