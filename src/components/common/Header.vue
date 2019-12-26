<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple">login</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">开始</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><el-button type="info" round @click="logout">退出</el-button></div></el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods:{
      logout(){
        this.$message.info("用户退出成功")
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    }

  }
</script>

<style scoped>

</style>
