<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="查询时间">
          <el-date-picker
            style="width: 280px"
            v-model="formInline.dataRange"
            type="datetimerange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="btn btn-primary btn-block" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="row" style="margin-top: 15px">
        <div class="col-lg-6 col-sm-6">
          <div class="card gradient-1">
            <div class="card-body">
              <h3 class="card-title text-white">进货金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ {{(CountMoney.inMoney == null || CountMoney.inMoney == '') ? 0 : CountMoney.inMoney }} 元</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-sold-out"></i></span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6">
          <div class="card gradient-2">
            <div class="card-body">
              <h3 class="card-title text-white">销售金额</h3>
              <div class="d-inline-block">
                <h2 class="text-white">$ {{(CountMoney.outMoney == null || CountMoney.outMoney == '') ? 0 : CountMoney.outMoney}} 元</h2>
              </div>
              <span class="float-right display-5 opacity-5"><i class="el-icon-shopping-cart-2"></i></span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {

      created() {
        this.getData();
      },
      data() {
        return {
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          CountMoney:{
            inMoney : 0,
            outMoney : 0
          },
          formInline : {
            dataRange : [],
          },
          value2: ''
        }
      },
      methods:{
        getData(){
          let _self = this;
          _self.$postAxios("/bill/getData",this.formInline).then( result => {
            if (result.result === true){
              this.CountMoney.inMoney = result.data.inBill;
              this.CountMoney.outMoney = result.data.outBill;
            }else {
              result.$message.error("查询失败，请稍后重试......")
            }
          })
        },
        onSubmit(){
          this.getData();
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/style.css";
</style>
