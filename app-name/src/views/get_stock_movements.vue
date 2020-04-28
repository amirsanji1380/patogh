<template>
  <div class="content-block">
    <div class="dx-card responsive-paddings">
      <div class="row no-gutters">
        <div class="col">
          <div class="dx-fieldset">
            <div class="dx-field">
              <div class="dx-field-label" style="width:110px;">
                <h2>از تاریخ :</h2>
              </div>
              <div class="dx-field-value">
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
              <div class="dx-field-label" style="width:110px;">
                <h2>تا تاریخ :</h2>
              </div>
              <div class="dx-field-value">
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
              <div class="dx-field-label" style="width:60px;">
                <h2>انبار :</h2>
              </div>
              <div class="dx-field-value">
                <DxSelectBox
                  :data-source="locations"
                  placeholder="انتخاب انبار"
                  display-expr="name"
                  value-expr="id"
                  :value.sync="location"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="dx-fieldset">
            <div class="dx-field">
              <div class="dx-field-label" style="width:60px;">
                <h2>کالا :</h2>
              </div>
              <div class="dx-field-value">
                <DxTextBox placeholder="انتخاب کالا" :value.sync="stock_id" @value-changed="handleValueChange" />
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
                @click="get_stock_movements($event)"
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
import service from "./data.js";
import DxfaDate from "@/utils/fa-date/fa-date";
import { DxButton, DxDateBox, DxSelectBox } from "devextreme-vue";
import { DxTextBox } from 'devextreme-vue/text-box';

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
    DxSelectBox,
    DxTextBox,
  },
  data() {
    return {
      stock_id: "",
      location: Location.id,
      locations: [
        { name: "انبار مرکزی", id: 1 },
        { name: "انبار خرید", id: 2 },
        { name: "فروشگاه اراک", id: 3 },
        { name: "فروشگاه ارومیه", id: 4 },
        { name: "فروشگاه تهران کالج", id: 5 },
        { name: "فروشگاه اصفهان", id: 6 },
        { name: "فروشگاه اهواز", id: 7 },
        { name: "فروشگاه ایلام", id: 8 },
        { name: "فروشگاه بجنورد", id: 9 },
        { name: "فروشگاه بندر عباس", id: 10 },
        { name: "فروشگاه بیرجند", id: 11 },
        { name: "فروشگاه تهران شعبه اسکو", id: 12 },
        { name: "فروشگاه رشت", id: 13 },
        { name: "فروشگاه زنجان", id: 14 },
        { name: "فروشگاه ساری", id: 15 },
        { name: "فروشگاه سمنان", id: 16 },
        { name: "فروشگاه شهرکرد", id: 17 },
        { name: "فروشگاه شیراز", id: 18 },
        { name: "فروشگاه فرهنگ و اندیشه", id: 19 },
        { name: "فروشگاه قزوین", id: 20 },
        { name: "فروشگاه قم (روبروی بیت)", id: 20 },
        { name: "فروشگاه کرج", id: 21 },
        { name: "فروشگاه کرمان", id: 22 },
        { name: "فروشگاه کرمانشاه", id: 23 },
        { name: "فروشگاه گرگان", id: 24 },
        { name: "فروشگاه مرکزی قم", id: 25 },
        { name: "فروشگاه مشهد شعبه یک", id: 26 },
        { name: "فروشگاه مشهد شعبه دو", id: 27 },
        { name: "فروشگاه یاسوج", id: 28 },
        { name: "فروشگاه یزد", id: 29 },
        { name: "فروشگاه زاهدان", id: 30 },
        { name: "فروشگاه مشهد شعبه سه", id: 31 },
        { name: "فروشگاه تبریز", id: 32 },
        { name: "انبار واسط مرجوعی", id: 33 },
        { name: "فروشگاه سبزوار", id: 34 },
        { name: "فروشگاه بردسکن", id: 35 },
        { name: "فروشگاه تربت حیدریه", id: 36 },
        { name: "نمایشگاه", id: 37 }
      ],
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
    get_stock_movements() {
      let _self = this;
      axios
        .get(
          // `http://ketabtem.ir/patogh/book_server/php/get_stock_movements.php`
          `http://ketabtem.ir/patogh/book_server/php/get_stock_movements.php?fromDate=${_self.jalaliFromDate}&toDate=${_self.jalaliToDate}&loc_code=${_self.location}&stock_id=${_self.stock_id}`
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
                  caption: "نوع تراکنش",
                  dataField: "type"
                },
                {
                  caption: "شماره تراکنش",
                  dataField: "trans_no"

                  // area: "data"
                  // visible: false
                },
                {
                  caption: "تاریخ تراکنش",
                  dataField: "tran_date"

                  // area: "data"
                },
                {
                  caption: "کد شخص",
                  dataField: "person_id"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "تعداد",
                  dataField: "qty"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "کد رهگیری",
                  dataField: "reference"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "ارزش ریالی(تعداد * قیمت)",
                  dataField: "cost"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "نام انبار",
                  dataField: "location_name"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "قیمت",
                  dataField: "standard_cost"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "قیمت تمام شده",
                  dataField: "sum_diff"
                  // visible: false
                  // area: "data"
                },
                {
                  caption: "زمان ثبت",
                  dataField: "time2"
                  // visible: false
                  // area: "data"
                }
              ]
            })
        );
    }
  },
  created() {
    this.get_stock_movements();
    this.dataSourceConfig = dataSource;
  },
  computed: {
    jalaliFromDate() {
      return toshamsi(new Date(this.fromDate));
    },
    jalaliToDate() {
      return toshamsi(new Date(this.toDate));
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
