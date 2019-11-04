<template>
  <div id="payment_layout">
    <br />
    <v-img class="white--text align-end" height="100%" src="../../assets/payment/Banner.png"></v-img>
    <hr class="hr-text" data-content="NẠP CHIP QUA THẺ CÀO" />
    <v-card-text class="text--primary">
      <v-container>
        <v-row no-gutters>
          <v-col cols="6" sm="6" md="6">
            <v-select
              :items="all_providers"
              label="Provider"
              v-model="provider_selected"
              dense
              solo
            ></v-select>
            <v-select :items="all_providers" label="Amount" v-model="amount_selected" dense solo></v-select>
            <v-text-field dense label="Card Pin" solo></v-text-field>
            <v-text-field dense label="Card Serial" solo></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6"></v-col>
        </v-row>

        <!-- <v-row no-gutters>
          <v-col cols="6" md="4">
            <v-subheader>
              <h2 style="color:white">Loại thẻ</h2>
            </v-subheader>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-row class="mb-6">
              <v-col
                v-for="logo in logo_payments"
                :key="logo.id"
                :class="(12%logo_payments.length === 0) ? `col-md-${12/logo_payments.length} md-${12/logo_payments.length}`:'col-md-2 md-2'"
                cols="12"
              >
                <a v-bind:href="logo.refTo">
                  <img v-bind:src="require(`../../assets/payment/${logo.url}`)" />
                </a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>-->
        <br />
      </v-container>
    </v-card-text>
    <br />
    <br />
  </div>
</template>
<script>
import APIServices from "../../services/api";
export default {
  data() {
    return {
      provider_selected: "",
      providers: [],
      // @example: provider_selected: "VIETTEL",
      // @example: providers: ["VIETTEL", "MOBIFONE", "VINAPHONE", "GATE"],

      amount_selected: "",
      amounts: [],
      // @example: amount_selected: "10.000 VND",
      // @example: amounts: ['10.000 VND','20.000 VND','50.000 VND','100.000 VND'],
      all_providers: []
      /* @example : all_providers : [
        {
          provider_name : 'Viettel',
          amount_money : [10,20,50,100,200,500],
          bonus: [1,2,5,10,20,50]
        },{
          provider_name : 'Mobifone',
          amount_money : [10,20,30,50,100,200],
          bonus: [1,2,3,5,10,20]
        },{
          provider_name : 'Vinaphone',
          amount_money : [20,30,50,100,200,500],
          bonus: [2,3,5,10,20,50]
        }
      ] */
    };
  },
  mounted() {
    this.getProviderList();
  },
  methods: {
    async getProviderList() {
      var tableProvider = await APIServices.getProviderList();
      tableProvider.data.forEach(element => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.v-select__selection {
  width: 100%;
  justify-content: center;
}
#payment_layout {
  background-image: url("../../assets/payment/BG.png");
}
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
}
</style>