<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-board-left />
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
              상품평 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row dense align="center" justify="start">
          <v-col cols="2">
            <v-select
              label="항목 선택"
              v-model="searchSelected"
              :items="searchKeyword"
              outlined
              hide-details
              dense
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="auto">
            <v-text-field v-model="searchText" dense hide-details outlined>
              <template v-slot:prepend> <v-card width="10" flat /></template>
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getOrders(1)">검색</v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <v-container fluid>
              <v-row justify="end">
                <v-col cols="auto">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="purple" dark v-bind="attrs" v-on="on">
                        상품평 작성
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5"
                          ><v-icon large color="indigo">
                            mdi-lead-pencil </v-icon
                          >상품평 작성하기</span
                        >
                      </v-card-title>
                      <v-card-text>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col cols="5">
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
                            <v-col cols="5">
                              <v-select
                                v-model="category2Select"
                                :items="category2"
                                label="카테고리 선택"
                                outlined
                                dense
                                hide-details
                                @change="getProductsByCategoryId"
                                :menu-props="{ offsetY: true }"
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-select
                                v-model="productSelected"
                                :items="products"
                                item-text="productName"
                                item-value="productId"
                                label="상품 선택"
                                outlined
                                dense
                                hide-details
                                :menu-props="{ offsetY: true }"
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <validation-provider
                                name="ProductComment"
                                v-slot="{ errors }"
                                rules="required|max:10"
                              >
                                <v-textarea
                                  rows="3"
                                  outlined
                                  v-model="content"
                                  label="상품평"
                                  :counter="10"
                                  :error-messages="errors"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col>
                              <v-card flat>
                                <v-card-text class="pa-0">
                                  <v-radio-group
                                    dense
                                    hide-details
                                    v-model="gradeRadios"
                                  >
                                    <v-row>
                                      <v-col> 평점 </v-col>
                                    </v-row>
                                    <v-row dense align="center">
                                      <v-col cols="auto">
                                        <v-radio value="5" />
                                      </v-col>
                                      <v-col cols="2"> 매우 만족 </v-col>
                                      <v-col>
                                        <v-rating
                                          background-color="indigo lighten-3"
                                          color="indigo"
                                          small
                                          readonly
                                          :value="5"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row dense align="center"
                                      ><v-col cols="auto">
                                        <v-radio value="4" />
                                      </v-col>
                                      <v-col cols="2"> 만족 </v-col>
                                      <v-col>
                                        <v-rating
                                          background-color="indigo lighten-3"
                                          color="indigo"
                                          small
                                          readonly
                                          :value="4"
                                        /> </v-col
                                    ></v-row>
                                    <v-row dense align="center"
                                      ><v-col cols="auto">
                                        <v-radio value="3" />
                                      </v-col>
                                      <v-col cols="2"> 보통 </v-col>
                                      <v-col>
                                        <v-rating
                                          background-color="indigo lighten-3"
                                          color="indigo"
                                          small
                                          readonly
                                          :value="3"
                                        /> </v-col
                                    ></v-row>
                                    <v-row dense align="center">
                                      <v-col cols="auto">
                                        <v-radio value="2" />
                                      </v-col>
                                      <v-col cols="2"> 불만 </v-col>
                                      <v-col>
                                        <v-rating
                                          background-color="indigo lighten-3"
                                          color="indigo"
                                          small
                                          readonly
                                          :value="2"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row dense align="center">
                                      <v-col cols="auto">
                                        <v-radio value="1" />
                                      </v-col>
                                      <v-col cols="2"> 매우불만 </v-col>
                                      <v-col>
                                        <v-rating
                                          background-color="indigo lighten-3"
                                          color="indigo"
                                          small
                                          readonly
                                          :value="1"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-radio-group>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-file-input
                              @change="Preview_image"
                              v-model="image"
                              show-size
                            />
                          </v-row>
                          <v-row>
                            <v-img :src="url" max-width="300" />
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          닫기
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="
                            createProductComment();
                            dialog = false;
                          "
                        >
                          저장
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
            <v-expansion-panels>
              <v-expansion-panel v-for="(content, i) in contents" :key="i">
                <v-expansion-panel-header>
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        :src="`${imageUrl}${content.fileName}`"
                        max-width="120"
                      />
                    </v-col>
                    <v-col cols="7">
                      <v-row>
                        <v-col cols="7" class="d-flex">
                          <div class="pr-2">{{ content.createdDate }}</div>

                          <div>{{ content.username }}</div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          {{ content.categoryName }} >
                          {{ content.productName }} (productId:
                          {{ content.productId }})
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div>
                            {{ content.content }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="2" align-self="center">
                      <v-rating
                        :value="content.grade"
                        color="indigo"
                        small
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row align="center">
                    <v-col cols="10">
                      <v-row>
                        <v-col>
                          <div>
                            <v-text-field
                              v-model="content.content"
                              hide-details
                              dense
                              required
                              solo-inverted
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1" class="d-flex">
                      <v-btn
                        @click="modifyProductComment(i)"
                        outlined
                        small
                        color="purple"
                        class="mr-2"
                      >
                        수정
                      </v-btn>
                      <v-btn
                        @click="removeProductComment(i)"
                        outlined
                        small
                        color="red"
                      >
                        삭제
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
                <v-card flat>
                  <v-row align="center">
                    <v-col cols="2">
                      <v-btn text @click.prevent="replyListShowToggle(i)"
                        >작성된 댓글({{ content.replyCount }})</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        outlined
                        small
                        color="indigo"
                        class="mr-2"
                        @click.prevent="replyRegistShow(i)"
                      >
                        작성
                      </v-btn>
                      <v-btn
                        outlined
                        small
                        color="orange"
                        @click.prevent="replyRegistHidden(i)"
                      >
                        취소
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    ref="replyRegistRow"
                    v-show="false"
                    class="pb-1"
                  >
                    <v-col cols="1">
                      <v-spacer />
                    </v-col>
                    <v-col cols="7">
                      <v-textarea
                        v-model="content.replyRegistContent"
                        outlined
                        hide-details
                        rows="1"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-btn
                        @click="createReply(i)"
                        dark
                        color="deep-purple darken-3"
                        class="mr-2"
                      >
                        등록
                      </v-btn>
                    </v-col>
                  </v-row>
                  <div v-show="false" ref="replyList">
                    <v-row
                      v-for="(
                        productCommentReply, j
                      ) in content.productCommentReplies"
                      :key="j"
                      dense
                      align="center"
                    >
                      <v-col cols="1">
                        <v-spacer />
                      </v-col>
                      <v-col cols="auto">
                        <v-icon>mdi-arrow-right-bottom</v-icon>
                      </v-col>
                      <v-col cols="7">
                        <v-card flat>
                          <v-card-subtitle>
                            {{ productCommentReply.username }}
                            {{ productCommentReply.createdDate }}
                          </v-card-subtitle>
                          <v-card-text>
                            <v-row align="center">
                              <v-textarea
                                v-model="productCommentReply.content"
                                outlined
                                hide-details
                                rows="1"
                              />
                              <v-btn
                                @click="modifyProductCommentReply(i, j)"
                                outlined
                                small
                                color="purple"
                                class="mx-2"
                              >
                                수정
                              </v-btn>
                              <v-btn
                                @click="removeProductCommentReply(i, j)"
                                outlined
                                small
                                color="red"
                              >
                                삭제
                              </v-btn>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-expansion-panel>
              <v-expansion-panel v-if="contents.length === 0">
                <v-card flat>
                  <v-card-text> 데이터가 없습니다. </v-card-text>
                </v-card>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-container>
              <v-row justify="center" class="pt-2" style="text-align: center">
                <v-col cols="auto">
                  <pagination
                    :options="{
                      theme: 'bootstrap4',
                      edgeNavigation: true,
                      texts: {
                        first: '처음',
                        last: '마지막',
                        count:
                          '전체 {count} 개중 {from} 부터 {to}  |{count} 개| 1 개',
                      },
                    }"
                    v-model="page"
                    :records="records"
                    :per-page="perPage"
                    @paginate="myCallback"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminBoardLeft from '@/components/admin/AdminBoardLeft.vue';
