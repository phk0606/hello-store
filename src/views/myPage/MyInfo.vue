<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              개인정보 수정
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-card width="550">
              <v-card-text class="text-center px-12">
                <validation-observer ref="observer">
                  <v-form @submit.prevent="signUp">
                    <validation-provider
                      v-slot="{ errors }"
                      name="아이디"
                      :rules="{ required: true }"
                    >
                      <v-text-field
                        disabled
                        v-model="username"
                        label="아이디"
                        prepend-icon="mdi-identifier"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="이름"
                      :rules="{ required: true }"
                    >
                      <v-text-field
                        v-model="name"
                        label="이름"
                        disabled
                        prepend-icon="mdi-account"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="연락처"
                      :rules="{ required: true }"
                    >
                      <v-text-field
                        tabindex="1"
                        v-model="phoneNumber"
                        label="연락처"
                        clearable
                        prepend-icon="mdi-cellphone"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="이메일"
                      :rules="{ required: true }"
                    >
                      <v-text-field
                        tabindex="2"
                        v-model="email"
                        label="이메일"
                        clearable
                        prepend-icon="mdi-email"
                        :error-messages="errors"
                      />
                    </validation-provider>
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
                  </v-form>
                </validation-observer>
              </v-card-text>
              <v-row dense justify="center">
                <v-col cols="auto"
                  ><v-btn @click="modifyPerson">수정</v-btn></v-col
                >
                <v-col cols="auto"
                  ><v-btn to="/my-page/order-info">취소</v-btn></v-col
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Address from '@/components/Address';
import { getUser, modifyPerson } from '@/api/user';

export default {
  created() {
    const username = this.$store.state.username;
    this.getUser(username);
  },
  components: {
    Address,
  },
  data() {
    return {
      createdDate: '',
      zonecode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      username: '',
      name: '',
      phoneNumber: '',
      email: '',
    };
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
      } catch (error) {
        console.log(error);
      }
    },
    async modifyPerson() {
      try {
        const userDto = {
          email: this.email,
          phoneNumber: this.phoneNumber,
          zoneCode: this.zonecode,
          roadAddress: this.roadAddress,
          address: this.address,
          detailAddress: this.detailAddress,
          username: this.username,
        };

        const { data } = await modifyPerson(userDto);
        console.log(data);
        this.getUser(this.username);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
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
