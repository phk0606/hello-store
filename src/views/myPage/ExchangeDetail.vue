<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          교환/반품 신청
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          hide-default-footer
          v-model="selected"
          :headers="headers"
          :items="exchangeReturnProducts"
          item-key="exchangeReturnProductId"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-container>
              <v-row>
                <v-col>
                  <v-img
                    class="mx-auto"
                    :src="`${imageUrl}${item.fileName}`"
                    style="width: 100px; height: 100px"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:[`item.productName`]="{ item }">
            <v-row>상품명: {{ item.productName }}</v-row>
            <v-row v-if="item.productOptions && item.productOptions.length >= 1"
              >{{ item.productOptions[0].optionName }}:
              {{ item.productOptions[0].optionValue }}</v-row
            >
            <v-row v-if="item.productOptions && item.productOptions.length >= 2"
              >{{ item.productOptions[1].optionName }}:
              {{ item.productOptions[1].optionValue }}</v-row
            >
          </template>
          <template v-slot:[`item.exchangeReturnType`]="{ item }">
            <v-row dense align="center">
              <v-col
                ><v-radio-group
                  v-model="item.exchangeReturnType"
                  dense
                  row
                  hide-details
                  readonly
                >
                  <v-radio value="EXCHANGE" label="교환" />
                  <v-radio
                    class="mr-0"
                    value="RETURN"
                    label="반품"
                  /> </v-radio-group
              ></v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card ref="form">
          <v-container>
            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">사유 선택</div></v-col>
              <v-col
                ><v-radio-group
                  v-model="exchangeReturnReasonType"
                  dense
                  row
                  hide-details
                  readonly
                >
                  <v-radio value="COLOR_SIZE_CHANGE" label="색상/사이즈 변경" />
                  <v-radio value="MIND_CHANGE" label="단순 변심" />
                  <v-radio value="PRODUCT_BROKEN" label="제품 파손" />
                  <v-radio value="MISTAKE_SHIPPING" label="오배송" />
                  <v-radio value="ETC" label="기타" /> </v-radio-group
              ></v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">내용 작성:</div></v-col>
              <v-col
                ><v-textarea
                  v-model="content"
                  hide-details
                  outlined
                  no-resize
                  readonly
              /></v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="2"
                ><div class="subtitle-1">이미지 업로드:</div></v-col
              >
              <v-col>
                <v-row>
                  <!-- <v-col cols="5">
                        <v-file-input
                          dense
                          @change="Preview_image($event, 'image1')"
                          v-model="image1"
                          show-size
                          accept="image/png, image/jpeg, image/bmp"
                        />
                      </v-col> -->
                  <v-col cols="5">
                    <v-img :src="image1Url" max-width="200" max-height="200" />
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col cols="5">
                        <v-file-input
                          dense
                          @change="Preview_image($event, 'image2')"
                          v-model="image2"
                          show-size
                          accept="image/png, image/jpeg, image/bmp"
                        />
                      </v-col> -->
                  <v-col cols="5">
                    <v-img :src="image2Url" max-width="200" max-height="200" />
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col cols="5">
                        <v-file-input
                          dense
                          @change="Preview_image($event, 'image3')"
                          v-model="image3"
                          show-size
                          accept="image/png, image/jpeg, image/bmp"
                        />
                      </v-col> -->
                  <v-col cols="5">
                    <v-img :src="image3Url" max-width="200" max-height="200" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2"><div class="subtitle-1">배송비 결제:</div></v-col>
              <v-col>
                {배송비} 원 ※ 교환/반품 사유가 '사이즈, 색상 변경'. '단순
                변심'의 경우 배송비를 고객님께서 부담하셔야 하므로, [교환/반품
                신청하기] 클릭 시 배송비 결제가 진행됩니다.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto"><v-btn to="/my-page/exchange-list">목록</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createExchangeReturn, getExchangeReturn } from '@/api/exchangeReturn';

export default {
  name: 'ExchangeDetail',
  components: {},
  created() {
    const exchangeReturnId = this.$route.params.exchangeReturnId;
    this.getExchangeReturn(exchangeReturnId);
    this.exchangeReturnId = exchangeReturnId;
  },

  methods: {
    async createExchangeReturn() {
      try {
        const formData = new FormData();

        if (this.image1 != null) {
          formData.append('exchangeReturnImages', this.image1);
        }

        if (this.image2 != null) {
          formData.append('exchangeReturnImages', this.image2);
        }

        if (this.image3 != null) {
          formData.append('exchangeReturnImages', this.image3);
        }

        const exchangeReturnDto = {
          exchangeReturnProducts: this.selected,
          exchangeReturnReasonType: this.exchangeReturnReasonType,
          content: this.content,
        };

        formData.append(
          'exchangeReturnDto',
          new Blob([JSON.stringify(exchangeReturnDto)], {
            type: 'application/json',
          }),
        );

        const response = await createExchangeReturn(formData);
        console.log(response);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getExchangeReturn(exchangeReturnId) {
      try {
        const { data } = await getExchangeReturn({
          exchangeReturnId: exchangeReturnId,
        });
        console.log(data);

        this.exchangeReturnProducts = data.exchangeReturnProducts;
        this.exchangeReturnReasonType = data.exchangeReturnReasonType;
        this.content = data.content;
        if (data.exchangeReturnImages && data.exchangeReturnImages[0]) {
          this.image1Url =
            this.imageUrl + data.exchangeReturnImages[0].fileName;
        }
        if (data.exchangeReturnImages && data.exchangeReturnImages[1]) {
          this.image2Url =
            this.imageUrl + data.exchangeReturnImages[1].fileName;
        }
        if (data.exchangeReturnImages && data.exchangeReturnImages[2]) {
          this.image3Url =
            this.imageUrl + data.exchangeReturnImages[2].fileName;
        }
      } catch (error) {
        console.log(error);
      }
    },
    Preview_image(e, imageTarget) {
      console.log(imageTarget);
      if (e !== null) {
        if (imageTarget === 'image1') {
          this.image1Url = URL.createObjectURL(this.image1);
        } else if (imageTarget === 'image2') {
          this.image2Url = URL.createObjectURL(this.image2);
        } else if (imageTarget === 'image3') {
          this.image3Url = URL.createObjectURL(this.image3);
        }
      } else {
        if (imageTarget === 'image1') {
          this.image1Url = null;
        } else if (imageTarget === 'image2') {
          this.image2Url = null;
        } else if (imageTarget === 'image3') {
          this.image3Url = null;
        }
      }
    },
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      content: '',
      image1: null,
      image2: null,
      image3: null,
      image1Url: null,
      image2Url: null,
      image3Url: null,

      exchangeReturnReasonType: 'COLOR_SIZE_CHANGE',
      exchangeReturnId: '',
      headers: [
        { text: '번호', align: 'center', value: 'exchangeReturnProductId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'productName' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '교환/반품', align: 'center', value: 'exchangeReturnType' },
      ],
      exchangeReturnProducts: [],
      selected: [],
      items: [
        {
          text: '주문 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '교환/반품',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: '상세 보기',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
};
</script>

<style></style>
