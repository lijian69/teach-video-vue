<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>参数管理</el-breadcrumb-item>
        <el-breadcrumb-item>单位管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="单位标识">
            <el-input v-model="formInline.id" placeholder="单位标识" clearable  @clear="clear"></el-input>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="formInline.name" placeholder="单位名称" clearable  @clear="clear"></el-input>
          </el-form-item>
          <el-form-item label="单位类型">
            <el-select v-model="formInline.type" placeholder="单位类型">
              <el-option label="全部" value=""></el-option>
              <el-option label="进货单位" value="1"></el-option>
              <el-option label="出货单位" value="2"></el-option>
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
          size="small"
          style="width: 100%" align="center">
          <el-table-column
            type="index"
            label="序号"
            min-width="5%" align="center">
          </el-table-column>
          <el-table-column
            prop="id"
            label="单位标识"
            min-width="20%" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位名称"
            min-width="20%" align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="单位类型"
            :formatter="typeFormatter"
            min-width="20%" align="center">
          </el-table-column>
          <el-table-column
            label="操作" min-width="20%" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="updateCompanyMethod(scope.row)"></el-button>
              <el-button type="info" size="small" icon="el-icon-delete" @click="deleteCompanyMethod(scope.row)"></el-button>
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
        title="新增单位"
        :visible.sync="dialogVisible"
        width="30%">
        <add-company :companyData="addCompanyData" />
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCompanyMethod">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        title="更新单位"
        :visible.sync="dialogVisibleUpdate"
        width="30%">
        <add-company :companyData="updateCompanyData" />
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" @click="addCompanyMethod('update')">确 定</el-button>
      </span>
      </el-dialog>
    </div>

</template>

<script>

  import AddCompany from './company/AddCompany'
  export default {

    props: {},
    data() {
      return {
        dialogVisible : false,
        dialogVisibleUpdate : false,
        formInline: {
          id: '',
          name: '',
          type : '',
          page : 1,
          size : 10
        },
        tableData : [],
        currentPage : 1,
        total : 0,
        addCompanyData :  {
          id: '',
          name: '',
          type : '',
          flag : ''
        },
        updateCompanyData : {
          id: '',
          name: '',
          type : '',
          flag : ''
        },
      }
    },

    created() {
      this.getCompanyList();
    },
    mounted() {
    },
    components: { AddCompany },
    methods: {
      getCompanyList() {
        this.$getAxios("/company/getList",this.formInline).then( result => {
          if (result.result === true){
            console.log(result.data.data);
            this.tableData = result.data.data;
            this.total = result.data.total;
          }else {
            result.$message.error("查询失败，请稍后重试......")
          }
        })
      },
      clear (){
        this.getCompanyList();
      },
      query (){
        this.formInline.page = 1;
        this.formInline.size = 10;
        this.getCompanyList();
      },
      typeFormatter(row, column){
        return row.type == '1' ? "进货单位" : row.type == '2' ? "出货单位" : "未知单位";
      },
      handleSizeChange(val) {
        const size = this.formInline.size;
        if (val === size){
          return;
        }
        this.formInline.size = val;
        this.getCompanyList();
      },
      handleCurrentChange(val) {
        const page = this.formInline.page;
        if (val === page){
          return;
        }
        this.formInline.page = val;
        this.getCompanyList();
      },
      addDialog (){
        this.deleteCompanyData(this.addCompanyData);
        this.dialogVisible = true;
      },
      deleteCompanyData (companyData){
        Object.keys(companyData).forEach(key => {
            companyData[key] = ''
        });
      },
      addCompanyMethod (flag){
        let params = null;
        if (flag === 'update'){
          params = this.updateCompanyData;
        }else {
          params = this.addCompanyData;
        }
        this.$postAxios("/company/saveCompany",params).then((res)  => {
          if (res.result === true){
            this.$message.success(res.message);
            this.dialogVisible = false;
            this.dialogVisibleUpdate = false;
            this.getCompanyList();
          }else{
            this.$message.error(res.message);
          }
        })
      },
      updateCompanyMethod (data){
        data.flag = 'update';
        this.updateCompanyData = data;
        this.dialogVisibleUpdate = true;
      },
      deleteCompanyMethod (data) {
        this.$confirm('您确定要删除 '+data.name+" 吗?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delectAxios("/company/deleteCompany/"+data.id,null).then( res => {
              if(res.result == true){
                this.$message.success("删除成功");
                this.getCompanyList();
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
    }

  }
</script>

<style scoped>

</style>
