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
              교환/반품 신청
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> 접수일: {{ createdDate }} </v-col>
          <v-col cols="3">주문 번호: {{ orderId }}</v-col>
          <v-col cols="3"> 신청인: {{ name }}</v-col>
          <v-col cols="3"> 처리 완료일: </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto"> 처리 상태: </v-col>
          <v-col cols="3">
            <v-select
              v-model="exchangeReturnStatus"
              label="처리 상태"
              :items="exchangeReturnStates"
              clearable
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
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
              <template v-slot:[`item.productName`]="{ item, index }">
                <v-container>
                  <v-row class="text-left"
                    ><v-col> 상품명: {{ item.productName }}</v-col></v-row
                  >
                  <v-row
                    dense
                    class="text-left"
                    v-if="
                      item.productOptions && item.productOptions.length >= 1
                    "
                    ><v-col
                      >{{ item.productOptions[0].optionName }}:
                      {{ item.productOptions[0].optionValue }}</v-col
                    ></v-row
                  >
                  <v-row
                    dense
                    class="text-left"
                    v-if="
                      item.productOptions && item.productOptions.length >= 2
                    "
                    ><v-col
                      >{{ item.productOptions[1].optionName }}:
                      {{ item.productOptions[1].optionValue }}</v-col
                    ></v-row
                  >
                  <div
                    v-if="
                      item.exchangeReturnType === 'EXCHANGE' && !item.newOrderId
                    "
                  >
                    <v-divider />
                    <v-row class="text-left"
                      ><v-col><h6>교환 옵션</h6></v-col></v-row
                    >
                    <v-row
                      v-if="
                        item.firstOptions && item.firstOptions[0].optionValue
                      "
                      dense
                      align="center"
                    >
                      <v-col cols="auto"
                        ><div class="mr-3">
                          {{ item.firstOptions[0].optionName }}:
                        </div></v-col
                      >
                      <v-col cols="8">
                        <v-select
                          label="항목선택"
                          v-model="item.newFirstOption"
                          :items="item.firstOptions"
                          item-text="optionValue"
                          item-value="optionValue"
                          hide-details
                          outlined
                          dense
                          :menu-props="{ offsetY: true }"
                          return-object
                          @change="getSecondOptionsInStockQuantity(item, index)"
                        />
                      </v-col>
                    </v-row>
                    <v-row
                      v-if="
                        item.secondOptions.length > 0 &&
                        item.secondOptions[0].optionValue
                      "
                      dense
                      align="center"
                    >
                      <v-col cols="auto"
                        ><div>
                          {{ item.secondOptions[0].optionName }}:
                        </div></v-col
                      >
                      <v-col cols="8">
                        <v-select
                          label="항목선택"
                          v-model="item.newSecondOption"
                          :items="item.secondOptions"
                          item-text="optionValue"
                          item-value="optionValue"
                          hide-details
                          outlined
                          dense
                          :menu-props="{ offsetY: true }"
                          return-object
                        >
                          <template slot="selection" slot-scope="data">
                            <span class="mr-5">{{
                              data.item.optionValue
                            }}</span>
                            <span>(남음: {{ data.item.stockQuantity }})</span>
                          </template>
                          <template slot="item" slot-scope="data">
                            <span class="mr-5">{{
                              data.item.optionValue
                            }}</span>
                            <span>(남음: {{ data.item.stockQuantity }})</span>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
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
              <template v-slot:[`item.process`]="{ item }">
                <v-row dense align="center">
                  <v-col v-if="item.newOrderId">
                    처리 주문 번호: {{ item.newOrderId }}
                  </v-col>
                  <v-col v-else>
                    <v-btn
                      v-if="item.exchangeReturnType === 'EXCHANGE'"
                      @click="createExchangeReturnOrder(item)"
                      >교환 처리</v-btn
                    >
                    <v-btn v-else @click="createExchangeReturnOrder(item)"
                      >반품 처리</v-btn
                    >
                  </v-col>
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
                  <v-col cols="2"
                    ><div class="subtitle-1">사유 선택</div></v-col
                  >
                  <v-col
                    ><v-radio-group
                      v-model="exchangeReturnReasonType"
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
                      outlined
                      no-resize
                  /></v-col>
                </v-row>
                <v-divider />
                <v-row>
                  <v-col cols="2"><div class="subtitle-1">이미지:</div></v-col>
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
                        <v-img
                          :src="image1Url"
                          max-width="200"
                          max-height="200"
                        />
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
                        <v-img
                          :src="image2Url"
                          max-width="200"
                          max-height="200"
                        />
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
                        <v-img
                          :src="image3Url"
                          max-width="200"
                          max-height="200"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider />
                <!-- <v-row dense align="center">
                  <v-col cols="2"
                    ><div class="subtitle-1">배송비 결제:</div></v-col
                  >
                  <v-col>
                    {배송비} 원 ※ 교환/반품 사유가 '사이즈, 색상 변경'. '단순
                    변심'의 경우 배송비를 고객님께서 부담하셔야 하므로,
                    [교환/반품 신청하기] 클릭 시 배송비 결제가 진행됩니다.
                  </v-col>
                </v-row>
                <v-divider /> -->
                <v-row dense align="center">
                  <v-col cols="2"
                    ><div class="subtitle-1">처리 사항 메모:</div></v-col
                  >
                  <v-col
                    ><v-textarea v-model="memo" hide-details outlined no-resize
                  /></v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="end">
          <v-col cols="auto"
            ><v-btn to="/admin/exchange-list">목록</v-btn></v-col
          >
          <v-col cols="auto"
            ><v-btn @click="modifyExchangeReturn">저장</v-btn></v-col
          >
          <v-col cols="auto"
            ><v-btn @click="removeExchangeReturn">삭제하기</v-btn></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminOrderLeft from '@/components/admin/AdminOrderLeft.vue';
