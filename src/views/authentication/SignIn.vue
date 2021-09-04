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
        <v-card width="460">
          <v-card-text class="text-center px-12 py-16">
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form @submit.prevent="signIn">
                <div class="text-h4 font-weight-black">로그인</div>
                <validation-provider
                  v-slot="{ errors }"
                  name="아이디"
                  :rules="{ required: true }"
                >
                  <v-text-field
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
                    v-model="password"
                    label="비밀번호"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <v-btn
                  type="submit"
                  class="mt-6"
                  block
                  x-large
                  rounded
                  color="primary"
                  :disabled="invalid"
                  >로그인</v-btn
                >
                <div class="mt-5">
                  <router-link class="text-decoration-none" to="/"
                    >홈</router-link
                  >
                  |
                  <router-link
                    class="text-decoration-none"
                    to="/authentication/sign-up"
                    >회원가입</router-link
                  >
                  |
                  <router-link
                    class="text-decoration-none"
                    to="/authentication/sign-up"
                    >ID/비밀번호 찾기</router-link
                  >
                </div>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
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
          //this.$router.push('/main');
        } catch (error) {
          // 에러 핸들링할 코드
          console.log(error.response.data);
          this.logMessage = error.response.data;
        } finally {
          //this.initForm();
        }
      }
    },
    // initForm() {
    //   this.username = '';
    //   this.password = '';
    // },
  },
};
</script>

<style></style>
