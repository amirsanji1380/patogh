<template>
  <div>
    <div class="content-block dx-card responsive-paddings">
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
                @click="get_sum_customer_invoice($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="tabs">
        <div class="caption"></div>
        <DxTabs :data-source="tabs" :selected-index.sync="selectedIndex" />
      </div>
    </div>
  </div>
</template>
<script>
// import DxSelectBox from 'devextreme-vue/select-box';
// import { createStore } from "devextreme-aspnet-data-nojquery";
import DxTabs from "devextreme-vue/tabs";
import { DxDateBox } from "devextreme-vue";
// import {DxTextBox} from 'devextreme-vue';
import service from "./data.js";
import { DxButton } from "devextreme-vue";
import { tabs } from "./data.js";
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

export default {
  components: {
    // DxSelectBox,
    DxTabs,
    DxButton,
    DxDateBox
  },
  data() {
    return {
      selectedIndex: 0,
      tabs,
      value: new Date(1981, 3, 27),
      fromDate: new Date(), // toshamsi(new Date()),
      toDate: new Date(), //toshamsi(new Date()),

      firstWorkDay2017: new Date(2017, 0, 3),
      min: new Date(1900, 0, 1),
      dateClear: new Date(2015, 11, 1, 6),
      disabledDates: service.getFederalHolidays()
    };
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