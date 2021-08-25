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
                ><v-text-field hide-details dense outlined required suffix="원"
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
                <v-radio-group dense row hide-details>
                  <v-radio value="1" label="기본 포인트 적용" />
                  <v-radio
                    class="mr-0"
                    value="1"
                    label="별도 포인트 적용: 판매 가격의"
                  />
                  <v-col cols="2"
                    ><v-text-field dense hide-details outlined suffix="%"
                  /></v-col>
                  <v-radio value="1" label="포인트 없음" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">*배송비: </v-col>
              <v-col cols="10">
                <v-radio-group dense row hide-details>
                  <v-radio value="1" label="기본 배송비 적용" />
                  <v-radio class="mr-0" value="1" label="별도 배송비 적용: " />
                  <v-col cols="2"
                    ><v-text-field dense hide-details outlined suffix="원"
                  /></v-col>
                  <v-radio value="1" label="무료 배송" />
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
                >상품 정보:
                <!-- <v-radio-group dense hide-details>
                  <v-radio value="1" label="미사용" />
                  <v-radio value="1" label="사용" />
                </v-radio-group> -->
              </v-col>
              <v-col cols="10">
                <!-- <v-row dense>
                  <v-col cols="auto">
                    <v-btn small>추가</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn small>삭제</v-btn>
                  </v-col>
                </v-row>
                <v-divider /> -->
                <v-row align="center" dense>
                  <!-- <v-col cols="auto">
                    <v-checkbox hide-details dense />
                  </v-col> -->
                  <!-- <v-col>
                    <v-text-field label="항목명" dense hide-details outlined />
                  </v-col> -->
                  <v-col>
                    <v-text-field label="설명" dense hide-details outlined />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2"
                >옵션:
                <!-- <v-radio-group dense hide-details>
                  <v-radio value="1" label="미사용" />

                  <v-radio value="1" label="사용" />
                </v-radio-group> -->
              </v-col>
              <v-col cols="10">
                <v-row dense>
                  <!-- <v-col cols="auto">
                    <v-btn small>추가</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn small>삭제</v-btn>
                  </v-col> -->
                  <v-col cols="auto">
                    <v-checkbox hide-details dense label="사용여부" />
                  </v-col>
                  <v-col>
                    <v-text-field label="옵션명" dense hide-details outlined />
                  </v-col>
                  <v-col>
                    <v-text-field label="설명" dense hide-details outlined />
                  </v-col>
                </v-row>
                <v-divider />
                <v-row dense align="center">
                  <v-col cols="auto">
                    <v-checkbox hide-details dense label="사용여부" />
                  </v-col>
                  <v-col>
                    <v-text-field label="옵션명" dense hide-details outlined />
                  </v-col>
                  <v-col>
                    <v-text-field label="설명" dense hide-details outlined />
                  </v-col>
                  <!-- <v-col>
                    <v-text-field label="가격" dense hide-details outlined />
                  </v-col> -->
                  <!-- <v-col>
                    <v-row justify="center">
                      <v-btn small>항목 추가</v-btn>
                    </v-row>
                    <v-row class="mt-5" />
                    <v-row justify="center">
                      <v-btn small>항목 삭제</v-btn>
                    </v-row>
                  </v-col> -->
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <span><v-icon>mdi-drag-vertical-variant</v-icon>상품 소개 글</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          label="25자 이내로 소개글을 입력하세요."
          dense
          hide-details
          outlined
        />
      </v-col>
    </v-row> -->
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
        <v-radio-group dense row hide-details>
          <v-radio value="1" label="진열" />
          <v-radio class="mr-0" value="1" label="숨김" />
          <v-radio value="1" label="품절" />
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
export default {
  name: 'ProductRegist',
  data() {
    return {
      category1Select: null,
      category2Select: null,
      category1: ['OUTER', 'TOP', 'BOTTOM', 'DRESS'],
      category2: ['OUTER', 'TOP', 'BOTTOM', 'DRESS'],
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
    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
      }
    },
    changeCategory1(a) {
      console.log(a);
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
