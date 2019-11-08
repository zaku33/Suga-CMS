<template>
  <div id="payment_layout">
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
   
    >
      <v-avatar>
        <img src="../../assets/payment/Close.png" alt="John" />
      </v-avatar>
    </v-btn> -->
    <v-row style="max-height: fit-content;">
      <v-col cols="5" sm="5" md="5">
        <img src="../../assets/payment/Line.png" style="width:100%" />
      </v-col>
      <v-col cols="2" sm="2" md="2" style="width:100%;text-align:center">
        <a style="color:white">LỊCH SỬ GIAO DỊCH</a>
      </v-col>

      <v-col cols="5" sm="5" md="5">
        <img
          src="../../assets/payment/Line.png"
          style="-webkit-transform: scaleX(-1);transform: scaleX(-1);width:100%"
        />
      </v-col>
    </v-row>
    <div id="tableRow">
      <v-data-table
        :headers="headers"
        :items="(dataBody.length>0)?dataBody :desserts"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        hide-default-footer
        class="elevation-1"
        :mobile-breakpoint="0"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{item.date!=null ? moment(item.date).format("YYYY-MM-DD HH:mm:ss A") : null}}</td>
              <td>{{item.transactionId || null}}</td>
              <td>{{item.amount!=null ? Number(item.amount.toFixed(1)).toLocaleString(): null}} {{item.currency || "VND"}}</td>
              <td>{{item.chips || null}}</td>
              <td>
                <img src="../../assets/history/Viettel.png" id="CardIcon" />
                {{item.serviceName || null}}
              </td>
              <td>{{item.status || null}}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount" :total-visible="totalVisiblePagination"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { token, imgDefine , history_data } from "../../define/data";
import { GetHistory, PaymentAPI } from "../../controller/payment";
export default {
  data() {
    return {
      moment: moment,
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      totalVisiblePagination: 7,
      headers: [
        {
          text: "THỜI ĐIỂM GIAO DỊCH",
          align: "left",
          sortable: false,
          value: "date"
        },
        {
          text: "MÃ GIAO DỊCH",
          align: "left",
          sortable: false,
          value: "transactionId"
        },
        {
          text: "GÓI NẠP",
          align: "left",
          sortable: false,
          value: "amount"
        },
        {
          text: "MỆNH GIÁ",
          align: "left",
          sortable: false,
          value: "carbs"
        },
        {
          text: "PHƯƠNG THỨC THANH TOÁN",
          align: "left",
          sortable: false,
          value: "serviceName"
        },
        {
          text: "TRẠNG THÁI",
          align: "left",
          sortable: false,
          value: "status"
        }
      ],
      dataBody: [],
      desserts: history_data,
      imageDefined: imgDefine
    };
  },
  computed: {
    currPage() {
      return this.page;
    }
  },
  mounted() {
    this.dataTableServerSide();
  },
  methods: {
    async dataTableServerSide() {
      let url = "https://payment.aceplayx.com/api/payment/stores/transactions";
      let header = { authorization: token };
      let dataResponse = await PaymentAPI("get", url, header);
      this.dataBody = dataResponse.data.data.transactions;
    }
  }
};
</script>
<style lang="scss">
#CardIcon {
  width: 100px;
  padding-top: 2px;
  padding-bottom: 2px;
}
div#tableRow {
  margin-left: 30px;
  margin-right: 30px;
}
table thead tr th,
table tbody tr td {
  border-left: 2px solid red;
}
table {
  justify-content: center;
  border-bottom: 2px solid red;
  border-top: 2px solid red;
  border-right: 2px solid red;
}
thead.v-data-table-header {
  background-image: url("../../assets/payment/TableBG.png");
  background-size: auto;
  background-repeat: repeat;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(141, 20, 20, 0.103);
}
#price_list_body {
  background-color: white;
}
.v-select__selection {
  width: 100%;
  justify-content: center;
}
#payment_layout {
  background-image: url("../../assets/payment/BG.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>