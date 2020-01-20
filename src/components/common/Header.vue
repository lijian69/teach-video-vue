<template>
  <el-row >
    <el-col :span="2"><div class="grid-content"><img class="logo" src="../../assets/logo.png"></div></el-col>
    <el-col :span="18"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    min-height: 40px;
  }
  .logo {
    height: 40px;
    width: 100px;
  }

</style>