import {
  getExchangeReturn,
  removeExchangeReturn,
  modifyExchangeReturn,
} from '@/api/exchangeReturn';

import { getSecondOptionsInStockQuantity } from '@/api/stockQuantity';
import { createExchangeReturnOrder } from '@/api/order';

export default {
  name: 'ExchangeDetail',
  components: {
    AdminOrderLeft,
  },
  created() {
    const exchangeReturnId = this.$route.params.exchangeReturnId;
    this.getExchangeReturn(exchangeReturnId);
    this.exchangeReturnId = exchangeReturnId;
  },

  methods: {
    async createExchangeReturnOrder(item) {
      console.log(item);

      // 교환: 기존 상품 재고 증가, 변경 상품 재고 감소
      //       기존 상품 조회 후 옵션 변경 이외 동일 내용으로 교환 주문 생성
      // 반품: 기존 상품 재고 증가, 사용자 포인트 감소
      //       기존 상품 조회 후 동일 내용으로 반품 주문 생성
      const exchangeReturnOrderDto = {
        exchangeReturnProductId: item.exchangeReturnProductId,
        username: this.username,
        orderId: this.orderId,
        productId: item.productId,
        orderProductId: item.orderProductId,
        newFirstOptionId:
          item.exchangeReturnType === 'EXCHANGE' ? item.newFirstOption.id : '',
        newSecondOptionId:
          item.exchangeReturnType === 'EXCHANGE' ? item.newSecondOption.id : '',
        orderType: item.exchangeReturnType,
      };

      console.log(exchangeReturnOrderDto);

      try {
        const { data } = await createExchangeReturnOrder(
          exchangeReturnOrderDto,
        );
        console.log(data);

        alert(item.exchangeReturnTypeValue + ' 처리 되었습니다.');
        this.getExchangeReturn(this.exchangeReturnId);

        // this.$router.push(`/style-shop/order-complete/${data}`);
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
        if (message === '재고 부족') {
          alert('재고 수량을 초과하였습니다.');
          return;
        }
      }
    },
    async getSecondOptionsInStockQuantity(item, index) {
      console.log(item, index);
      try {
        const { data } = await getSecondOptionsInStockQuantity({
          productId: item.productId,
          firstOptionId: item.newFirstOption.id,
        });
        this.exchangeReturnProducts[index].secondOptions = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async removeExchangeReturn() {
      try {
        await removeExchangeReturn({
          exchangeReturnId: this.exchangeReturnId,
        });
        //console.log(data);
        alert('교환/반품 신청이 삭제되었습니다.');
        this.$router.push('/admin/exchange-list');
      } catch (error) {
        console.log(error);
      }
    },
    async modifyExchangeReturn() {
      try {
        const { data } = await modifyExchangeReturn({
          exchangeReturnId: this.exchangeReturnId,
          exchangeReturnStatus: this.exchangeReturnStatus,
          exchangeReturnReasonType: this.exchangeReturnReasonType,
          content: this.content,
          memo: this.memo,
        });
        console.log(data);

        alert('교환/반품 신청이 수정 되었습니다.');
        this.$router.push('/admin/exchange-list');
      } catch (error) {
        console.error(error);
      }
    },
    async getExchangeReturn(exchangeReturnId) {
      try {
        const { data } = await getExchangeReturn({
          exchangeReturnId: exchangeReturnId,
        });
        console.log(data);
        this.exchangeReturnStatus = data.exchangeReturnStatus;
        this.exchangeReturnProducts = data.exchangeReturnProducts;
        this.exchangeReturnReasonType = data.exchangeReturnReasonType;
        this.createdDate = data.createdDate;
        this.orderId = data.orderId;
        this.username = data.username;
        this.name = data.name;
        this.userNo = data.userNo;
        this.content = data.content;
        this.memo = data.memo;
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
      newFirstProductOptions: [],
      newSecondProductOptions: [],
      createdDate: '',
      orderId: '',
      username: '',
      name: '',
      userNo: '',
      content: '',
      memo: '',
      image1: null,
      image2: null,
      image3: null,
      image1Url: null,
      image2Url: null,
      image3Url: null,
      exchangeReturnStatus: '',
      exchangeReturnStates: [
        { text: '신청', value: 'REQUESTED' },
        { text: '처리 중', value: 'PROCESSING' },
        { text: '처리 완료', value: 'FINISHED' },
      ],
      exchangeReturnReasonType: 'COLOR_SIZE_CHANGE',
      exchangeReturnId: '',
      headers: [
        { text: '번호', align: 'center', value: 'exchangeReturnProductId' },
        { text: '이미지', align: 'center', sortable: false, value: 'image' },
        {
          text: '상품 정보',
          align: 'center',
          value: 'productName',
          width: '30%',
        },
        { text: '판매 가격', align: 'center', value: 'salePrice' },
        { text: '수량', align: 'center', value: 'quantity' },
        { text: '포인트', align: 'center', value: 'point' },
        { text: '교환/반품', align: 'center', value: 'exchangeReturnType' },
        { text: '처리', align: 'center', value: 'process' },
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
