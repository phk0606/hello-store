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
              <v-form @submit.prevent="signUp">
                <div class="text-h4 font-weight-black">회원가입</div>
                <validation-provider
                  v-slot="{ errors }"
                  name="이름"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    v-model="username"
                    label="이름"
                    clearable
                    prepend-icon="mdi-account"
                    :error-messages="errors"
                  />
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="이메일"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    v-model="email"
                    label="이메일"
                    clearable
                    prepend-icon="mdi-email"
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
                <validation-provider
                  v-slot="{ errors }"
                  name="비밀번호 확인"
                  :rules="{ required: true, confirmed: '비밀번호' }"
                >
                  <v-text-field
                    v-model="passwordConfirm"
                    label="비밀번호 확인"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>

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
export default {
  name: 'SignUp',
  data() {
    return {
      dialog: false,
      username: null,
      email: null,
      password: null,
      passwordConfirm: null,
    };
  },
  methods: {
    async signUp() {
      const result = await this.$refs.observer.validate();
      if (result) {
        alert('회원가입 프로세스');
      }
    },
    cancel() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
