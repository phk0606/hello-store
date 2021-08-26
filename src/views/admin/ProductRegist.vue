<template>
  <v-container fluid>
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
    <v-row />
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical</v-icon>상품 등록</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>상품 정보 입력</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="category1Select"
          :items="category1"
          label="카테고리 선택"
          outlined
          dense
          hide-details
          @change="changeCategory1"
          :menu-props="{ offsetY: true }"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          :items="category2"
          label="카테고리 선택"
          outlined
          dense
          hide-details
          :menu-props="{ offsetY: true }"
        />
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="상품명"
          placeholder="상품명을 입력하세요."
          outlined
          hide-details
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="">
        <v-card ref="form">
          <v-card-text>
            <v-row dense align="center">
              <v-col cols="12" class="d-flex"
                ><v-text-field
                  hide-details
                  dense
                  outlined
                  required
                  suffix="원"
                  class="mr-5"
                  ><template v-slot:prepend>
                    <v-card width="80" flat>판매 가격:</v-card></template
                  >
                </v-text-field>
                <v-text-field
                  hide-details
                  dense
                  outlined
                  required
                  suffix="원"
                  class="mr-5"
                  ><template v-slot:prepend
                    ><v-card width="80" flat>정상 가격:</v-card></template
                  > </v-text-field
                ><v-text-field hide-details dense outlined required suffix="개"
                  ><template v-slot:prepend
                    ><v-card width="110" flat>최대 구매 개수:</v-card></template
                  >
                </v-text-field></v-col
              >
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">*적립 포인트: </v-col>
              <v-col cols="10">
                <v-radio-group v-model="pointRadio" dense row hide-details>
                  <v-radio value="default" label="기본 포인트 적용" />
                  <v-radio
                    class="mr-0"
                    value="each"
                    label="별도 포인트 적용: 판매 가격의"
                  />
                  <v-col cols="2"
                    ><v-text-field dense hide-details outlined suffix="%"
                  /></v-col>
                  <v-radio value="empty" label="포인트 없음" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">*배송비: </v-col>
              <v-col cols="10">
                <v-radio-group
                  v-model="shippingFeeRadio"
                  dense
                  row
                  hide-details
                >
                  <v-radio value="default" label="기본 배송비 적용" />
                  <v-radio class="mr-0" value="2" label="별도 배송비 적용: " />
                  <v-col cols="each"
                    ><v-text-field dense hide-details outlined suffix="원"
                  /></v-col>
                  <v-radio value="free" label="무료 배송" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">상품 특성: </v-col>
              <v-col cols="10" class="d-flex">
                <v-checkbox dense hide-details label="신상품" class="mr-2" />
                <v-checkbox dense hide-details label="BEST" class="mr-2" />
                <v-checkbox dense hide-details label="할인" />
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2"
                >옵션:
                <v-radio-group v-model="optionRadio" dense hide-details>
                  <v-radio value="N" label="미사용" />

                  <v-radio value="Y" label="사용" />
                </v-radio-group>
              </v-col>
              <v-col cols="10">
                <v-row dense align="center">
                  <v-col cols="auto"> 옵션 1: </v-col>
                  <v-col cols="8">
                    <div v-for="(firstOption, i) in firstOptions" :key="i">
                      <v-row dense align="center">
                        <v-col>
                          <v-text-field
                            v-model="firstOption.value1"
                            label="옵션명"
                            placeholder="예: 색상"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="firstOption.value2"
                            label="옵션값"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col cols="auto">
                          <v-btn @click="firstOptionRemove(i)" small
                            >삭제</v-btn
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col>
                    <v-container>
                      <v-row justify="center">
                        <v-btn small @click="firstOptionAdd">항목 추가</v-btn>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row dense align="center">
                  <v-col cols="auto"> 옵션 2: </v-col>
                  <v-col cols="8">
                    <div v-for="(secondOption, i) in secondOptions" :key="i">
                      <v-row dense align="center">
                        <v-col>
                          <v-text-field
                            v-model="secondOption.value1"
                            label="옵션명"
                            placeholder="예: 색상"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="secondOption.value2"
                            label="옵션값"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col cols="auto">
                          <v-btn @click="secondOptionRemove(i)" small
                            >삭제</v-btn
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col>
                    <v-container>
                      <v-row justify="center">
                        <v-btn small @click="secondOptionAdd">항목 추가</v-btn>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>상품 소개 글</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="description"
          label="25자 이내로 소개글을 입력하세요."
          dense
          hide-details
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        *리스트 이미지
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        *상품 대표 이미지
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        메인 노출 이미지
        <v-file-input dense @change="Preview_image" v-model="image" show-size />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>상품 상세 정보</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea hide-details dense filled />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>배송 안내</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea hide-details dense filled />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>교환 및 반품 안내</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea hide-details dense filled />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        상품 노출 여부:
        <v-radio-group v-model="showRadio" dense row hide-details>
          <v-radio value="show" label="진열" />
          <v-radio class="mr-0" value="hide" label="숨김" />
          <v-radio value="soldout" label="품절" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn>등록</v-btn>
      </v-col>
      <v-col>
        <v-btn>취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getProductCategory } from '@/api/category';

export default {
  name: 'ProductRegist',
  created() {
    this.getProductCategory();
  },
  data() {
    return {
      description: '',
      firstOptions: [
        {
          value1: '',
          value2: '',
        },
      ],
      secondOptions: [
        {
          value1: '',
          value2: '',
        },
      ],
      optionRadio: 'Y',
      showRadio: 'show',
      pointRadio: 'default',
      shippingFeeRadio: 'default',
      category1Select: null,
      category2Select: null,
      category1: [],
      category2: [],
      image: null,
      items1: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품 등록',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    firstOptionAdd() {
      this.firstOptions.push({
        value1: '',
        value2: '',
      });
    },
    secondOptionAdd() {
      this.secondOptions.push({
        value1: '',
        value2: '',
      });
    },
    firstOptionRemove(index) {
      this.firstOptions.splice(index, 1);
    },
    secondOptionRemove(index) {
      this.secondOptions.splice(index, 1);
    },
    async getProductCategory() {
      const { data } = await getProductCategory({
        parentId: this.category1Select,
      });
      if (this.category1Select == null) {
        this.category1 = data;
      } else {
        this.category2 = data;
      }
    },
    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
      }
    },
    changeCategory1() {
      this.getProductCategory();
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
</style>
