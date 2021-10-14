<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="3">
        <div class="subtitle-1"><v-icon>mdi-map-marker</v-icon> 주소:</div>
      </v-col>
      <v-col>
        <v-row align="center">
          <v-col
            ><v-text-field
              label="우편번호"
              v-model="zonecode"
              hide-details
              required
              readonly
          /></v-col>
          <v-col>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">우편번호 찾기</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5"
                    ><v-icon large color="indigo"> mdi-lead-pencil </v-icon
                    >우편번호 찾기</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <vue-daum-postcode @complete="onComplete" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              label="도로명 주소"
              v-model="roadAddress"
              hide-details
              required
              readonly
          /></v-col>
        </v-row>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              v-model="address"
              label="지번 주소"
              hide-details
              required
              readonly
          /></v-col>
        </v-row>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              :value="detailAddress"
              label="상세 주소"
              hide-details
              required
              clearable
              @change="setDetailAddress"
          /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueDaumPostcode } from 'vue-daum-postcode';

export default {
  components: {
    VueDaumPostcode,
  },
  props: ['zonecode', 'roadAddress', 'address', 'detailAddress'],
  methods: {
    onComplete(result) {
      //this.result = result;
      this.childZonecode = result.zonecode;
      this.childRoadAddress = result.roadAddress;
      this.childAddress = result.address;
      this.dialog = false;

      this.$emit(
        'setAddress',
        this.childZonecode,
        this.childRoadAddress,
        this.childAddress,
      );
    },
    setDetailAddress(value) {
      console.log(value);
      this.$emit('setDetailAddress', value);
    },
  },
  data() {
    return {
      dialog: false,
      result: null,
      childZonecode: null,
      childAddress: null,
      childRoadAddress: null,
      // childDetailAddress: null,
    };
  },
};
</script>

<style></style>
