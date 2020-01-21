<template>
  <el-container >
    <el-header >
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content">
            <img style="margin-left: 40px" class="logo" src="../assets/logo.png">
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content">
            <el-row>
              <el-col :span="10">
                <div class="grid-content">
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
                           @select="handleSelect">
                    <el-menu-item index="/home"><strong>首页</strong></el-menu-item>
                    <el-menu-item index="/moochome"><strong>M课资源</strong></el-menu-item>
                    <el-menu-item index="/user"><strong>用户管理</strong></el-menu-item>
                  </el-menu>
                </div>
              </el-col>
              <el-col :span="8" :offset="4">
                <div class="grid-content">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px">
                    <el-input size="small" v-model="formInline.user" placeholder="审批人"></el-input>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="12">
              <div class="grid-content "></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ">
                <div class="grid-content">
                  <img style="width: 40px;height: 40px;border-radius: 50%" src="../assets/user.png">
                  <el-button style="margin: auto" type="text"><strong>登录</strong></el-button><span>/</span><el-button type="text"><strong>注册</strong></el-button>
                </div>
              </div>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import Home from './home/Home'

  export default {
    name: 'Start',
    data() {
      return {
        formInline: {
          user: ''
        },
        activeIndex: '/home'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    components: {
      'li-home': Home
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .logo {
    height: 40px;
    width: 100px;
  }

  .el-menu--horizontal > .el-menu-item {
    float: left;
    height: 45px;
    line-height: 45px;
    margin: 0;
    color: #909399;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }
/*  .el-header{
    position:fixed;
    left:0px;
    top:0px;
    height: 40px;
    width:100%;
  }*/


</style>
