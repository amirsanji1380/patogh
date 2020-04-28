<template>
  <div>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div class="row no-gutters">
          <div class="col">
            <div class="dx-fieldset">
              <div class="dx-field">
                <div class="dx-field-label" style="width:100px;">
                  <h2>از تاریخ :</h2>
                </div>
                <div class="dx-field-value">
                  <!-- <DxTextBox :value.sync="fromDate" /> -->
                  <DxDateBox
                    :calendar-options="{elementAttr : {'jalaali': '1'}}"
                    date-serialization-format="yyyy-MM-dd"
                    :value.sync="fromDate"
                    display-format="shortdate"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="dx-fieldset">
              <div class="dx-field">
                <div class="dx-field-label" style="width:100px;">
                  <h2>تا تاریخ :</h2>
                </div>
                <div class="dx-field-value">
                  <!-- <DxTextBox :value.sync="toDate" /> -->
                  <!-- <DxDateBox :value.sync="toDate" type="date" /> -->
                  <DxDateBox
                    :calendar-options="{elementAttr : {'jalaali': '1'}}"
                    date-serialization-format="yyyy-MM-dd"
                    :value.sync="toDate"
                    display-format="shortdate"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="dx-fieldset">
              <div class="dx-field">
                <DxButton
                  :width="120"
                  text="گزارش گیری"
                  type="danger"
                  styling-mode="contained"
                  @click="get_customer_inquiry($event)"
                />
              </div>
            </div>
          </div>
        </div>

        <DxPivotGrid
          :allow-sorting="true"
          :allow-sorting-by-summary="true"
          :allow-filtering="true"
          :height="620"
          :show-borders="true"
          :data-source="dataorders"
          row-header-layout="tree"
        >
          <DxHeaderFilter
            :allow-search="allowSearch"
            :show-relevant-values="showRelevantValues"
            :width="300"
            :height="400"
          />
          <DxFieldChooser :allow-search="true" />
          <DxFieldPanel :visible="true" />
          <DxScrolling mode="virtual" />
        </DxPivotGrid>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxPivotGrid,
  DxScrolling,
  DxHeaderFilter,
  DxFieldChooser,
  DxFieldPanel
} from "devextreme-vue/pivot-grid";
const dataSource = createStore({});
import { createStore } from "devextreme-aspnet-data-nojquery";
import axios from "axios";
import "devextreme/data/odata/store";
import { DxDateBox } from "devextreme-vue";
import service from "./data.js";
import { DxButton } from "devextreme-vue";
import DxfaDate from "@/utils/fa-date/fa-date";
// import data from './data.js';

String.prototype.toEnglishDigit = function() {
  var find = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var replace = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};
