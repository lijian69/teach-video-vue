<template>
  <div>
    <div class="page-holder d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center py-5">
          <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
            <div class="pr-lg-5"><img src="../assets/img/illustration.svg" alt="" class="img-fluid"></div>
          </div>
          <div class="col-lg-5 px-lg-4">
            <h1 class="text-base text-primary mb-4">The Best Manger</h1>
            <h2 class="mb-4">后台管理系统</h2>
            <p class="text-muted">本项目采用vue，以最美观的样式、最方便的操作打造一流的后台管理系统.</p>
            <form :model="loginForm" class="mt-4">
              <div class="form-group mb-4" >
                <input type="text" v-model="loginForm.id"  placeholder="请输入您的登录账户"
                       class="form-control border-0 shadow form-control-lg">
              </div>
              <div class="form-group mb-4">
                <input type="password" name="passowrd" v-model="loginForm.password" placeholder="请输入您的登录密码"
                       class="form-control border-0 shadow form-control-lg text-violet">
              </div>
              <div class="form-group mb-4">
                <div class="custom-control custom-checkbox">
                  <input id="customCheck1" type="checkbox" checked class="custom-control-input">
                  <label for="customCheck1" class="custom-control-label">Remember Me</label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary shadow px-5" @click="LoginClick">登录</button>
            </form>
          </div>
        </div>
        <my-footer></my-footer>
      </div>
    </div>
  </div>
</template>

<script>

  import MyFooter from './common/footer'
  export default {
    components:{
      //组件引用
      MyFooter,
    },
    data() {
      return {
        loginForm:{
          id : "lijian",
          password: "123456"
        },
      }

    },
    methods:{
      LoginClick(){
        this.$message('这是一条消息提示');
      }
    },
  }
</script>

<style scoped>
  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/custom.css";
  @import "../assets/css/style.default.css";
</style>
