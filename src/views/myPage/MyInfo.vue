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
                      name="이름"
                      :rules="{ required: true }"
                    >
                      <v-text-field
                        tabindex="1"
                        v-model="name"
                        label="이름"
                        clearable
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
                        tabindex="1"
                        v-model="email"
                        label="이메일"
                        clearable
                        prepend-icon="mdi-email"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-form>
                </validation-observer>
              </v-card-text>
              <v-row dense justify="center">
                <v-col cols="auto"><v-btn>수정</v-btn></v-col>
                <v-col cols="auto"><v-btn>취소</v-btn></v-col>
              </v-row>
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
    return {
      username: '',
      name: '',
      phoneNumber: '',
      email: '',
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
