<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-product-left />
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
              재고 리스트
            </v-chip>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="5">
            <v-select
              v-model="productSelect"
              :items="products"
              item-value="productId"
              item-text="productName"
              label="상품 선택"
              outlined
              dense
              hide-details
              @change="changeProduct"
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="1"
            ><div
              v-if="firstOptions && firstOptions[0].optionValue"
              class="text-right"
            >
              {{ firstOptions[0].optionName }}
            </div></v-col
          >
          <v-col cols="2">
            <v-select
              v-model="firstOptionSelect"
              :items="firstOptions"
              item-value="id"
              item-text="optionValue"
              label="옵션1 선택"
              outlined
              dense
              hide-details
              @change="getStockQuantities(1)"
              :menu-props="{ offsetY: true }"
            />
          </v-col>
          <v-col cols="1"
            ><div
              v-if="secondOptions && secondOptions[0].optionValue"
              class="text-right"
            >
              {{ secondOptions[0].optionName }}
            </div></v-col
          >
          <v-col cols="2">
            <v-select
              v-model="secondOptionSelect"
              :items="secondOptions"
              item-value="id"
              item-text="optionValue"
              label="옵션2 선택"
              outlined
              dense
              hide-details
              @change="getStockQuantities(1)"
              :menu-props="{ offsetY: true }"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-text-field
              v-model="stockQuantity"
              label="재고량"
              dense
              hide-details
              outlined
            />
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="createStockQuantity">등록</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="clear">초기화</v-btn>
          </v-col>
        </v-row>
        <v-divider />
        <v-row dense align="center" justify="center">
          <v-col cols="auto" class="ml-5">재고량</v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stockQuantityMin"
              dense
              hide-details
              outlined
              clearable
            />
          </v-col>
          <v-col cols="auto">~</v-col>
          <v-col cols="2" class="mr-10">
            <v-text-field
              v-model="stockQuantityMax"
              dense
              hide-details
              outlined
              clearable
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchText"
              label="상품명"
              dense
              hide-details
              outlined
              clearable
            />
          </v-col>
          <v-col cols="auto">
            <v-btn color="indigo" dark @click="getStockQuantities(1)"
              >검색</v-btn
            >
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="contents"
              item-key="stockQuantityId"
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.stockQuantity`]="props">
                <v-edit-dialog
                  :return-value.sync="props.item.stockQuantity"
                  large
                  persistent
                  @save="
                    save(props.item.stockQuantityId, props.item.stockQuantity)
                  "
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                  retu
                >
                  <div>{{ props.item.stockQuantity }}</div>
                  <template v-slot:input>
                    <div class="mt-4 text-h6">
                      {{ props.item.productName }}
                    </div>
                    <div>
                      {{ props.item.firstOptionValue }} /
                      {{ props.item.secondOptionValue }} 재고량 수정
                    </div>
                    <v-text-field
                      v-model="props.item.stockQuantity"
                      label="Edit"
                      single-line
                      autofocus
                    />
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
              {{ snackText }}

              <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" text @click="snack = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>
        </v-row>
        <v-row justify="center" style="text-align: center">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getStockQuantities,
  modifyStockQuantity,
  createStockQuantity,
} from '@/api/stockQuantity';
import { getProducts } from '@/api/product';
import { getFirstOptions, getSecondOptions } from '@/api/productOption';
import AdminProductLeft from '@/components/admin/AdminProductLeft.vue';
import Pagination from 'vue-pagination-2';

export default {
  async created() {
    await this.getProducts();
    await this.getStockQuantities(1);
  },
  components: {
    Pagination,
    AdminProductLeft,
  },
  data() {
    return {
      stockQuantity: null,
      productSelect: null,
      products: [],
      firstOptionSelect: null,
      firstOptions: [
        {
          id: '',
          optionGroupNumber: 1,
          optionName: '',
          optionValue: '',
        },
      ],
      secondOptionSelect: null,
      secondOptions: [
        {
          id: '',
          optionGroupNumber: 2,
          optionName: '',
          optionValue: '',
        },
      ],
      stockQuantityMin: null,
      stockQuantityMax: null,
      snack: false,
      snackColor: '',
      snackText: '',
      // max25chars: v => v.length <= 25 || 'Input too long!',
      searchText: '',

      page: 1,
      records: 0,
      perPage: 10,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'stockQuantityId',
        },
        {
          text: '상품명',
          align: 'center',
          sortable: false,
          value: 'productName',
        },
        { text: '옵션명', align: 'center', value: 'firstOptionName' },
        { text: '옵션값', align: 'center', value: 'firstOptionValue' },
        { text: '옵션명', align: 'center', value: 'secondOptionName' },
        { text: '옵션값', align: 'center', value: 'secondOptionValue' },
        {
          text: '재고량 (수정가능)',
          align: 'center',
          value: 'stockQuantity',
          width: '8%',
        },
      ],
      contents: [],
      items: [
        {
          text: '상품 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '재고 리스트',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    clear() {
      this.productSelect = null;
      this.firstOptionSelect = null;
      this.firstOptions = [
        {
          id: '',
          optionGroupNumber: 1,
          optionName: '',
          optionValue: '',
        },
      ];
      this.secondOptionSelect = null;
      this.secondOptions = [
        {
          id: '',
          optionGroupNumber: 2,
          optionName: '',
          optionValue: '',
        },
      ];
      this.stockQuantity = '';
    },
    async createStockQuantity() {
      try {
        const stockQuantityDto = {
          productId: this.productSelect,
          firstOptionId: this.firstOptionSelect,
          secondOptionId: this.secondOptionSelect,
          stockQuantity: this.stockQuantity,
        };

        const response = await createStockQuantity(stockQuantityDto);
        console.log(response);
        await this.getStockQuantities(1);
        this.clear();
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async changeProduct() {
      await this.getFirstOptions();
      await this.getSecondOptions();
      await this.getStockQuantities(1);
    },
    async getFirstOptions() {
      try {
        const { data } = await getFirstOptions({
          productId: this.productSelect,
        });
        this.firstOptions = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getSecondOptions() {
      try {
        const { data } = await getSecondOptions({
          productId: this.productSelect,
        });
        this.secondOptions = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getProducts() {
      try {
        const { data } = await getProducts({});
        this.products = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getStockQuantities(page) {
      try {
        const { data } = await getStockQuantities({
          page: page - 1,
          size: this.perPage,
          productId: this.productSelect,
          firstOptionId: this.firstOptionSelect,
          secondOptionId: this.secondOptionSelect,
          stockQuantityMin: this.stockQuantityMin,
          stockQuantityMax: this.stockQuantityMax,
          searchText: this.searchText,
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
    myCallback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
      this.getStockQuantities(page);
    },
    async save(stockQuantityId, stockQuantity) {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';

      console.log(stockQuantityId, stockQuantity);
      try {
        const { data } = await modifyStockQuantity({
          stockQuantityId: stockQuantityId,
          stockQuantity: stockQuantity,
        });
        console.log(data);
        this.getStockQuantities(1);
      } catch (error) {
        console.error(error);
      }
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close() {
      console.log('Dialog closed');
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
