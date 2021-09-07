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
    <v-row dense>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-chevron-right-box </v-icon>
          상품 수정
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-chip label large color="white">
          <v-icon left> mdi-record </v-icon>
          상품 정보 입력
        </v-chip>
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
          @change="changeCategory"
          :menu-props="{ offsetY: true }"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="category2Select"
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
          v-model="name"
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
                  v-model="salePrice"
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
                  v-model="regularPrice"
                  hide-details
                  dense
                  outlined
                  required
                  suffix="원"
                  class="mr-5"
                  ><template v-slot:prepend
                    ><v-card width="80" flat>정상 가격:</v-card></template
                  >
                </v-text-field>
                <v-text-field
                  v-model="stockQuantity"
                  hide-details
                  dense
                  outlined
                  required
                  suffix="개"
                  class="mr-5"
                  ><template v-slot:prepend
                    ><v-card width="80" flat>재고 수량:</v-card></template
                  >
                </v-text-field>
                <v-text-field
                  v-model="maxPurchaseQuantity"
                  hide-details
                  dense
                  outlined
                  required
                  suffix="개"
                  ><template v-slot:prepend
                    ><v-card width="120" flat>최대 구매 개수:</v-card></template
                  >
                </v-text-field></v-col
              >
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">*적립 포인트: </v-col>
              <v-col cols="10">
                <v-radio-group v-model="pointRadio" dense row hide-details>
                  <v-radio value="DEFAULT" label="기본 포인트 적용" />
                  <v-radio
                    class="mr-0"
                    value="EACH"
                    label="별도 포인트 적용: 판매 가격의"
                  />
                  <v-col cols="2"
                    ><v-text-field
                      v-model="pointPerPrice"
                      dense
                      hide-details
                      outlined
                      suffix="%"
                  /></v-col>
                  <v-radio value="EMPTY" label="포인트 없음" />
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
                  <v-radio value="DEFAULT" label="기본 배송비 적용" />
                  <v-radio
                    class="mr-0"
                    value="EACH"
                    label="별도 배송비 적용: "
                  />
                  <v-col cols="EACH"
                    ><v-text-field
                      v-model="eachShippingFee"
                      dense
                      hide-details
                      outlined
                      suffix="원"
                  /></v-col>
                  <v-radio value="FREE" label="무료 배송" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">상품 특성: </v-col>
              <v-col cols="10" class="d-flex">
                <v-checkbox
                  v-model="newArrival"
                  dense
                  hide-details
                  label="신상품"
                  class="mr-2"
                />
                <v-checkbox
                  v-model="best"
                  dense
                  hide-details
                  label="BEST"
                  class="mr-2"
                />
                <v-checkbox
                  v-model="discount"
                  dense
                  hide-details
                  label="할인"
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row dense align="center">
              <v-col cols="2">옵션: </v-col>
              <v-col cols="10">
                <v-row dense align="center">
                  <v-col cols="auto"> 옵션 1: </v-col>
                  <v-col cols="8">
                    <div v-for="(firstOption, i) in firstOptions" :key="i">
                      <v-row dense align="center">
                        <v-col>
                          <v-text-field
                            :id="`optionName${i}`"
                            v-model="firstOption.optionName"
                            label="옵션명"
                            placeholder="예: 색상"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            :id="`optionValue${i}`"
                            v-model="firstOption.optionValue"
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
                            v-model="secondOption.optionName"
                            label="옵션명"
                            placeholder="예: 사이즈"
                            dense
                            hide-details
                            outlined
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="secondOption.optionValue"
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
        <v-chip label large color="white">
          <v-icon left> mdi-record </v-icon>
          상품 소개 글
        </v-chip>
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
      <v-col cols="3">
        *리스트 이미지
        <v-file-input
          dense
          @change="Preview_image($event, 'listImage')"
          v-model="listImage"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="listImageUrl" width="200" height="200" />
      </v-col>
      <v-col cols="3">
        메인 노출 이미지
        <v-file-input
          dense
          @change="Preview_image($event, 'mainImage')"
          v-model="mainImage"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="mainImageUrl" width="200" height="200" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        *상품 대표 이미지1
        <v-file-input
          dense
          @change="Preview_image($event, 'detailImage1')"
          v-model="detailImage1"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="detailImageUrl1" width="200" height="200" />
      </v-col>
      <v-col cols="3">
        *상품 대표 이미지2
        <v-file-input
          dense
          @change="Preview_image($event, 'detailImage2')"
          v-model="detailImage2"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="detailImageUrl2" width="200" height="200" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        *상품 대표 이미지3
        <v-file-input
          dense
          @change="Preview_image($event, 'detailImage3')"
          v-model="detailImage3"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="detailImageUrl3" width="200" height="200" />
      </v-col>
      <v-col cols="3">
        *상품 대표 이미지4
        <v-file-input
          dense
          @change="Preview_image($event, 'detailImage4')"
          v-model="detailImage4"
          show-size
          accept="image/png, image/jpeg, image/bmp"
        />
      </v-col>
      <v-col cols="3">
        <v-img :src="detailImageUrl4" width="200" height="200" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-record </v-icon>
          상품 상세 정보
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <tiptap-vuetify v-model="detailInfo" :extensions="extensions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-record </v-icon>
          배송 안내
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <tiptap-vuetify v-model="shippingInfo" :extensions="extensions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-record </v-icon>
          교환 및 반품 안내
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <tiptap-vuetify v-model="exchangeReturnInfo" :extensions="extensions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip label x-large color="white">
          <v-icon left> mdi-record </v-icon>
          상품 노출 여부:
        </v-chip>
        <v-radio-group v-model="showRadio" dense row hide-details>
          <v-radio value="SHOW" label="진열" />
          <v-radio class="mr-0" value="HIDE" label="숨김" />
          <v-radio value="SOLDOUT" label="품절" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-btn @click.prevent="modifyProduct">수정</v-btn>
      </v-col>
      <v-col>
        <v-btn>취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCategory } from '@/api/category';
