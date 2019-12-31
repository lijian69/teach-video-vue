<template>
    <div>
      <div align="right"> <el-button size="medium" type="success" @click="start_print" round>打印凭据</el-button></div>
      <div ref="print">
        <el-container>
          <el-header align="center">
            <span class="title" >元和全食品</span>
            <hr>
          </el-header>
          <el-main  align="center">
            <el-table
              border
              align="center"
              show-summary
              :data="tableData"
              width="980px">
              <el-table-column
                prop="name"
                label="品种"
                width="380px"
                align="center">
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量(个/袋/箱)"
                align="center"
                width="200px">
              </el-table-column>
              <el-table-column
                prop="prices"
                width="200px"
                align="center"
                label="单价(元)">
              </el-table-column>
              <el-table-column
                prop="total"
                label="总计(元)"
                align="center"
                width="200px">
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer align="right">
            <span class="footer">联系电话：0310-6666923  ,   13343308789 </span>
          </el-footer>
        </el-container>
      </div>

    </div>

</template>

<script>

  export default {

    props: {
      billData:{}
    },
    data() {
      return {
        tableData: []
      }
    },

    components: {},
    mounted() {
      this.tableData = this.billData;
    },
    methods: {
      start_print(){
        this.$print(this.$refs.print);//$refs的值要和html里的ref一致
      }
    },
    watch:{
      billData (newV, oldV) {
        this.tableData = newV;
      }
    }

  }
</script>

<style scoped>
.title{
  font-size: 35px;
  font-weight:bold;
}

  .footer{
    font-size: 20px;
  }
</style>
