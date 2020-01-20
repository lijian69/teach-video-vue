<template>
  <el-container>
    <el-header>
      <li-header />
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
    import Header from "./common/Header";
    export default {
        name: "Start",
        components:{
          'li-header' : Header
        }
    }
</script>

<style scoped>

</style>
