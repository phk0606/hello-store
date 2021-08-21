<template>
  <v-container>
    <h5>주문 내역</h5>
    <v-divider />
    <v-row>
      <v-col cols="auto"> 주문 기간 </v-col>
      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu = false" />
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date2"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="menu2 = false" />
        </v-menu>
      </v-col>
      <v-col>
        <v-btn>조회</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn>당일</v-btn>
        <v-btn>1주일</v-btn>
        <v-btn>3주일</v-btn>
        <v-btn>1개월</v-btn>
        <v-btn>3개월</v-btn>
      </v-col>
      <v-col> 최근 1년 이내 주문 내역만 확인할 수 있습니다. </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <template>
            <v-row>
              <v-col cols="auto">
                10. 주문 일시 2021-08-12 12:15:15 주문번호: 1454460561166
              </v-col>
              <v-col>
                <v-btn>주문 상세 내역</v-btn>
                <v-btn>주문 취소</v-btn>
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-img
                  max-width="100"
                  src="https://image.brandi.me/cproduct/2021/07/26/SB000000000034658761_1627287656_image1_S.jpeg"
                />
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
            max-width="100"
            src="https://image.brandi.me/cproduct/2021/07/26/SB000000000034658761_1627287656_image1_S.jpeg"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
            max-width="100"
            src="https://image.brandi.me/cproduct/2021/07/26/SB000000000034658761_1627287656_image1_S.jpeg"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderInfo',
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
    };
  },
};
</script>

<style></style>
