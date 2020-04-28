<template>
  <div>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <h2 class="content-block">گزارش کتاب</h2>

        <dx-data-grid
          class="dx-card wide-card"
          key-expr="ROW"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-resizing-mode="currentMode"
          :remote-operations="remoteOperations"
          :data-source="dataSourceConfig"
          :editing="editing"
          :focused-row-index="0"
          :show-borders="true"
          :focused-row-enabled="true"
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
          <dx-filter-row :visible="true" />
          <dx-column data-field="ROW" caption="ردیف" :width="70" />
          <dx-column data-field="BOOK_NAME" caption="نام کتاب" />
          <dx-column data-field="CAT_GOOD" caption="گروه بندی کالا" />
          <dx-column data-field="AUTHOR" caption="نویسنده"/>
          <dx-column data-field="COVER" caption="قیمت پشت جلد"  />
          <dx-column data-field="EVALUETION" caption="ارزیابی" />
          <dx-column data-field="INFO4" caption="INFO4" />
          <dx-column data-field="JELD" format="currency" caption="نوع جلد" />
          <dx-column data-field="LAST_BUY" caption="LAST_BUY" />
          <dx-column data-field="MAIN_CODE" caption="کد اصلی" />
          <dx-column data-field="MAREF" caption="معارف" />
          <dx-column data-field="ORDER_POINT" caption="نقطه سفارش"/>
          <dx-column data-field="PAPERS" caption="تعداد صفحات"/>
          <dx-column data-field="PUBLISHER" caption="ناشر" />
          <dx-column data-field="SALE_LEVEL" caption="نقطه فروش" />
          <dx-column data-field="SHABAK" caption="شابک" />
          <dx-column data-field="SIZE" caption="اندازه" />
          <dx-column data-field="SUBJECT" caption="موضوع" />
          <dx-column data-field="SUB_CODE" caption="کد فرعی" />
          <dx-column data-field="SYSTEM_CODE" caption="کد سیستمی" />
          <dx-column data-field="TIRAJ" caption="تیراژ" />
          <dx-column data-field="TRANSLATOR" caption="مترجم" />
          <dx-column data-field="TYPE_BUY" caption="TYPE_BUY" />
          <DxSummary>
            <DxTotalItem
              column="ROW"
              summary-type="count"
              display-format="{0}:num"
              :show-in-group-footer="true"
            />
            <DxTotalItem
              column="LAST_BUY"
              summary-type="sum"
              display-format="{0}:sum"
              :show-in-group-footer="true"
            />
          </DxSummary>
        </dx-data-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { createStore } from "devextreme-aspnet-data-nojquery";
import "devextreme/data/odata/store";

const url = `http://ketabtem.ir/patogh/book_server/php/service.php`;
const dataSource = createStore({
  key: "ROW",
  loadUrl: `${url}?METHOD=GET`,
  insertUrl: `${url}?METHOD=POST`,
  updateUrl: `${url}?METHOD=PUT`,
  deleteUrl: `${url}?METHOD=DELETE`,
  updateMethod: "POST",
  insertMethod: "POST",
  deleteMethod: "POST"
});
import DxDataGrid, {
  DxExport,
  DxColumn,
  DxTotalItem,
  DxSummary,
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

export default {
  data() {
    return {
      resizingModes: ["nextColumn", "widget"],
      currentMode: "nextColumn",
      screen(width) {
        return width < 700 ? "sm" : "lg";
      },
      filterBuilderPopupPosition: {
        of: window,
        at: "top",
        my: "top",
        offset: { y: 10 }
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
        grouping: true,
        groupPaging: true,
        paging: true,
        sorting: true,
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
      }
    };
  },
  methods: {
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
    this.dataSourceConfig = dataSource;
  },
  components: {
    DxGrouping,
    DxGroupPanel,
    DxTotalItem,
    DxSummary,
    DxColumnFixing,
    DxDataGrid,
    DxColumn,
    DxHeaderFilter,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxExport,
    DxColumnChooser
  }
};
</script>
