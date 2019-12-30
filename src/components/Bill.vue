<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>凭据管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <section ref="print">
          打印内容dasfsdafsadf
          <div class="no-print">不要打印我</div>
        </section>
        <el-button @click="print"></el-button>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "Bill",

      methods:{
        print(){
          this.$print(this.$refs.print) // 使用
        }
      }
    }
</script>

<style scoped>

</style>
