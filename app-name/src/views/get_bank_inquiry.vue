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
                <div class="dx-field-label" style="width:100px;">
                  <h2>  بانک :</h2>
                </div>
                <div class="dx-field-value">
                  <DxTextBox placeholder="کد بانک مورد نظر را وارد نمایید"  :value.sync="bank_code" />
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
                  @click="get_bank_inquiry($event)"
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
import { DxDateBox,DxTextBox } from "devextreme-vue";
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
    DxFieldPanel,
    DxTextBox
  },
  data() {
    return {
      bank_code:"",
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
    get_bank_inquiry() {
      let _self = this;
      axios
        .get(
          // `http://ketabtem.ir/patogh/book_server/php/get_bank_inquiry.php`
          `http://ketabtem.ir/patogh/book_server/php/get_bank_inquiry.php?fromDate=${_self.jalaliFromDate}&toDate=${_self.jalaliToDate}$bank_act=${_self.bank_code}`
        )
        .then(
          response =>
            (this.dataorders = {
              remoteOperations: false,

              store: _self.convertdata(response.data),
              fields: [
                {
                  caption: "شماره ردیف",
                  dataField: "id"
                  // summaryType: "count",
                  // // format: 'currency',
                  // area: "data",
                  // visible: false
                },
                {
                  dataField: "0",
                  visible: false
                },
                {
                  dataField: "SUM(amount)",
                  visible: false
                },
                {
                  caption: "نوع تراکنش",
                  dataField: "type"
                },
                {
                  caption: "شماره تراکنش",
                  dataField: "trans_no"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد بانک",
                  dataField: "bank_act"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد رهگیری",
                  dataField: "ref"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "تاریخ تراکنش",
                  dataField: "trans_date"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "مبلغ",
                  dataField: "amount"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "مرکز هزینه",
                  dataField: "dimension_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "مرکز هزینه2",
                  dataField: "dimension2_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "نوع شخص",
                  dataField: "person_type_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد شخص",
                  dataField: "person_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "تاریخ تطبیق چک",
                  dataField: "reconciled"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "شماره چک",
                  dataField: "cheque_no"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "معین چک",
                  dataField: "cheque_account"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "بانک چک",
                  dataField: "cheque_bank"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "چک/سایر موارد",
                  dataField: "is_cheque"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "ضریب ارزی",
                  dataField: "rate"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "شماره ردیف چک",
                  dataField: "cheque_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "نقطه فروش",
                  dataField: "pos"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "تاریخ چک",
                  dataField: "cheque_date"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "مبلغ چک",
                  dataField: "cheque_amount"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "نوع صاحب چک",
                  dataField: "cheque_owner_type"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد صاحب چک",
                  dataField: "cheque_owner_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "برگشت خورده",
                  dataField: "returned"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "پشت نمره",
                  dataField: "cheque_code"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "باطل شده",
                  dataField: "void"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "کد دسته چک",
                  dataField: "ch_category_id"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "نقطه فروش  جاری چک",
                  dataField: "current_cheque_pos"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
                {
                  caption: "توضیحات",
                  dataField: "memo_"
                  // summaryType: "sum",
                  // // format: "currency",
                  // area: "data",
                  // visible: false
                },
              ]
            })
        );
    }
  },
  created() {
    this.get_bank_inquiry();
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
