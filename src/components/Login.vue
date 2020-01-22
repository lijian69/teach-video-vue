<template>
  <el-card shadow="always">
    <div class="page-holder d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center py-5">
          <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
            <div class="pr-lg-5"><img src="../assets/images/about.png" alt="" class="img-fluid"></div>
          </div>
          <div class="col-lg-5 px-lg-4">
            <h2 class="mb-4">登录页面</h2>
            <p class="text-muted">本网站资源针对会员完全免费，会员价格便宜.</p>
            <form :model="loginForm" class="mt-4">
              <div class="form-group mb-4" >
                <div class="input-group mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text border-0 shadow form-control-lg">用户账号</span>
                  </div>
                  <input type="text" v-model="loginForm.id"  placeholder="请输入您的登录账户"
                         class="form-control border-0 shadow form-control-lg">
                </div>

              </div>
              <div class="form-group mb-4">
                <div class="input-group mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text border-0 shadow form-control-lg" >登录密码</span>
                  </div>
                  <input type="password" v-model="loginForm.password" placeholder="请输入您的登录密码"
                         class="form-control border-0 shadow form-control-lg text-violet">
                </div>

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
      </div>
    </div>
  </el-card>
</template>

<script>

  export default {
    components:{


    },
    data() {
      return {
        loginForm:{
          id : "admin",
          password: "123456"
        },
      }

    },
    methods:{
      LoginClick(){
        if (this.loginForm.id == ""){
          this.$message.error("请输入登录账号");
          return false;
        }
        if (this.loginForm.password == ""){
          this.$message.error("请输入登录密码");
          return false;
        }
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token","login");
        this.$router.push("/index");
        // //this.$message(api.login);
        // this.$postAxios("/login",this.loginForm).then((res) => {
        //   if (res.result === true){
        //     // 登录成功后把token 保存到客户端的sessionStrorage中
        //
        //     window.sessionStorage.setItem("token",res.data);
        //     this.$router.push("/index");
        //   }else{
        //     this.$message.error(res.message);
        //   }
        // }).catch((error) => {
        // });  //一定别忘了这个
      }
    },
  }
</script>



<style scoped>

  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/style.default.css";
  @import "../assets/css/custom.css";

</style>
