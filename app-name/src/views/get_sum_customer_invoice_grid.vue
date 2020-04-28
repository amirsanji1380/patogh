<template>
  <div>
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

        <div>
          <dx-data-grid
            class="dx-card wide-card"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            :column-resizing-mode="currentMode"
            :data-source="dataorders"
            :focused-row-index="0"
            :show-borders="true"
            :column-auto-width="true"
            :column-hiding-enabled="false"
          >
            <DxColumnFixing :enabled="true" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="autoExpandAll" />
            <DxSearchPanel :visible="true" />
            <dx-paging :page-size="10" />
            <dx-pager :show-page-size-selector="true" :show-info="true" />
            <DxExport :enabled="true" :customize-excel-cell="customizeExcelCell" />
            <DxColumnChooser :enabled="true" mode="select" />
            <DxFilterRow :visible="true" />
            <DxFilterPanel :visible="true" />
            <DxFilterBuilderPopup :position="filterBuilderPopupPosition" />
            <DxHeaderFilter :visible="true" />
            <DxExport :enabled="true" :customize-excel-cell="customizeExcelCell" />
            <dx-column data-field="0" caption="عنوان مشتری"  :allow-sorting="false"/>
            <dx-column data-field="1" caption="کد شعبه" />
            <dx-column data-field="2" caption="شماره همراه"></dx-column>
            <dx-column data-field="3" caption="کد مشتری" :allow-sorting="true" />
            <dx-column data-field="5" caption="تعداد فاکتور" :allow-sorting="false" />
            <dx-column
              data-field="6"
              data-type="number"
              format="currency"
              caption="پرداخت شده فاکتور"
              :allow-sorting="false"
            />>
            <dx-column data-field="7" data-type="number" format="currency" caption="باز فاکتور" :allow-sorting="false" />
            <dx-column data-field="8" data-type="number" format="currency" caption="مبلغ فاکتور" :allow-sorting="false" />
            <dx-column data-field="9" data-type="number" format="currency" caption="بدهکار" :allow-sorting="false" />
          </dx-data-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createStore } from "devextreme-aspnet-data-nojquery";
import "devextreme/data/odata/store";

import { DxButton,DxSelectBox,DxDateBox } from "devextreme-vue";

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

const dataSource = createStore({});
import DxDataGrid, {
  DxExport,
  DxColumn,
  DxColumnFixing,
  DxGrouping,
  DxGroupPanel,
  DxHeaderFilter,
  DxFilterRow,
  DxFilterPanel,
  DxFilterBuilderPopup,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxColumnChooser
} from "devextreme-vue/data-grid";
import axios from "axios";
import service from "./data.js";
import DxfaDate from "@/utils/fa-date/fa-date";

DxfaDate.init();
export default {
  data() {
    return {
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
      dataorders: [],
      resizingModes: ["nextColumn", "widget"],
      currentMode: "nextColumn",
      screen(width) {
        return width < 700 ? "sm" : "lg";
      },
      filterBuilderPopupPosition: {
        of: window,
        at: "top",
        my: "top",
        offset: {
          y: 10
        }
      },
      filterBuilder: {
        customOperations: [
          {
            name: "weekends",
            caption: "Weekends",
            dataTypes: ["date"],
            icon: "check",
            hasValue: false
          }
        ]
      },
      filterValue: [
        ["Employee", "=", "Clark Morgan"],
        "and",
        ["OrderDate", "weekends"]
      ],
      saleAmountHeaderFilters: [
        {
          text: "Less than $3000",
          value: ["SaleAmount", "<", 3000]
        },
        {
          text: "$3000 - $5000",
          value: [
            ["SaleAmount", ">=", 3000],
            ["SaleAmount", "<", 5000]
          ]
        },
        {
          text: "$5000 - $10000",
          value: [
            ["SaleAmount", ">=", 5000],
            ["SaleAmount", "<", 10000]
          ]
        },
        {
          text: "$10000 - $20000",
          value: [
            ["SaleAmount", ">=", 10000],
            ["SaleAmount", "<", 20000]
          ]
        },
        {
          text: "Greater than $20000",
          value: ["SaleAmount", ">=", 20000]
        }
      ],
      remoteOperations: {
        filtering: true,
        grouping: false,
        groupPaging: true,
        paging: false,
        sorting: false,
        summary: true
      },
      autoExpandAll: true,
      editing: {
        mode: "popup",
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true
      },
      headerFilter: {
        visible: true
      },
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
    get_sum_customer_invoice() {
      let _self = this;
      axios
        .get(
          `http://ketabtem.ir//patogh/book_server/php/get_sum_customer_invoice.php?fromDate=${_self.jalaliFromDate}&toDate=${_self.jalaliToDate}&location=${_self.location}`
        )
        .then(response => (this.dataorders = response.data));
    },
    changeResizingMode(data) {
      this.currentMode = data.value;
    },
    customizeExcelCell(options) {
      var gridCell = options.gridCell;
      if (!gridCell) {
        return;
      }

      if (gridCell.rowType === "data") {
        if (gridCell.data.OrderDate < new Date(2014, 2, 3)) {
          options.font.color = "#AAAAAA";
        }
        if (gridCell.data.SaleAmount > 15000) {
          if (gridCell.column.dataField === "OrderNumber") {
            options.font.bold = true;
          }
          if (gridCell.column.dataField === "SaleAmount") {
            options.backgroundColor = "#FFBB00";
            options.font.color = "#000000";
          }
        }
      }

      if (gridCell.rowType === "group") {
        if (gridCell.groupIndex === 0) {
          options.backgroundColor = "#BEDFE6";
        }
        if (gridCell.groupIndex === 1) {
          options.backgroundColor = "#C9ECD7";
        }
        if (gridCell.column.dataField === "Employee") {
          options.value = `${gridCell.value} (${gridCell.groupSummaryItems[0].value} items)`;
          options.font.bold = false;
        }
        if (gridCell.column.dataField === "SaleAmount") {
          options.value = gridCell.groupSummaryItems[0].value;
          options.numberFormat = "&quot;Max: &quot;$0.00";
        }
      }

      if (
        gridCell.rowType === "groupFooter" &&
        gridCell.column.dataField === "SaleAmount"
      ) {
        options.value = gridCell.value;
        options.numberFormat = "&quot;Sum: &quot;$0.00";
        options.font.italic = true;
      }

      if (
        gridCell.rowType === "totalFooter" &&
        gridCell.column.dataField === "SaleAmount"
      ) {
        options.value = gridCell.value;
        options.numberFormat = "&quot;Total Sum: &quot;$0.00";
      }
    }
  },
  created() {
    this.get_sum_customer_invoice();
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
  },
  components: {
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxColumnFixing,
    DxDataGrid,
    DxHeaderFilter,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxExport,
    DxColumnChooser,
    // DxTextBox,
    DxButton,
    DxDateBox,
    DxSelectBox,
  }
};
</script>
<style>
.buttons > div {
  width: 300px;
  flex-wrap: nowrap;
  display: flex;
}
</style>