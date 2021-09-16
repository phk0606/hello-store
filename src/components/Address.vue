<template>
  <div>
    <v-row dense align="center">
      <v-col cols="2">
        <div class="subtitle-1"><v-icon>mdi-map-marker</v-icon> 주소:</div>
      </v-col>
      <v-col>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              v-model="zonecode"
              placeholder="우편번호"
              hide-details
              dense
              solo-inverted
              required
              disabled
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
              v-model="roadAddress"
              placeholder="도로명 주소"
              hide-details
              dense
              solo-inverted
              required
              disabled
          /></v-col>
        </v-row>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              v-model="address"
              placeholder="지번 주소"
              hide-details
              dense
              solo-inverted
              required
              disabled
          /></v-col>
        </v-row>
        <v-row dense align="center">
          <v-col
            ><v-text-field
              v-model="detailAddress"
              placeholder="상세 주소"
              hide-details
              dense
              solo-inverted
              required
              @change="setDetailAddress"
          /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
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
      this.zonecode = result.zonecode;
      this.roadAddress = result.roadAddress;
      this.address = result.address;
      this.dialog = false;

      this.$emit('setAddress', this.zonecode, this.roadAddress, this.address);
    },
    setDetailAddress() {
      this.$emit('setDetailAddress', this.detailAddress);
    },
  },
  data() {
    return {
      dialog: false,
      result: null,
      // zonecode: null,
      // address: null,
      // roadAddress: null,
      // detailAddress: null,
    };
  },
};
</script>

<style></style>
