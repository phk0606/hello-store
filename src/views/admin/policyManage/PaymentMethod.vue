<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <admin-policy-left />
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
              결제 방법
            </v-chip>
          </v-col>
        </v-row>
        <v-row dense align="center">
          <v-col cols="auto">
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              결제 방법 선택
            </v-chip>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="modifyPaymentMethod">저장</v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="8" class="text-center"
            ><v-card outlined class="blue-grey" dark> 일반</v-card></v-col
          >
          <v-col class="text-center">
            <v-card outlined class="blue-grey" dark> 에스크로</v-card></v-col
          >
        </v-row>
        <v-row no-gutters>
          <v-col cols="8" class="d-flex justify-center">
            <v-checkbox
              v-model="paymentMethodTypes"
              value="WITHOUT_BANKBOOK"
              dense
              hide-details
              label="무통장 입금"
              class="mr-2"
            />
            <v-checkbox
              v-model="paymentMethodTypes"
              value="CREDIT_CARD"
              dense
              hide-details
              label="신용카드"
              class="mr-2"
            />
            <v-checkbox
              v-model="paymentMethodTypes"
              value="ACCOUNT_TRANSFER"
              dense
              hide-details
              label="계좌이체"
              class="mr-2"
            />
            <v-checkbox
              v-model="paymentMethodTypes"
              value="VIRTUAL_ACCOUNT"
              dense
              hide-details
              label="가상계좌"
              class="mr-2"
            />
            <v-checkbox
              v-model="paymentMethodTypes"
              value="MOBILE_PAYMENT"
              dense
              hide-details
              label="휴대폰 결제"
            />
          </v-col>
          <v-col class="d-flex justify-center">
            <v-checkbox
              v-model="paymentMethodTypes"
              value="ESCROW_CREDIT_CARD"
              dense
              hide-details
              label="신용카드"
              class="mr-2"
            />
            <v-checkbox
              v-model="paymentMethodTypes"
              value="ESCROW_ACCOUNT_TRANSFER"
              dense
              hide-details
              label="계좌이체"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col><v-divider /></v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-chip label large color="white">
              <v-icon left> mdi-record </v-icon>
              무통장 입금 선택
            </v-chip>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="purple" small dark v-bind="attrs" v-on="on">
                  은행 계좌 등록
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5"
                    ><v-icon large color="indigo"> mdi-lead-pencil </v-icon>은행
                    계좌 등록</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row align="center">
                      <v-col cols="auto"> ● 은행 이름 </v-col>
                      <v-col>
                        <v-text-field
                          v-model="bankName"
                          hide-details
                          dense
                          solo-inverted
                          required
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="auto"> ● 계좌 번호 </v-col>
                      <v-col>
                        <v-text-field
                          v-model="accountNumber"
                          hide-details
                          dense
                          solo-inverted
                          required
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="auto"> ● 예금주 명 </v-col>
                      <v-col>
                        <v-text-field
                          v-model="accountHolder"
                          hide-details
                          dense
                          solo-inverted
                          required
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="auto"> ● 사용 설정 </v-col>
                      <v-col>
                        <v-radio-group
                          v-model="radioGroup1"
                          dense
                          row
                          hide-details
                        >
                          <v-radio value="Y" label="노출" />
                          <v-radio value="N" label="숨김" />
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    닫기
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="
                      createOrModifyBankAccount();
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
        <v-row>
          <v-col>
            <v-data-table
              hide-default-footer
              v-model="selected"
              :headers="headers"
              :items="contents"
              item-key="bankAccountId"
              class="elevation-1"
              disable-sort
            >
              <template v-slot:[`item.accountInfo`]="{ item }">
                <v-row>
                  {{ item.bankName }} {{ item.accountNumber }}
                  {{ item.accountHolder }}
                </v-row>
              </template>
              <template v-slot:[`item.modify`]="{ item }">
                <v-row justify="center"
                  ><v-btn @click="openDialog(item.bankAccountId)">수정</v-btn
                  ><v-btn @click="removeBankAccount(item.bankAccountId)"
                    >삭제</v-btn
                  ></v-row
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminPolicyLeft from '@/components/admin/AdminPolicyLeft.vue';
import {
  getBankAccounts,
  getBankAccount,
  createBankAccount,
  modifyBankAccount,
  removeBankAccount,
} from '@/api/bankAccount';
import {
  modifyPaymentMethod,
  getPaymentMethodTypes,
} from '@/api/paymentMethod';

