<template>
  <div>

    <div class="container-fluid mt-3">

      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-1">
            <div class="card-body">
              <h3 class="card-title text-white">近一周采购金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ 4565</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-sold-out"></i></span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-2">
            <div class="card-body">
              <h3 class="card-title text-white">近一周销售金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ 8541</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-shopping-cart-2"></i></span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-3">
            <div class="card-body">
              <h3 class="card-title text-white">近一周采购量</h3>
              <div class="d-inline-block">
                <h2 class="text-white">4565</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-ice-cream"></i></span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="card gradient-4">
            <div class="card-body">
              <h3 class="card-title text-white">近一周销售量</h3>
              <div class="d-inline-block">
                <h2 class="text-white">1572</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-hot-water"></i></span>
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
            type: 'datetime',
            categories: []
          },
          tooltip: {
            x: {
              format: 'yyyy-MM-dd'
            },
          },
        },
      }
    },

    created() {
      this.getData();
    },
    components: {},
    methods: {

      getData() {
        this.$getAxios("/home/getData",null).then(result => {
          console.log(result);
        })
      }

    }

  }
</script>

<style scoped>

  @import "../../assets/css/style.css";

</style>
