<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>凭据管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="出货方" name="first">
            <company-bill />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
  import CompanyBill from './view/bill/CompanyBill'
    export default {
        name: "Bill",
      data(){
          return{
            activeName: 'first',
          }
      },
      methods:{
        handleClick(tab, event) {
          console.log(tab, event);
        },
      },
      components:{
        CompanyBill
      },

    }
</script>

<style scoped>

</style>
