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
            <v-select
              :items="providers"
              label="Provider"
              v-model="provider_selected"
              item-text="provider_name"
              item-value="value"
              dense
              solo
            ></v-select>
            <v-select
              :items="showSelect.data"
              item-text="money"
              item-value="money"
              label="Amount"
              v-model="money_select"
              dense
              solo
            ></v-select>
            <v-text-field dense label="Card Pin" solo v-model="card_pin"></v-text-field>
            <v-text-field dense label="Card Serial" solo v-model="card_serial"></v-text-field>
            <v-row no-gutters>
              <v-col cols="5" sm="5" md="5">
                <v-text-field dense label="Capcha" solo></v-text-field>
              </v-col>
              <v-col cols="2" sm="2" md="2"></v-col>
              <v-col cols="5" sm="5" md="5">
                <my-captcha
                  :callSuccess="captchaOk"
                  color="orange"
                  resolve="digit"
                  style="background-color:white;background-size: contain"
                ></my-captcha>
              </v-col>
            </v-row>
            <br />
            <!-- Button -->
            <v-row no-gutters>
              <v-col cols="6" sm="6" md="6">
                <button id="btnPaid" @click="PaidMoney">
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
                  <th scope="col">
                    <h2 style="color:white">Purchase</h2>
                  </th>
                  <th scope="col">
                    <h2 style="color:white">Poker Chips</h2>
                  </th>
                  <th scope="col">
                    <h2 style="color:white">Bonus</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="result in showSelect.data" :key="result.id">
                  <td>{{result.money}}</td>
                  <td>{{result.chip}}</td>
                  <td>{{result.bonus}}</td>
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

export default {
  data() {
    return {
      provider_selected: [],
      providers: window.payment,
      money_select: "",
      card_pin: "",
      card_serial: ""
    };
  },
  components: { "my-captcha": myCaptcha },

  computed: {
    showSelect() {
      return this.provider_selected;
    }
  },
  methods: {
    captchaOk() {
      console.log("captcha ok.!");
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