import Pagination from 'vue-pagination-2';
import {
  getProductComments,
  getProductCommentReplyList,
  createProductCommentReply,
  modifyProductComment,
  removeProductComment,
  modifyProductCommentReply,
  removeProductCommentReply,
  createProductComment,
} from '@/api/productComment';
import { getCategory } from '@/api/category';
import { getProductsByCategoryId } from '@/api/product';

export default {
  created() {
    this.getProductComments(1);
    this.getCategory();
  },
  components: {
    Pagination,
    AdminBoardLeft,
  },

  data() {
    return {
      productSelected: null,
      products: [],
      category1Select: null,
      category2Select: null,
      category1: [],
      category2: [],
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      image: null,
      url: null,
      gradeRadios: '5',
      dialog: false,
      searchSelected: null,
      searchText: '',
      searchKeyword: [
        { text: '주문 번호', value: 'orderId' },
        { text: '주문 상품', value: 'productName' },
        { text: '주문자 아이디', value: 'ordererId' },
        { text: '주문자 이름', value: 'ordererName' },
      ],
      page: 1,
      records: 0,
      perPage: 5,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'orderId',
        },
        { text: '제목', align: 'center', sortable: false, value: 'image' },
        { text: '작성일', align: 'center', value: 'createdDate' },
      ],
      contents: [],
      content: null,
      items: [
        {
          text: '게시판 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '상품평 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    async getProductsByCategoryId() {
      try {
        const { data } = await getProductsByCategoryId({
          categoryId: this.category2Select,
        });
        this.products = data;
      } catch (error) {
        console.error(error);
      }
    },
    async getCategory(secondCategoryId) {
      try {
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
      } catch (error) {
        console.error(error);
      }
    },
    changeCategory() {
      this.getCategory();
    },
    async createProductComment() {
      try {
        const formData = new FormData();

        if (this.image != null) {
          formData.append('productCommentImages', this.image);
        }

        const productCommentDto = {
          username: this.$store.state.username,
          productId: this.productSelected,
          content: this.content,
          grade: this.gradeRadios,
        };

        formData.append(
          'productCommentDto',
          new Blob([JSON.stringify(productCommentDto)], {
            type: 'application/json',
          }),
        );

        const response = await createProductComment(formData);
        console.log(response);
        this.getProductComments(1);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeProductCommentReply(i, j) {
      try {
        await removeProductCommentReply({
          productCommentReplyId:
            this.contents[i].productCommentReplies[j].productCommentReplyId,
        });
        //console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyProductCommentReply(i, j) {
      try {
        const { data } = await modifyProductCommentReply({
          productCommentReplyId:
            this.contents[i].productCommentReplies[j].productCommentReplyId,
          content: this.contents[i].productCommentReplies[j].content,
        });
        console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.error(error);
      }
    },
    async removeProductComment(index) {
      try {
        await removeProductComment({
          productCommentId: this.contents[index].productCommentId,
        });
        //console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyProductComment(index) {
      try {
        const { data } = await modifyProductComment({
          productCommentId: this.contents[index].productCommentId,
          content: this.contents[index].content,
        });
        console.log(data);
        this.getProductComments(1);
      } catch (error) {
        console.error(error);
      }
    },
    async getProductCommentReplies(index) {
      try {
        const { data } = await getProductCommentReplyList({
          productCommentId: this.contents[index].productCommentId,
        });
        console.log(data);
        this.contents[index].productCommentReplies = data;
        this.contents[index].replyCount = data.length;
        this.contents[index].replyRegistContent = '';
      } catch (error) {
        console.error(error);
      }
    },
    async createReply(index) {
      try {
        const replyRegistContent = this.contents[index].replyRegistContent;
        const productCommentId = this.contents[index].productCommentId;
        console.log(replyRegistContent);
        const replyDto = {
          productCommentId: productCommentId,
          content: replyRegistContent,
          username: this.$store.state.username,
        };
        const response = await createProductCommentReply(replyDto);

        console.log(response);
        this.getProductCommentReplies(index);
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getProductComments(page) {
      try {
        const { data } = await getProductComments({
          page: page - 1,
          size: this.perPage,

          productId: this.productId,
        });
        this.contents = data.content;
        this.perPage = data.size;
        this.records = data.totalElements;
        this.page = data.pageable.pageNumber + 1;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    replyRegistShow(index) {
      console.log(index);
      this.$refs.replyRegistRow[index].style.display = 'flex';
    },
    replyRegistHidden(index) {
      console.log(index);
      this.$refs.replyRegistRow[index].style.display = 'none';
    },
    replyListShowToggle(index) {
      if (this.$refs.replyList[index].style.display === 'none') {
        this.$refs.replyList[index].style.display = 'block';
      } else {
        this.$refs.replyList[index].style.display = 'none';
      }
    },
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
    },
    Preview_image(e) {
      if (e !== null) {
        this.url = URL.createObjectURL(this.image);
      } else {
        this.url = null;
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
