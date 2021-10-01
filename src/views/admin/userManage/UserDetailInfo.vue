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
                    <v-col>{{ name }}</v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">아이디:</div></v-col
                    >
                    <v-col>{{ username }}</v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="2"
                      ><div class="subtitle-1">비밀번호:</div></v-col
                    >
                    <v-col
                      ><v-text-field
                        tabindex="2"
                        v-model="password"
                        type="password"
                        label="비밀번호"
                        clearable
                        prepend-icon="mdi-lock-outline"
                    /></v-col>
                    <v-col>
                      <v-text-field
                        tabindex="3"
                        v-model="passwordConfirm"
                        type="password"
                        label="비밀번호 확인"
                        clearable
                        prepend-icon="mdi-lock-outline"
                      />
                    </v-col>
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
                    <v-col>{{ createdDate }}</v-col>
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
                    <v-col cols="2">{{ purchasePriceSum }} 원 </v-col>
                    <v-col><v-btn @click="openDialog">구매 내역</v-btn></v-col>
                  </v-row>
                  <v-row dense align="center">
                    <v-col cols="3"
                      ><div class="subtitle-1">포인트:</div></v-col
                    >
                    <v-col cols="2">{{ pointSum }} 원</v-col>
                    <v-col
                      ><v-btn @click="openPointDialog"
                        >포인트 이용 내역</v-btn
                      ></v-col
                    >
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
            <v-btn @click="modifyUser">수정</v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn to="/admin/user-list">목록 보기</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>구매
                내역</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-data-table
                      hide-default-footer
                      :headers="orderHeaders"
                      :items="orders"
                      item-key="orderId"
                      class="elevation-1"
                      disable-sort
                      fixed-header
                      height="40vh"
                    >
                      <template v-slot:[`item.productName`]="{ item }">
                        <v-container>
                          <v-row>
                            {{ item.orderProducts[0].productName }}
                          </v-row>
                          <v-row
                            v-if="
                              item.orderProductCount &&
                              item.orderProductCount >= 2
                            "
                            >외 {{ item.orderProductCount - 1 }} 개</v-row
                          >
                        </v-container>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="
                  dialog = false;
                  orders = [];
                "
              >
                닫기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-dialog v-model="pointDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>포인트
                내역</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-data-table
                      hide-default-footer
                      :headers="pointHistoryHeaders"
                      :items="pointHistory"
                      item-key="pointHistoryId"
                      class="elevation-1"
                      disable-sort
                      fixed-header
                      height="40vh"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="
                  pointDialog = false;
                  pointHistory = [];
                "
              >
                닫기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getUser, modifyUser } from '@/api/user';
import Address from '@/components/Address';
import AdminOrderLeft from '@/components/admin/AdminUserLeft.vue';
import { getOrdersByUsername } from '@/api/order';
import { getPointHistory } from '@/api/pointHistory';

export default {
  name: 'UserDetailInfo',
  created() {
    const username = this.$route.params.username;
    this.username = username;
    console.log(username);
    this.getUser(username);
  },
  components: {
    AdminOrderLeft,
    Address,
  },
  methods: {
    openDialog() {
      this.getOrdersByUsername();
      this.dialog = true;
    },
    openPointDialog() {
      this.getPointHistory();
      this.pointDialog = true;
    },
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
    async getPointHistory() {
      try {
        const { data } = await getPointHistory({
          username: this.username,
        });
        this.pointHistory = data.content;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getOrdersByUsername() {
      try {
        const { data } = await getOrdersByUsername({
          username: this.username,
        });
        console.log(data);

        this.orders = data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async modifyUser() {
      try {
        const userDto = {
          email: this.email,
          phoneNumber: this.phoneNumber,
          zoneCode: this.zonecode,
          roadAddress: this.roadAddress,
          address: this.address,
          detailAddress: this.detailAddress,
          password: this.password,
          username: this.username,
        };

        const { data } = await modifyUser(userDto);
        console.log(data);
        this.getUser(this.username);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
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
        this.purchasePriceSum = data.purchasePriceSum;
        this.pointSum = data.pointSum;
        this.password = '';
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      pointHistoryHeaders: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'pointHistoryId',
        },
        {
          text: '날짜',
          align: 'center',
          sortable: false,
          value: 'createdDate',
        },
        { text: '적립/사용', align: 'center', value: 'pointUseTypeValue' },
        { text: '내용', align: 'center', value: 'pointUseDetailTypeValue' },
        { text: '포인트', align: 'center', value: 'point' },
      ],
      pointHistory: [],
      orderHeaders: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'orderId',
        },
        {
          text: '주문일',
          align: 'center',
          sortable: false,
          value: 'createdDate',
        },
        { text: '주문 상품', align: 'center', value: 'productName' },
        { text: '결제 금액', align: 'center', value: 'paymentPrice' },
      ],
      orders: [],
      pointDialog: false,
      dialog: false,
      password: null,
      passwordConfirm: null,
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
      purchasePriceSum: '',
      pointSum: '',
      selected: [],
    };
  },
};
</script>

<style></style>
