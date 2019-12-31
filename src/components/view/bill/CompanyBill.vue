<template>
    <div>
      <el-card>
        <el-form :inline="true" :model="CompanyBillModel" class="demo-form-inline" >
          <el-form-item label="出货时间">
            <el-date-picker
              v-model="CompanyBillModel.dataRange"
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
          <el-form-item label="去处">
            <el-select style="width: 200px" v-model="CompanyBillModel.companyId" filterable clearable  placeholder="请选择去处">
              <el-option
                v-for="item in dataOptionsCompany"
                :key="item.value"
                clearable
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showData" >预览</el-button>
          </el-form-item>
        </el-form>

        <bill-print-template :bill-data="billData" v-if="showList"></bill-print-template>


      </el-card>

    </div>

</template>

<script>
import BillPrintTemplate from './BillPrintTemplate'
  export default {

    props: {},
    created() {

    },
    mounted() {
      this.initCompany();
    },
    data() {
      return {
        showList : false,
        CompanyBillModel:{
          dataRange :[],
          companyId: ''
        },
        //下拉菜单
        dataOptionsCompany:[],
        billData: [],
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
        value2: '',
      }
    },

    components: {
      BillPrintTemplate
    },
    methods: {
      getBillList(){
        this.$postAxios("/bill/findByCompany",this.CompanyBillModel).then( result => {
          if (result.result == true){
            this.billData = result.data;
          }else{
            this.$message.error("查询失败 请稍后重试!");
          }
        })
      },
      showData(){
        this.getBillList();
        this.showList = true
      },
      initCompany() {
        let _self = this;
        let param1 = {
          flag : 'company',
          type : '2'
        }
        _self.$getAxios("/options/getOptions",param1).then(result => {
          if(result.result == true){
            _self.dataOptionsCompany = result.data;
          }
        });
      },
    }

  }
</script>

<style scoped>

</style>
