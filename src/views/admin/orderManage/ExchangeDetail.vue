<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-order-left />
      </v-col>
      <v-col cols="10">
        <v-row dense align="center">
          <v-col cols="auto">
            <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
          </v-col>
          <v-col cols="">
            <v-breadcrumbs :items="items" class="pa-0">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label x-large color="white">
              <v-icon left> mdi-chevron-right-box </v-icon>
              교환/환불 신청
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="exchangeRefundProducts"
              item-key="exchangeRefundProductId"
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
                <v-row
                  v-if="item.productOptions && item.productOptions.length >= 1"
                  >{{ item.productOptions[0].optionName }}:
                  {{ item.productOptions[0].optionValue }}</v-row
                >
                <v-row
                  v-if="item.productOptions && item.productOptions.length >= 2"
                  >{{ item.productOptions[1].optionName }}:
                  {{ item.productOptions[1].optionValue }}</v-row
                >
              </template>
              <template v-slot:[`item.exchangeRefundType`]="{ item }">
                <v-row dense align="center">
                  <v-col
                    ><v-radio-group
                      v-model="item.exchangeRefundType"
                      dense
                      row
                      hide-details
                    >
                      <v-radio value="EXCHANGE" label="교환" />
                      <v-radio
                        class="mr-0"
                        value="REFUND"
                        label="환불"
                      /> </v-radio-group
                  ></v-col>
                </v-row>
              </template>
            </v-data-table>
            <v-divider />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card ref="form">
              <v-container>
                <v-row dense align="center">
                  <v-col cols="2"
                    ><div class="subtitle-1">사유 선택</div></v-col
                  >
                  <v-col
                    ><v-radio-group
                      v-model="exchangeRefundReasonType"
                      dense
                      row
                      hide-details
                    >
                      <v-radio
                        value="COLOR_SIZE_CHANGE"
                        label="색상/사이즈 변경"
                      />
                      <v-radio value="MIND_CHANGE" label="단순 변심" />
                      <v-radio value="PRODUCT_BROKEN" label="제품 파손" />
                      <v-radio value="MISTAKE_SHIPPING" label="오배송" />
                      <v-radio value="ETC" label="기타" /> </v-radio-group
                  ></v-col>
                </v-row>
                <v-divider />
                <v-row dense align="center">
                  <v-col cols="2"
                    ><div class="subtitle-1">내용 작성:</div></v-col
                  >
                  <v-col
                    ><v-textarea
                      v-model="content"
                      hide-details
                      dense
                      filled
                      no-resize
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
                        <v-img :src="image1Url" width="200" height="200" />
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
                        <v-img :src="image2Url" width="200" height="200" />
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
                        <v-img :src="image3Url" width="200" height="200" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row dense align="center">
                  <v-col cols="2"
                    ><div class="subtitle-1">배송비 결제:</div></v-col
                  >
                  <v-col>
                    {배송비} 원 ※ 교환/환불 사유가 '사이즈, 색상 변경'. '단순
                    변심'의 경우 배송비를 고객님께서 부담하셔야 하므로,
                    [교환/환불 신청하기] 클릭 시 배송비 결제가 진행됩니다.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto"
            ><v-btn to="/admin/exchange-list">목록</v-btn></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';
import { createExchangeRefund, getExchangeRefund } from '@/api/exchangeRefund';

export default {
  name: 'ExchangeDetail',
  components: {
    AdminOrderLeft,
  },
  created() {
    const exchangeRefundId = this.$route.params.exchangeRefundId;
    this.getExchangeRefund(exchangeRefundId);
    this.exchangeRefundId = exchangeRefundId;
  },

  methods: {
    async createExchangeRefund() {
      try {
        const formData = new FormData();

        if (this.image1 != null) {
          formData.append('exchangeRefundImages', this.image1);
        }

        if (this.image2 != null) {
          formData.append('exchangeRefundImages', this.image2);
        }

        if (this.image3 != null) {
          formData.append('exchangeRefundImages', this.image3);
        }

        const exchangeRefundDto = {
          exchangeRefundProducts: this.selected,
          exchangeRefundReasonType: this.exchangeRefundReasonType,
          content: this.content,
        };

        formData.append(
          'exchangeRefundDto',
          new Blob([JSON.stringify(exchangeRefundDto)], {
            type: 'application/json',
          }),
        );

        const response = await createExchangeRefund(formData);
        console.log(response);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getExchangeRefund(exchangeRefundId) {
      try {
        const { data } = await getExchangeRefund({
          exchangeRefundId: exchangeRefundId,
        });
        console.log(data);

        this.exchangeRefundProducts = data.exchangeRefundProducts;
        this.exchangeRefundReasonType = data.exchangeRefundReasonType;
        this.content = data.content;
        this.image1Url = this.imageUrl + data.exchangeRefundImages[0].fileName;
        this.image2Url = this.imageUrl + data.exchangeRefundImages[1].fileName;
        this.image3Url = this.imageUrl + data.exchangeRefundImages[2].fileName;
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

      exchangeRefundReasonType: 'COLOR_SIZE_CHANGE',
      exchangeRefundId: '',
      headers: [
        { text: '번호', align: 'center', value: 'exchangeRefundProductId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        { text: '상품 정보', align: 'center', value: 'productName' },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '교환/환불', align: 'center', value: 'exchangeRefundType' },
      ],
      exchangeRefundProducts: [],
      selected: [],
      items: [
        {
          text: '주문 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '교환/환불',
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
