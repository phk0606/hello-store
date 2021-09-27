<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              비밀번호 변경
            </v-chip>
          </v-col>
        </v-row>
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
                  name="현재의 비밀번호"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="1"
                    v-model="password"
                    label="현재의 비밀번호"
                    type="password"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="새로운 비밀번호"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="1"
                    v-model="newPassword"
                    label="새로운 비밀번호"
                    type="password"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="새로운 비밀번호 확인"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    tabindex="1"
                    v-model="newPasswordConfirm"
                    label="새로운 비밀번호 확인"
                    type="password"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-form>
            </validation-observer>
          </v-card-text>
          <v-row dense justify="center">
            <v-col cols="auto"
              ><v-btn @click="modifyPassword">수정</v-btn></v-col
            >
            <v-col cols="auto"
              ><v-btn to="/my-page/order-list">취소</v-btn></v-col
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { modifyPassword } from '@/api/user';

export default {
  created() {},
  components: {},
  data() {
    return {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  },
  methods: {
    async modifyPassword() {
      try {
        const userDto = {
          password: this.password,
          newPassword: this.newPassword,
          username: this.$store.state.username,
        };
        console.log(userDto);
        const { data } = await modifyPassword(userDto);
        console.log(data);
        this.password = '';
        this.newPassword = '';
        this.newPasswordConfirm = '';
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
