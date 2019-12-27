<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="货物名称">
          <el-input v-model="formInline.name" placeholder="货物名称"></el-input>
        </el-form-item>
        <el-form-item label="货物种类">
          <el-select v-model="formInline.type" placeholder="货物种类">
            <el-option label="全部" value=""></el-option>
            <el-option label="进货商品" value="1"></el-option>
            <el-option label="出货商品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="formInline.status" placeholder="商品状态">
            <el-option label="正常使用" value="1"></el-option>
            <el-option label="已锁定" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%" align="center">
        <el-table-column
          type="index"
          label="序号"
          width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品标识"
          width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="350" align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品种类"
          :formatter="typeFormatter"
          width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150" align="center">
          <!--插槽-->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="goodsStatusChanges(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" align="center">
          <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="updateGoods(scope.row)"></el-button>
              <el-button type="success" size="small" icon="el-icon-share"></el-button>
              <el-button type="info" size="small" icon="el-icon-delete" @click="deleteGoods(scope.row)"></el-button>
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
      title="新增商品"
      :visible.sync="dialogVisible"
      width="30%">
      <add-goods :goodsData="addGoodsData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsMethod">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>

  import AddGoods from './goods/AddGoods'
  export default {

    props: {},
    data() {
      return {
        dialogVisible:false,
        formInline:{
          name:'',
          type:'',
          status : '1',
          page : 1,
          size : 10
        },
        tableData: [],
        currentPage : 1,
        total : 0,
        addGoodsData: {
          id: '',
          name: '',
          type: '',
          status: true
        }
      }
    },
    created() {
      this.getGoodList();
    },
    components: { AddGoods },
    methods: {
      getGoodList (){
        this.$getAxios("/goods/getList",this.formInline).then(result => {
          if (result.result === true){
            this.tableData = result.data.data;
            this.total = result.data.total;
          }else {
            result.$message.error("查询失败，请稍后重试......")
          }
        })
      },
      query (){
        this.formInline.page = 1;
        this.formInline.size = 10;
        this.getGoodList();
      },

      typeFormatter(row, column){
        return row.type == '1' ? "进货商品" : row.type == '2' ? "进货商品" : "未知商品";
      },
      handleSizeChange(val) {
        const size = this.formInline.size;
        if (val === size){
          return;
        }
        this.formInline.size = val;
        this.getGoodList();
      },
      handleCurrentChange(val) {
        const page = this.formInline.page;
        if (val === page){
          return;
        }
        this.formInline.page = val;
        this.getGoodList();
      },

      //新增或者更新商品名称
      addGoodsMethod() {
        this.$postAxios("/goods/saveGoods",this.addGoodsData).then((res)  => {
          console.log(res)
          if (res.result === true){
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.getGoodList();
          }else{
            this.$message.error("添加失败");
          }
        })

      },
      updateGoods(data) {
        debugger;
        this.addGoodsData = data;
        this.dialogVisible = true;
      },
      deleteGoods(data) {
        this.$confirm('您确定要删除 '+data.name+" 吗?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delectAxios("/goods/deleteGoods/"+data.id,null).then( res => {
              if(res.result == true){
                this.$message.success("删除成功");
                this.getGoodList();
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
      //修改状态
      goodsStatusChanges(goods){
        this.$putAxios("/goods/"+goods.id+"/status/"+goods.status,null).then(res => {
            if(res.result == true){
              this.$message.success("更新状态成功");
              this.getGoodList();
            }else{
              this.$message.error("更新状态失败");
            }
        })

      }
    }

  }
</script>

<style scoped>

</style>
