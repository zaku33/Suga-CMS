<template>
  <div id="payment_layout">
    <br />
    <v-img class="white--text align-end" height="100%" src="../../assets/payment/Banner.png"></v-img>
    <v-btn
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
    </v-btn>
    <!-- <h5 style="color: white">{{provider_selected}}</h5> -->
    <h1 style="color: white">{{money_select.id}} {{money_select.amount}}</h1>
    <v-row>
      <v-col cols="5" sm="5" md="5">
        <img src="../../assets/payment/Line.png" style="width:70vh" />
      </v-col>

      <v-col cols="2" sm="2" md="2">
        <a style="color:white;width:100vh">NẠP CHIP QUA THẺ CÀO</a>
      </v-col>

      <v-col cols="5" sm="5" md="5">
        <img
          src="../../assets/payment/Line.png"
          style="-webkit-transform: scaleX(-1);transform: scaleX(-1);width:70vh"
        />
      </v-col>
    </v-row>
    <v-card-text class="text--primary">
      <v-container>
        <v-row no-gutters>
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
              <v-col cols="5" sm="5" md="5">
                <v-text-field dense label="Capcha" solo v-model="captchaInput"></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="5" sm="5" md="5">
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
            <table class="table table-striped table-bordered table-light">
              <thead class="tableHeader">
                <tr>
                  <th scope="col" v-for="title in table_header" :key="title.id">
                    <h2 style="color:white">{{title}}</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in showSelect.data" :key="result.id">
                  <!-- <td v-for="(item,key,index) of result" :key="index.id">
                    <div v-if="(key =='amount')? item=`${item} ${result.currency}`:item">{{item}}</div>
                  </td>-->
                  <td>{{result.amount}}</td>
                  <td>{{result.id}}</td>
                  <td>{{result.currency}}</td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
        <br />
      </v-container>
    </v-card-text>
    <br />
    <br />

  </div>
</template>
<script>
import _ from "lodash";
import { payment_data } from "../../define/data";
import PaymentControl from "../../controller/payment";

export default {
  data() {
    return {
      captchaInput: "",
      captchaCode: "",
      table_header: ["Purchase", "Poker Chips", "Bonus"],
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
    // old data
    /*     getProviderId() {
      return this.provider_selected.telco;
    },
    getOnlyNumberMoney() {
      return this.money_select.replace(/[^\d\.\,\s]+/g, "").replace(/\./g, "");
    },
    getOnlyCurrency() {
      return this.money_select.replace(/[^0-9.-]+/g, "");
    }, */
    showSelect() {
      return this.provider_selected;
    },
    isReadySubmit() {
      return this.captchaInput == this.captchaCode ? false : true;
    }
  },
  methods: {
    async GetPriceList() {
      let url = "https://payment.aceplayx.com/api/payment/stores/products";
      let payMethod = "CARD";
      let x = await PaymentControl.ListPrice(url, payMethod).then(result => {
        var data = result.data.data;
        var y = _.chain(data.products)
          .groupBy("serviceName")
          .map(function(v, i) {
            var name =
              i == "VTT"
                ? "Viettel"
                : i == "VMS"
                ? "Mobifone"
                : i == "VNP"
                ? "Vinaphone"
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
        token: "e2075474294983e013ee4dd2201c7a73", // get user's login token ( wait Sang support)
        method: "CARD",
        serial: this.card_serial,
        pin: this.card_pin,
        productId: this.money_select.id
        // old data
        /* telco: this.getProviderId,
        value: this.getOnlyNumberMoney */
      };
      let url = "https://payment.aceplayx.com/api/payment/deposit";
      PaymentControl.PayingRequest(url, data);
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
<style lang="scss" scoped>
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
  background-image: url("../../assets/payment/BG.png");
}
</style>