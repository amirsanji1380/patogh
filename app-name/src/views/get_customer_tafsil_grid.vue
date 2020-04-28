<template>
  <div>
    <!-- {{ jalaliFromDate }} -->
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
                  @click="get_customer_tafsil_grid($event)"
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
            <dx-column data-field="account" caption="account"  />
            <dx-column data-field="account_code" caption="account_code"  />
            <dx-column data-field="account_code2" caption="account_code2"  />
            <dx-column data-field="account_name" caption="account_name"  />
            <dx-column data-field="account_nature" caption="account_nature"  />
            <dx-column data-field="account_type" caption="account_type"  />
            <dx-column data-field="alloc" caption="alloc"  />
            <dx-column data-field="amount" caption="amount"  />
            <dx-column data-field="balance" caption="balance"  />
            <dx-column data-field="bol" caption="bol"  />
            <dx-column data-field="branch_code" caption="branch_code"  />
            <dx-column data-field="counter" caption="counter"  />
            <dx-column data-field="date_" caption="date_"  />
            <dx-column data-field="debtor_no" caption="debtor_no"  />
            <dx-column data-field="debtor_trans_id" caption="debtor_trans_id"  />
            <dx-column data-field="dimension2_id" caption="dimension2_id"  />
            <dx-column data-field="dimension3_id" caption="dimension3_id"  />
            <dx-column data-field="dimension_id" caption="dimension_id"  />
            <dx-column data-field="due_date" caption="due_date"  />
            <dx-column data-field="end_due_date" caption="end_due_date"  />
            <dx-column data-field="hardserial" caption="hardserial"  />
            <dx-column data-field="id" caption="id"  />
            <dx-column data-field="inactive" caption="inactive"  />
            <dx-column data-field="insert_time" caption="insert_time"  />
            <dx-column data-field="is_tafsil" caption="is_tafsil"  />
            <dx-column data-field="memo_" caption="memo_"  />
            <dx-column data-field="order_" caption="order_"  />
            <dx-column data-field="ov_agent_portion" caption="ov_agent_portion"  />
            <dx-column data-field="ov_amount" caption="ov_amount"  />
            <dx-column data-field="ov_amt_disc_cart" caption="ov_amt_disc_cart"  />
            <dx-column data-field="ov_discount" caption="ov_discount"  />
            <dx-column data-field="ov_freight" caption="ov_freight"  />
            <dx-column data-field="ov_freight_tax" caption="ov_freight_tax"  />
            <dx-column data-field="ov_gst" caption="ov_gst"  />
            <dx-column data-field="ov_insurance" caption="ov_insurance"  />
            <dx-column data-field="ov_salary_tax" caption="ov_salary_tax"  />
            <dx-column data-field="permanent" caption="permanent"  />
            <dx-column data-field="person_id" caption="person_id"  />
            <dx-column data-field="person_type_id" caption="person_type_id"  />
            <dx-column data-field="prt" caption="prt"  />
            <dx-column data-field="quot_no" caption="quot_no"  />
            <dx-column data-field="rate" caption="rate"  />
            <dx-column data-field="reference" caption="reference"  />
            <dx-column data-field="required_registration_dimension" caption="required_registration_dimension"  />
            <dx-column data-field="send" caption="send"  />
            <dx-column data-field="ship_via" caption="ship_via"  />
            <dx-column data-field="special_account" caption="special_account"  />
            <dx-column data-field="supp_reference" caption="supp_reference"  />
            <dx-column data-field="temporary" caption="temporary"  />
            <dx-column data-field="time_to_sale" caption="time_to_sale"  />
            <dx-column data-field="tpe" caption="tpe"  />
            <dx-column data-field="tran_date" caption="tran_date"  />
            <dx-column data-field="trans_link" caption="trans_link"  />
            <dx-column data-field="trans_no" caption="trans_no"  />
            <dx-column data-field="trans_no_softsale" caption="trans_no_softsale"  />
            <dx-column data-field="type" caption="type"  />
            <dx-column data-field="type_no" caption="type_no"  />
          </dx-data-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createStore } from "devextreme-aspnet-data-nojquery";
import "devextreme/data/odata/store";
import { DxDateBox } from "devextreme-vue";
// import {DxTextBox} from 'devextreme-vue';
import { DxButton } from "devextreme-vue";
// import { DxSelectBox } from 'devextreme-vue';
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
    get_customer_tafsil_grid() {
      let _self = this;
      axios
        .get(
          `http://ketabtem.ir/patogh/book_server/php/get_customer_tafsil.php?fromDate=${_self.jalaliFromDate}&toDate=${_self.jalaliToDate}`
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
    this.get_customer_tafsil_grid();
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
    DxDateBox
    // DxSelectBox,
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