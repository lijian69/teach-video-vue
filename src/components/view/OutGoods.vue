<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>出货管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
          <el-form-item label="出货时间">
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
              @change="query"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="商品">
            <el-select style="width: 200px" v-model="formInline.goodsId" filterable clearable  placeholder="请选择商品" @clear="query">
                <el-option
                  v-for="item in dataOptions"
                  :key="item.value"
                  clearable
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="去处">
            <el-select style="width: 200px" v-model="formInline.companyId" filterable clearable  placeholder="请选择去处" @clear="query">
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
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="addDialog">新增</el-button>
          </el-form-item>
        </el-form>
        <hr />
        <el-table
          :data="tableData"
          border
          stripe
          size="small"
          style="width: 100%" >
          <el-table-column
            type="index"
            label="序号"
            fixed
           min-width="5%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="batchDate"
            label="订单日期"
            fixed
            min-width="10%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品"
            min-width="20%"  align="center">
          </el-table-column>
          <el-table-column
            prop="goodsPrice"
            label="价钱 (元)"
            min-width="8%"  align="center">
          </el-table-column>
          <el-table-column
            prop="goodsAmount"
            label="数量 (个)"
            min-width="8%"  align="center">
          </el-table-column>
          <el-table-column
            label="总金额 (元)"
            min-width="10%"  align="center">
            <template slot-scope="scope">
              <span>{{TotalMoneyMethod(scope.row)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="去处"
            min-width="15%"  align="center">
          </el-table-column>
          <el-table-column
            prop="goodsMark"
            label="商品备注" min-width="20%" align="center">
          </el-table-column>
          <el-table-column
            label="操作" align="center" min-width="18%">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="updateDetail(scope.row)"></el-button>
              <el-button type="info" size="small" icon="el-icon-delete" @click="deleteDetail(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
      <el-dialog
        title="新增出货订单"
        :visible.sync="showAddDialog"
        width="50%">
        <add-detail :detail-type="2" :goods-all-data="dataOptions" ref="saveDetail" :form-data="detailData" :data-options-company="dataOptionsCompany" :type="2" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate" >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="更新出货订单"
        :visible.sync="showAddDialogUpdate"
        width="50%">
        <add-detail :detail-type="2" :goods-all-data="dataOptions" ref="saveDetail" :form-data="updateData" :data-options-company="dataOptionsCompany" :type="2" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate('update')" >确 定</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script>
  import AddDetail from "./detail/AddDetail"
  export default {

    props: {},
    data() {
      return {
        currentPage : 1,
        total : 0,
        showAddDialogUpdate :false,
        showAddDialog : false,
        //下拉菜单
        dataOptions:[],
        dataOptionsCompany:[],
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

        formInline : {
          dataRange : [],
          goodsId : '',
          companyId : '',
          type: '2',
        },
        detailData:{
          batchDate: '',
          goodsId: '',
          goodsPrice: 1,
          goodsAmount:1,
          companyId: '',
          goodsMark: '',
          type: '2',
        },
        updateData:{
          batchDate: '',
          goodsId: '',
          goodsPrice: 1,
          goodsAmount:1,
          companyId: '',
          goodsMark: '',
          type: '2',
        },
        tableData: [],
      }
    },

    created() {
      this.getList()
    },
    mounted() {
      this.initGoods();
    },
    components: {
      AddDetail
    },
    methods: {
      handleSizeChange(val) {
        const size = this.formInline.size;
        if (val === size){
          return;
        }
        this.formInline.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        const page = this.formInline.page;
        if (val === page){
          return;
        }
        this.formInline.page = val;
        this.getList();
      },

      TotalMoneyMethod(data){
        return parseFloat((data.goodsPrice * data.goodsAmount).toFixed(10))
      },
      query() {
        this.getList();
      },
      //查询list 集合
      getList(){
        let _self = this;
        _self.$postAxios("/detail/getList",this.formInline).then( result => {
          if (result.result === true){
            this.tableData = result.data.data;
            this.total = result.data.total;
          }else {
            result.$message.error("查询失败，请稍后重试......")
          }
        })
      },
      addDialog(){
        this.deleteGoodsData(this.detailData)
        this.showAddDialog = true;
      },
      deleteDetail(data){
        console.log(data)
        this.$confirm('您确定要删除 '+data.goodsName+" 吗?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delectAxios("/detail/deleteDetail/"+data.id,null).then( res => {
              if(res.result == true){
                this.$message.success("删除成功");
                this.getList();
              }else{
                this.$message.error("删除失败");
              }
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      initGoods() {
        let _self = this;
        let param = {
          flag : 'goods',
          type : '2'

        }
        _self.$getAxios("/options/getOptions",param).then(result => {
          if(result.result == true){
            _self.dataOptions = result.data;
          }
        });

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
      saveOrUpdate(flag){
        let _self = this;
        let params = null;
        if (flag === 'update'){
          params = _self.updateData;
        }else {
          params = _self.detailData;
        }
        _self.$postAxios("/detail/saveDetail",params).then(result => {
          if(result.result == true){
            this.$message.success(result.message);
            this.showAddDialog = false;
            this.showAddDialogUpdate = false;
            this.getList();
          }else{
            this.$message.error(result.message);
          }
        })
      },
      deleteGoodsData (data){
        Object.keys(data).forEach(key => {
          if (key != 'goodsPrice' && key != 'goodsAmount' && key != 'type'){
            data[key] = ''
          }
          if (key == 'goodsPrice'){
            data[key] = '1.00'
          }
          if (key == 'goodsAmount'){
            data[key] = '1'
          }
        });
      },
      //更新
      updateDetail(data){
        this.updateData = data;
        this.showAddDialogUpdate = true;
      }

    }

  }
</script>

<style scoped>

</style>