import { modifyProduct, getProductById } from '@/api/product';

import {
  TiptapVuetify,
  Image,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';

export default {
  name: 'ProductRegist',
  components: {
    TiptapVuetify,
  },
  created() {
    const productId = this.$route.params.productId;

    //this.getCategory();
    this.getProductById(productId);
  },
  data() {
    return {
      productId: '',
      detailInfo: ``,
      shippingInfo: ``,
      exchangeReturnInfo: ``,
      extensions: [
        History,
        Image,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      listImage: null,
      listImageUrl: null,
      detailImage1: null,
      detailImageUrl1: null,
      detailImage2: null,
      detailImageUrl2: null,
      detailImage3: null,
      detailImageUrl3: null,
      detailImage4: null,
      detailImageUrl4: null,
      mainImage: null,
      mainImageUrl: null,
      name: '',
      salePrice: null,
      regularPrice: null,
      stockQuantity: null,
      maxPurchaseQuantity: null,
      eachShippingFee: null,
      pointPerPrice: null,
      newArrival: null,
      best: null,
      discount: null,
      description: '',
      firstOptions: [
        {
          optionGroupNumber: 1,
          optionName: '',
          optionValue: '',
        },
      ],
      secondOptions: [
        {
          optionGroupNumber: 2,
          optionName: '',
          optionValue: '',
        },
      ],
      optionRadio: 'Y',
      showRadio: 'SHOW',
      pointRadio: 'DEFAULT',
      shippingFeeRadio: 'DEFAULT',
      category1Select: null,
      category2Select: null,
      category1: [],
      category2: [],
      image: null,
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품 수정',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    async getProductById(productId) {
      this.getCategory();
      try {
        const { data } = await getProductById({
          productId: productId,
        });

        console.log(data);
        this.productId = data.productId;
        this.category1Select = data.firstCategoryId;
        this.getCategory(data.secondCategoryId);
        console.log(data.secondCategoryId);
        this.name = data.productName;
        this.salePrice = data.salePrice;
        this.regularPrice = data.regularPrice;
        this.stockQuantity = data.stockQuantity;
        this.maxPurchaseQuantity = data.maxPurchaseQuantity;
        this.pointRadio = data.pointType;
        this.pointPerPrice = data.pointPerPrice;
        this.shippingFeeRadio = data.shippingFeeType;
        this.eachShippingFee = data.eachShippingFee;
        this.newArrival = data.newArrival;
        this.best = data.best;
        this.discount = data.discount;
        this.firstOptions = data.firstOptions;
        this.secondOptions = data.secondOptions;
        this.description = data.description;
        console.log(data.productImageDtos);

        for (let i in data.productImageDtos) {
          let imageType = data.productImageDtos[i].imageType;
          let originalFileName = data.productImageDtos[i].originalFileName;
          let dataImage = data.productImageDtos[i].byteImage;
          let dataImageString =
            'data:image/png;base64,' + data.productImageDtos[i].byteImage;
          let contentType = 'image/png';
          console.log(i + ': ' + imageType);

          let file = new File(
            [this.b64toBlob(dataImage, contentType)],
            originalFileName,
          );

          if (imageType === 'LIST') {
            this.listImageUrl = dataImageString;
            this.listImage = file;
          } else if (imageType === 'MAIN') {
            this.mainImageUrl = dataImageString;
            this.mainImage = file;
          } else if (imageType === 'DETAIL1') {
            this.detailImageUrl1 = dataImageString;
            this.detailImage1 = file;
          } else if (imageType === 'DETAIL2') {
            this.detailImageUrl2 = dataImageString;
            this.detailImage2 = file;
          } else if (imageType === 'DETAIL3') {
            this.detailImageUrl3 = dataImageString;
            this.detailImage3 = file;
          } else if (imageType === 'DETAIL4') {
            this.detailImageUrl4 = dataImageString;
            this.detailImage4 = file;
          } else if (imageType === 'MAIN') {
            this.mainImageUrl = dataImageString;
            this.mainImage = file;
          }

          this.detailInfo = data.detailInfo;
          this.shippingInfo = data.shippingInfo;
          this.exchangeReturnInfo = data.exchangeReturnInfo;
          this.showRadio = data.productShowType;
        }
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
    async modifyProduct() {
      const formData = new FormData();

      if (this.listImage != null) {
        formData.append(
          'productImages',
          this.listImage,
          'LIST_' + this.listImage.name,
        );
      }
      if (this.detailImage1 != null) {
        formData.append(
          'productImages',
          this.detailImage1,
          'DETAIL1_' + this.detailImage1.name,
        );
      }
      if (this.detailImage2 != null) {
        formData.append(
          'productImages',
          this.detailImage2,
          'DETAIL2_' + this.detailImage2.name,
        );
      }
      if (this.detailImage3 != null) {
        formData.append(
          'productImages',
          this.detailImage3,
          'DETAIL3_' + this.detailImage3.name,
        );
      }
      if (this.detailImage4 != null) {
        formData.append(
          'productImages',
          this.detailImage4,
          'DETAIL4_' + this.detailImage4.name,
        );
      }
      if (this.mainImage != null) {
        formData.append(
          'productImages',
          this.mainImage,
          'MAIN_' + this.mainImage.name,
        );
      }
      const productDto = {
        productId: this.productId,
        categoryId: this.category2Select,
        name: this.name,
        salePrice: this.salePrice,
        regularPrice: this.regularPrice,
        stockQuantity: this.stockQuantity,
        maxPurchaseQuantity: this.maxPurchaseQuantity,
        pointType: this.pointRadio,
        pointPerPrice: this.pointPerPrice,
        shippingFeeType: this.shippingFeeRadio,
        eachShippingFee: this.eachShippingFee,
        newArrival: this.newArrival,
        best: this.best,
        discount: this.discount,
        firstOptions: this.firstOptions,
        secondOptions: this.secondOptions,
        description: this.description,
        productShowType: this.showRadio,
        detailInfo: this.detailInfo,
        shippingInfo: this.shippingInfo,
        exchangeReturnInfo: this.exchangeReturnInfo,
      };

      formData.append(
        'productDto',
        new Blob([JSON.stringify(productDto)], {
          type: 'application/json',
        }),
      );

      console.log(this.firstOptions);

      try {
        const response = await modifyProduct(formData);

        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
    firstOptionAdd() {
      this.firstOptions.push({
        optionGroupNumber: 1,
        optionName: this.firstOptions[0].optionName,
        optionValue: '',
      });
    },
    secondOptionAdd() {
      this.secondOptions.push({
        optionGroupNumber: 2,
        optionName: this.secondOptions[0].optionName,
        optionValue: '',
      });
    },
    firstOptionRemove(index) {
      this.firstOptions.splice(index, 1);
    },
    secondOptionRemove(index) {
      this.secondOptions.splice(index, 1);
    },
    async getCategory(secondCategoryId) {
      const { data } = await getCategory({
        parentId: this.category1Select,
      });
      if (this.category1Select == null) {
        this.category1 = data;
      } else {
        this.category2 = data;
        this.category2Select =
          secondCategoryId !== null ? secondCategoryId : null;
        console.log(data);
      }
    },
    Preview_image(e, imageTarget) {
      console.log(imageTarget);
      if (e !== null) {
        if (imageTarget === 'listImage') {
          this.listImageUrl = URL.createObjectURL(this.listImage);
        } else if (imageTarget === 'detailImage1') {
          this.detailImageUrl1 = URL.createObjectURL(this.detailImage1);
        } else if (imageTarget === 'detailImage2') {
          this.detailImageUrl2 = URL.createObjectURL(this.detailImage2);
        } else if (imageTarget === 'detailImage3') {
          this.detailImageUrl3 = URL.createObjectURL(this.detailImage3);
        } else if (imageTarget === 'detailImage4') {
          this.detailImageUrl4 = URL.createObjectURL(this.detailImage4);
        } else if (imageTarget === 'mainImage') {
          this.mainImageUrl = URL.createObjectURL(this.mainImage);
        }
      } else {
        if (imageTarget === 'listImage') {
          this.listImageUrl = null;
        } else if (imageTarget === 'detailImage1') {
          this.detailImageUrl1 = null;
        } else if (imageTarget === 'detailImage2') {
          this.detailImageUrl2 = null;
        } else if (imageTarget === 'detailImage3') {
          this.detailImageUrl3 = null;
        } else if (imageTarget === 'detailImage4') {
          this.detailImageUrl4 = null;
        } else if (imageTarget === 'mainImage') {
          this.mainImageUrl = null;
        }
      }
    },
    changeCategory() {
      this.getCategory();
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
