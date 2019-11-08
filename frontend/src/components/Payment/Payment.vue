<template>
  <v-app id="payment_layout">
    <div>
      <v-img class="white--text align-end" src="../../assets/payment/Banner.png"></v-img>
    </div>
    <!-- <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      style="position:absolute;top: 10px; right: 0px;"
      @click="Close"
    >
      <v-avatar>
        <img src="../../assets/payment/Close.png" alt="John" />
      </v-avatar>
    </v-btn> -->
    <v-row style="max-height: fit-content;">
      <v-col cols="5" sm="5" md="5">
        <img src="../../assets/payment/Line.png" style="width:100%;" />
      </v-col>

      <v-col cols="2" sm="2" md="2" style="width:100%;text-align:center">
        <a style="color:white">NẠP CHIP QUA THẺ CÀO</a>
      </v-col>

      <v-col cols="5" sm="5" md="5">
        <img
          src="../../assets/payment/Line.png"
          style="-webkit-transform: scaleX(-1);transform: scaleX(-1);width:100%"
        />
      </v-col>
    </v-row>
    <v-card-text class="text--primary">
      <v-container>
        <v-row justify-center>
          <v-col cols="5" sm="5" md="5">
            <v-autocomplete
              :items="(providers_real!=undefined && providers_real.length>0) ? providers_real: providers"
              label="Provider"
              v-model="provider_selected"
              item-text="provider_name"
              item-value="value"
              dense
              solo
              menu-props="auto"
            ></v-autocomplete>

            <!-- return-object for return selection in object type -->
            <v-autocomplete
              :items="showSelect.data"
              return-object
              item-text="amount"
              item-value="amount"
              label="Amount"
              v-model="money_select"
              dense
              solo
            ></v-autocomplete>
            <v-text-field dense label="Card Pin" solo v-model="card_pin"></v-text-field>
            <v-text-field dense label="Card Serial" solo v-model="card_serial"></v-text-field>
            <v-row no-gutters>
              <v-col cols="12" sm="5" md="5" xs="5">
                <v-text-field dense label="Capcha" solo v-model="captchaInput"></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="5" md="5" xs="5">
                <v-text-field dense :label="captchaCode" solo disabled></v-text-field>
              </v-col>
            </v-row>
            <br />
            <v-row justify-center>
              <v-col cols="5" sm="5" md="5">
                <button id="btnPaid" @click="Paid" v-bind:disabled="isReadySubmit">
                  <h5 id="txtPaid">Nạp tiền</h5>
                </button>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="5" sm="5" md="5">
                <button id="btnReInput" @click="Reset">
                  <h5 id="txtReInput">Nhập lại</h5>
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" sm="6" md="6">
            <v-data-table
              :headers="table_header"
              :items="showSelect.data"
              hide-default-footer
              class="elevation-1"
              :mobile-breakpoint="0"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td>{{Number(item.amount.toFixed(1)).toLocaleString() }} {{item.currency}}</td>
                    <td>{{Number(item.chips.toFixed(1)).toLocaleString()}} Chips</td>
                    <td>{{Number(item.bonusChips.toFixed(1)).toLocaleString()}} Chips</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <br />
      </v-container>
    </v-card-text>
  </v-app>
</template>
<script>
import _ from "lodash";
import { payment_data, token } from "../../define/data";
import PaymentControl from "../../controller/payment";

export default {
  data() {
    return {
      captchaInput: "",
      captchaCode: "",
      table_header: [
        {
          text: "Purchase",
          // width: 100,
          align: "left",
          sortable: false,
          value: "amount"
        },
        {
          text: "Chips",
          // width: 100,
          align: "left",
          sortable: false,
          value: "chips"
        },
        {
          text: "Bonus",
          // width: 100,
          align: "left",
          sortable: false,
          value: "bonusChips"
        }
      ],
      provider_selected: [],
      providers_real: [],
      providers: payment_data,
      money_select: "",
      id_select: null,
      card_pin: "",
      card_serial: ""
    };
  },
  mounted() {
    this.CreateCaptcha();
    this.GetPriceList();
  },
  computed: {
    showSelect() {
      return this.provider_selected;
    },
    isReadySubmit() {
      return this.captchaInput == this.captchaCode ? false : true;
    }
  },
  methods: {
    async GetPriceList() {
      let method = "get";
      let url = "https://payment.aceplayx.com/api/payment/stores/products";
      let header = { payMethod: "CARD", authorization: token };
      await PaymentControl.PaymentAPI(method, url, header).then(result => {
        var data = result.data.data;
        var y = _.chain(data.products)
          .groupBy("serviceName")
          .map(function(v, i) {
            var name =
              i == "VTT"
                ? "VIETTEL"
                : i == "VMS"
                ? "MOBIFONE"
                : i == "VNP"
                ? "VINAPHONE"
                : i == "MOMO"
                ? "MOMO"
                : "Unknown";
            return {
              provider_name: name,
              value: {
                data: v
              }
            };
          })
          .value();
        this.providers_real = y;
      });
    },
    Paid() {
      let data = {
        authorization: token, // get user's login token ( wait Sang support)
        method: "CARD",
        serial: this.card_serial,
        pin: this.card_pin,
        productId: this.money_select.id
        // old data
        /* telco: this.getProviderId,
        value: this.getOnlyNumberMoney */
      };
      let header = {
        authorization: token
      };
      let url = "https://payment.aceplayx.com/api/payment/deposit";
      PaymentControl.PayingRequest("post", url, data, header);
    },
    Reset() {
      this.captchaInput = "";
      this.money_select = "";
      this.provider_selected = "";
      this.card_pin = "";
      this.card_serial = "";
    },
    CreateCaptcha() {
      for (var i = 0; i < 6; i++) {
        this.captchaCode += (Math.ceil(Math.random() * 10) - 1).toString();
      }
    },
    Close() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
th.text-left span {
  color: white;
  font-size: 150%;
}
#txtPaid,
#txtReInput {
  color: white;
  padding-left: -50%;
}
#btnPaid,
#btnReInput {
  width: 100%;
  height: 92px;
  background-repeat: no-repeat;
  background-size: contain;
}
#btnPaid {
  background-image: url("../../assets/payment/Paid.png");
}
#btnReInput {
  background-image: url("../../assets/payment/ReInput.png");
}
.tableHeader {
  background-image: url("../../assets/payment/TableBG.png");
  background-size: cover;
}
#price_list_body {
  background-color: white;
}
.v-select__selection {
  width: 100%;
  justify-content: center;
}
#payment_layout {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/payment/BG.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>