export default {
  name: 'admin-policy',
  created() {
    this.getBankAccounts();
    this.getPaymentMethodTypes();
  },
  components: {
    AdminPolicyLeft,
  },

  data() {
    return {
      bankAccountId: '',
      accountNumber: '',
      accountHolder: '',
      bankName: '',
      radioGroup1: 'Y',
      dialog: false,
      paymentMethodTypes: [],
      policyId: null,
      defaultShippingFee: null,
      freeShippingMinPurchasePrice: null,
      signUpPoint: null,
      percentPerPurchasePrice: null,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'bankAccountId',
        },
        {
          text: '계좌 정보',
          align: 'center',
          sortable: false,
          value: 'accountInfo',
        },
        { text: '노출/숨김', align: 'center', value: 'showYn' },
        { text: '수정/삭제', align: 'center', value: 'modify' },
      ],
      contents: [],
      items: [
        {
          text: '기본 정책 관리',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: '결제 방법 설정',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    };
  },
  methods: {
    openDialog(bankAccountId) {
      this.dialog = true;
      this.getBankAccount(bankAccountId);
    },
    async getPaymentMethodTypes() {
      try {
        const { data } = await getPaymentMethodTypes();
        this.paymentMethodTypes = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async modifyPaymentMethod() {
      try {
        const paymentMethodDto = {
          paymentMethodTypes: this.paymentMethodTypes,
        };

        const { data } = await modifyPaymentMethod(paymentMethodDto);
        console.log(data);
        this.paymentMethodTypes = data;
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async getBankAccount(bankAccountId) {
      try {
        const { data } = await getBankAccount({
          bankAccountId: bankAccountId,
        });
        this.bankAccountId = data.bankAccountId;
        this.bankName = data.bankName;
        this.accountNumber = data.accountNumber;
        this.accountHolder = data.accountHolder;
        this.radioGroup1 = data.showYn;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBankAccounts() {
      try {
        const { data } = await getBankAccounts();
        this.contents = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    createOrModifyBankAccount() {
      console.log(this.bankAccountId);
      if (this.bankAccountId) {
        this.modifyBankAccount();
      } else {
        this.createBankAccount();
      }
      this.bankAccountId = '';
      this.accountNumber = '';
      this.accountHolder = '';
      this.bankName = '';
      this.radioGroup1 = 'Y';
    },
    async modifyBankAccount() {
      try {
        const bankAccountDto = {
          bankAccountId: this.bankAccountId,
          bankName: this.bankName,
          accountNumber: this.accountNumber,
          accountHolder: this.accountHolder,
          showYn: this.radioGroup1,
        };

        const response = await modifyBankAccount(bankAccountDto);
        console.log(response);
        this.getBankAccounts();
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async removeBankAccount(bankAccountId) {
      try {
        const bankAccountDto = {
          bankAccountId: bankAccountId,
        };
        const response = await removeBankAccount(bankAccountDto);
        console.log(response);

        this.getBankAccounts();
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
      }
    },
    async createBankAccount() {
      try {
        const bankAccountDto = {
          bankName: this.bankName,
          accountNumber: this.accountNumber,
          accountHolder: this.accountHolder,
          showYn: this.radioGroup1,
        };

        const response = await createBankAccount(bankAccountDto);
        console.log(response);
        this.getBankAccounts();
      } catch (error) {
        console.log(error);
        // this.logMessage = error.response.data.message;
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
