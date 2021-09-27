<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              아이디/비밀번호 찾기
            </v-chip>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-tabs
              v-model="tab"
              background-color="blue-grey"
              slider-color="red"
              dark
            >
              <v-tab href="#tab-1"> 아이디 찾기 </v-tab>
              <v-tab href="#tab-2"> 비밀번호 찾기 </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-card flat>
                        <v-chip label x-large color="white">
                          <v-icon left> mdi-circle-medium </v-icon>
                          가입 시 등록하신 정보를 입력해 주세요.
                        </v-chip>
                        <v-row align="center" dense>
                          <v-col cols="2" class="text-right">이름</v-col>
                          <v-col cols="auto">
                            <v-text-field
                              v-model="name"
                              dense
                              hide-details
                              outlined
                            />
                          </v-col>
                          <v-col
                            ><v-btn @click="getUsername">확인</v-btn></v-col
                          >
                        </v-row>
                        <v-row align="center" dense>
                          <v-col cols="2" class="text-right">이메일 주소</v-col>
                          <v-col cols="auto">
                            <v-text-field
                              v-model="email"
                              dense
                              hide-details
                              outlined
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col> 아이디 조회 결과 {{ username }} </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-card flat>
                        <v-chip label x-large color="white">
                          <v-icon left> mdi-circle-medium </v-icon>
                          가입 시 등록하신 정보를 입력해 주세요. (이메일로 임시
                          비밀번호 발송)
                        </v-chip>
                        <v-row align="center" dense>
                          <v-col cols="2" class="text-right">이름</v-col>
                          <v-col cols="auto">
                            <v-text-field
                              v-model="name"
                              dense
                              hide-details
                              outlined
                            />
                          </v-col>
                          <v-col><v-btn>확인</v-btn></v-col>
                        </v-row>
                        <v-row align="center" dense>
                          <v-col cols="2" class="text-right">아이디</v-col>
                          <v-col cols="auto">
                            <v-text-field
                              v-model="email"
                              dense
                              hide-details
                              outlined
                            />
                          </v-col>
                        </v-row>
                        <v-row align="center" dense>
                          <v-col cols="2" class="text-right">이메일 주소</v-col>
                          <v-col cols="auto">
                            <v-text-field
                              v-model="email"
                              dense
                              hide-details
                              outlined
                            />
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getUsername } from '@/api/user';

export default {
  created() {},
  components: {},
  data() {
    return {
      username: '',
      name: '',
      email: '',
      tab: null,
    };
  },
  methods: {
    async getUsername() {
      try {
        const { data } = await getUsername({
          name: this.name,
          email: this.email,
        });
        console.log(data);
        this.username = data;
      } catch (error) {
        console.error(error);
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
