<template>
  <div>

    <div class="container-fluid mt-3">

      <div class="row">
        <div class="col-lg-6 col-sm-6">
          <div class="card gradient-1">
            <div class="card-body">
              <h3 class="card-title text-white">近一月进货金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ {{CountMoney.inMoney}} 元</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-sold-out"></i></span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6">
          <div class="card gradient-2">
            <div class="card-body">
              <h3 class="card-title text-white">近一月销售金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ {{CountMoney.outMoney}} 元</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-shopping-cart-2"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div id="chart">
                  <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    props: {},

    data() {
      return {
        CountMoney:{
          inMoney : '',
          outMoney : '',
        },
        series: [{
          name: '销售量',
          data: []
        }, {
          name: '采购量',
          data: []
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: ["六天前", "五天前", "四天前", "三天前", "二天前", "一天前", "今日"]
          },
        },
      }
    },

    created() {
      this.getData();
    },
    mounted() {

    },
    components: {},
    methods: {

      getData() {
        let that = this;
        this.$getAxios("/home/getData",null).then(result => {
          that.CountMoney.inMoney = result.data.currentMonthDataBuy;
          that.CountMoney.outMoney = result.data.currentMonthDataSell;
          let listout = JSON.parse(JSON.stringify(result.data.listOut));
          let listIn = JSON.parse(JSON.stringify(result.data.listIn));
          that.series[0].data = listout;
          that.series[1].data= listIn;
        })
      }

    },
    watch: { // 监听到数据然后赋值
      chartOptions (newV, oldV) {
        this.chartOptions = newV;
      },
      series :{
        handler(val, oldVal){
          console.log("b.value: "+val.value, oldVal.value);//但是这两个值打印出来却都是一样的
          this.series = val
        },

      },
    },

  }
</script>

<style scoped>

  @import "../../assets/css/style.css";

</style>
