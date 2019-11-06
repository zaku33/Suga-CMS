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
            <!-- <v-select
            :items="(providers_real.length >0) ? providers_real: providers"/>-->
            <v-autocomplete
              :items="(providers_real.length >0) ? providers_real: providers"
              label="Chọn nhà mạng để thanh toán"
              v-model="provider_selected"
              item-text="provider_name"
              item-value="value"
              dense
              solo
            ></v-autocomplete>
            <v-autocomplete
              :items="showSelect.data"
              item-text="money"
              item-value="money"
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
              <v-col cols="2" sm="2" md="2"></v-col>
              <v-col cols="5" sm="5" md="5">
                <v-text-field dense :label="captchaCode" solo disabled></v-text-field>
                <!-- <input type="text" :placeholder="captchaCode" /> -->
              </v-col>
            </v-row>
            <br />
            <!-- Button -->
            <v-row no-gutters>
              <v-col cols="6" sm="6" md="6">
                <button id="btnPaid" @click="PaidMoney" v-bind:disabled="isReadySubmit">
                  <h1 style="color:white">Nạp tiền</h1>
                </button>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <button id="btnReInput" @click="Clear">
                  <h1 style="color:white">Nhập lại</h1>
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" sm="1" md="1"></v-col>
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
                  <td v-for="i of result" :key="i.id">{{i}}</td>
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
import APIServices from "../../services/api";
import myCaptcha from "vue-captcha";
import { payment_data } from '../../define/data';

export default {
  data() {
    return {
      // appName= [{a:1},{b:2}],
      captchaInput: "",
      captchaCode: "",
      table_header: ["Purchase", "Poker Chips", "Bonus"],
      provider_selected: [],
      providers_real :[],
      providers: payment_data,
      money_select: "",
      card_pin: "",
      card_serial: ""
    };
  },
  components: { "my-captcha": myCaptcha },
  mounted() {
    this.createCapcha();
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
    createCapcha() {
      for(let i = 0 ; i < 6 ;i++){
        this.captchaCode+= (Math.ceil(Math.random() * 10) - 1).toString();
      }
    },
    Clear() {},
    Close() {},
    PaidMoney() {}
  }
};
</script>
<style lang="scss" scoped>
#btnPaid,
#btnReInput {
  width: 228px;
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