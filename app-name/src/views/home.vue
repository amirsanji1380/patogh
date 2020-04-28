<template>
  <div class="content-block">
    <div class="dx-card responsive-paddings">
      <DxChart
        id="chart"
        :data-source="dataSource"
        title="Gross State Product within the Great Lakes Region"
        @pointClick="onPointClick"
      >
        <DxCommonSeriesSettings
          argument-field="state"
          type="bar"
          hover-mode="allArgumentPoints"
          selection-mode="allArgumentPoints"
        >
          <DxLabel :visible="true">
            <DxFormat :precision="0" type="fixedPoint" />
          </DxLabel>
        </DxCommonSeriesSettings>
        <DxSeries value-field="year2004" name="2004" />
        <DxSeries value-field="year2001" name="2001" />
        <DxSeries value-field="year1998" name="1998" />
        <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />
        <DxExport :enabled="true" />
      </DxChart>
    </div>
  </div>
</template>
 
<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

// import CustomStore from 'devextreme/data/custom_store';
import { createStore } from "devextreme-aspnet-data-nojquery";
// import { DxChart } from "devextreme-vue/chart";
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
  DxExport
} from 'devextreme-vue/chart';
export default {
   components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLabel,
    DxFormat,
    DxLegend,
    DxExport
  },
  data() {
    const serviceUrl = "https://url/to/my/service";
    const store = createStore({
      loadUrl: serviceUrl
    });
    return {
      dataSource:store
    };
  },
    methods: {
    onPointClick({ target }) {
      target.select();
    }
  }
};
</script>
 

<style lang="scss">
</style>