const toshamsi = function(_date) {
  return new Intl.DateTimeFormat("fa", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(_date)
    .toEnglishDigit();
};
DxfaDate.init();
export default {
  components: {
    DxPivotGrid,
    DxScrolling,
    DxButton,
    DxDateBox,
    DxHeaderFilter,
    DxFieldChooser,
    DxFieldPanel
  },
  data() {
    return {
      allowSearch: true,
      showRelevantValues: true,
      dataorders: [],
      dataSource: {},
      value: new Date(1981, 3, 27),
      fromDate: new Date(), // toshamsi(new Date()),
      toDate: new Date(), //toshamsi(new Date()),

      firstWorkDay2017: new Date(2017, 0, 3),
      min: new Date(1900, 0, 1),
      dateClear: new Date(2015, 11, 1, 6),
      disabledDates: service.getFederalHolidays()
    };
  },
  methods: {
    convertdata(data) {
      //keys.forEach( function(key , index ) {console.log(isNaN(key))})
      var newdata = [];

      // eslint-disable-next-line no-unused-vars
      data.forEach(function(itemobject, index) {
        var newobject = {};
        // eslint-disable-next-line no-unused-vars
        Object.keys(itemobject).forEach(function(keyvalue, newindex) {
          var itemvalue = itemobject[keyvalue];

          var fobj = parseFloat(itemvalue);
          if (isNaN(fobj))
            newobject[keyvalue.toString()] = itemobject[keyvalue];
          else newobject[keyvalue.toString()] = fobj;
        });
        newdata.push(newobject);
      });
      return newdata;
    },
    get_customer_inquiry() {
      let _self = this;
      axios
        .get(
          // `http://ketabtem.ir/patogh/book_server/php/get_customer_inquiry.php`
          `http://ketabtem.ir/patogh/book_server/php/get_customer_inquiry.php?fromDate=${_self.jalaliFromDate}&toDate=${_self.jalaliToDate}`
        )
        .then(
          response =>
            (this.dataorders = {
              remoteOperations: false,

              store: _self.convertdata(response.data),
              fields: [
                {
                  dataField: "0",
                  visible: false
                },
                {
                  dataField: "1",
                  visible: false
                },
                {
                  dataField: "2",
                  visible: false
                },
                {
                  dataField: "3",
                  visible: false
                },
                {
                  dataField: "4",
                  visible: false
                },
                {
                  dataField: "5",
                  visible: false
                },
                {
                  dataField: "6",
                  visible: false
                },
                {
                  dataField: "7",
                  visible: false
                },
                {
                  dataField: "8",
                  visible: false
                },
                {
                  dataField: "9",
                  visible: false
                },
                {
                  dataField: "10",
                  visible: false
                },
                {
                  dataField: "11",
                  visible: false
                },
                {
                  dataField: "12",
                  visible: false
                },
                {
                  dataField: "13",
                  visible: false
                },
                {
                  dataField: "14",
                  visible: false
                },
                {
                  dataField: "15",
                  visible: false
                },
                {
                  dataField: "15",
                  visible: false
                },
                {
                  dataField: "16",
                  visible: false
                },
                {
                  dataField: "vocher_no",
                  visible: false
                },
                {
                  dataField: "crm_cart_no",
                  visible: false
                },
                {
                  caption: "نوع تراکنش",
                  dataField: "type"
                  // sortOrder: "desc",
                  // area: "column"
                  // visible: false
                },
                {
                  caption: "شماره تراکنش",
                  dataField: "trans_no"
                  // visible: false
                  // format: "currency",
                  // summaryType: "sum",
                  // area: "data"
                },
                {
                  caption: "تاریخ تراکنش",
                  dataField: "tran_date"
                  // visible: false
                  // summaryType: "count",
                  // area: "data"
                },
                {
                  caption: "تاریخ تحویل",
                  dataField: "due_date"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "نام مشتری",
                  dataField: "name"
                  // visible: false
                },
                {
                  caption: "نام انبار",
                  dataField: "location_name"
                  // visible: false
                },
                {
                  caption: "کد ارزی",
                  dataField: "curr_code"
                  // summaryType: "sum",
                  // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "قیمت کل",
                  dataField: "TotalAmount",
                  summaryType: "sum",
                  format: "currency",
                  // area: "data",
                  
                },
                {
                  caption: "مبلغ پرداخت شده",
                  dataField: "Allocated",
                   summaryType: "sum",
                  format: "currency",
                  // visible: false
                },
                {
                  caption: "مبلغ مالیات",
                  dataField: "tax_amt",
                  summaryType: "sum",
                  format: "currency",
                  // area: "data"
                  // visible: false
                },
                {
                  caption: "تاریخ تحویل داده شدن تراکنش",
                  dataField: "OverDue"
                  // width: 250,
                  // expanded: true,
                  // sortBySummaryField: 'SalesAmount',
                  // sortBySummaryPath: [],
                  // sortOrder: "desc",
                  // area: "column",
                  // visible: false
                },
                {
                  caption: "ارسال شده",
                  dataField: "send"
                  // sortBySummaryField: 'SalesAmount',
                  // sortBySummaryPath: [],
                  // sortOrder: "desc",
                  // area: "row",
                  // visible: false
                },
                {
                  caption: "تخفیف",
                  dataField: "discount",
                   summaryType: "sum",
                  format: "currency",
                },
                {
                  caption: "کد مشتری",
                  dataField: "debtor_no"
                  // area: "column"
                  // visible: false
                },
                {
                  caption: "شماره سفارش",
                  dataField: "order_"
                  // summaryType: "count",
                  // // format: 'currency',
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد رهگیری",
                  dataField: "reference"
                },
                {
                  caption: "نام بانک",
                  dataField: "bank_account_name"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                }
              ]
            })
        );
    }
  },
  created() {
    this.get_customer_inquiry();
    this.dataSourceConfig = dataSource;
  },
  computed: {
    jalaliFromDate() {
      return toshamsi(new Date(this.fromDate));
      /*
        return new Intl.DateTimeFormat("fa", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        })
          .format(new Date(this.fromDate))
          .toEnglishDigit();
          */
    },
    jalaliToDate() {
      return toshamsi(new Date(this.toDate));
      /* return new Intl.DateTimeFormat("fa", {
           year: "numeric",
           month: "2-digit",
           day: "2-digit"
         })
           .format(new Date(this.toDate))
           .toEnglishDigit();
           */
    },
    diffInDay() {
      return `${Math.floor(
        Math.abs(
          (new Date().getTime() - this.value.getTime()) / (24 * 60 * 60 * 1000)
        )
      )} days`;
    }
  }
};
</script>
