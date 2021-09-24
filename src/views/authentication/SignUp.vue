<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <v-img
            width="120"
            class="mx-auto mb-6"
            :src="require('@/assets/logo.png')"
          />
        </router-link>

        <v-card width="550">
          <p class="log">{{ logMessage }}</p>
          <v-card-text class="text-center px-12 py-16">
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form @submit.prevent="signUp">
                <div class="text-h4 font-weight-black">회원가입</div>
                <validation-provider
                  v-slot="{ errors }"
                  name="아이디"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="1"
                    v-model="username"
                    label="아이디"
                    clearable
                    prepend-icon="mdi-identifier"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="비밀번호"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="2"
                    v-model="password"
                    type="password"
                    label="비밀번호"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="비밀번호 확인"
                  :rules="{ required: true, confirmed: '비밀번호' }"
                >
                  <v-text-field
                    tabindex="3"
                    v-model="passwordConfirm"
                    type="password"
                    label="비밀번호 확인"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="이름"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="4"
                    v-model="name"
                    label="이름"
                    clearable
                    prepend-icon="mdi-account"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="휴대폰 번호"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="5"
                    v-model="phoneNumber"
                    label="휴대폰 번호"
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
                    tabindex="6"
                    v-model="email"
                    label="이메일"
                    clearable
                    prepend-icon="mdi-email"
                    :error-messages="errors"
                  />
                </validation-provider>

                <Address
                  v-on:setAddress="setAddress"
                  v-on:setDetailAddress="setDetailAddress"
                  :zonecode="zonecode"
                  :roadAddress="roadAddress"
                  :address="address"
                  :detailAddress="detailAddress"
                />

                <v-btn
                  class="mt-6"
                  type="submit"
                  block
                  large
                  rounded
                  color="primary"
                  :disabled="invalid"
                  >가입하기</v-btn
                >
                <v-btn
                  class="mt-6"
                  type="button"
                  block
                  large
                  rounded
                  color="secondary"
                  @click.stop="dialog = true"
                  >취소</v-btn
                >
                <v-dialog v-model="dialog" max-width="380">
                  <v-card>
                    <v-card-title class="text-h5">
                      회원가입을 취소하시겠습니까?
                    </v-card-title>

                    <v-card-actions>
                      <v-spacer />

                      <v-btn color="blue darken-1" text @click="cancel">
                        확인
                      </v-btn>

                      <v-btn color="gray darken-1" text @click="dialog = false">
                        취소
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Address from '@/components/Address';
import { registerUser } from '@/api/auth';

export default {
  name: 'SignUp',
  components: {
    Address,
  },
  data() {
    return {
      dialog: false,
      username: null,
      email: null,
      password: null,
      passwordConfirm: null,
      name: '',
      phoneNumber: '',
      zonecode: '',
      roadAddress: '',
      address: '',
      detailAddress: '',
      logMessage: '',
    };
  },
  methods: {
    async signUp() {
      const result = await this.$refs.observer.validate();
      if (result) {
        try {
          const userData = {
            username: this.username,
            password: this.password,
            email: this.email,
            name: this.name,
            phoneNumber: this.phoneNumber,
            zoneCode: this.zonecode,
            roadAddress: this.roadAddress,
            address: this.address,
            detailAddress: this.detailAddress,
          };

          console.log(userData);
          const { data } = await registerUser(userData);
          console.log(data.username);
          this.signIn();
          // this.logMessage = `${data.username} 님이 가입되었습니다`;
          //this.initForm();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async signIn() {
      const result = await this.$refs.observer.validate();
      if (result) {
        try {
          // 비즈니스 로직
          const userData = {
            username: this.username,
            password: this.password,
          };
          await this.$store.dispatch('LOGIN', userData);
          this.$router.push('/');
        } catch (error) {
          // 에러 핸들링할 코드
          console.log(error.response.data);
          this.logMessage = error.response.data;
        } finally {
          //this.initForm();
        }
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
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
    cancel() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
