<template>
  <el-card shadow="always">
    <div class="page-holder d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center py-5">
          <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
            <div class="pr-lg-5"><img src="../assets/images/about.png" alt="" class="img-fluid"></div>
          </div>
          <div v-if="login" class="col-lg-5 px-lg-4">
            <h2 class="mb-4">登录页面</h2>
            <p class="text-muted">全网视频资源针对会员免费获取。1、2、3元即可购买季度会员，价格便宜，诚信商家。<br/>
              若无账号请去注册页面支付宝扫码店铺进行付款.</p>
            <form :model="loginForm" class="mt-4">
              <div class="form-group mb-4" >
                <div class="input-group mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text border-0 shadow form-control-lg">用户账号</span>
                  </div>
                  <input type="text" v-model="loginForm.email"  placeholder="请输入您的登录账户"
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
              <button type="submit" class="btn btn-primary shadow px-5" @click="LoginClick">登录</button>
              <button type="submit" class="btn btn-primary shadow px-5" @click="toRegister">注册</button>
            </form>
          </div>
          <div v-if="!login" class="col-lg-5 px-lg-4">
            <p class="text-muted">请用支付宝扫描,后续会以邮件的形式给你开通账户</p>
            <p class="text-muted"><span style="color: #dc3545"> 温馨提示：</span>下单前务必确认你的邮箱账号是否填写正确！</p>
            <div  class="mt-4">
              <img src="../assets/1579743974.png"/>
              <button type="submit" class="btn btn-primary shadow px-5" @click="login = !login">返回登陆</button>
            </div>
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
        login:true,
        loginForm:{
          email : "",
          password: ""
        },
      }

    },
    methods:{
      toRegister(){
        this.login = false;
        this.$message.info('温馨提示：下单前务必确认你的邮箱账号是否填写正确！');
      },
      LoginClick(){
        if (this.loginForm.email == ""){
          this.$message.error("请输入登录邮箱账号");
          return false;
        }
        if (this.loginForm.password == ""){
          this.$message.error("请输入登录密码");
          return false;
        }
        this.$postAxios("/login",this.loginForm).then((res) => {
          if (res.result === true){
            // 登录成功后把token 保存到客户端的sessionStrorage中
            window.sessionStorage.setItem("token",res.data.token);
            window.sessionStorage.setItem("user",res.data.user);
            this.$message.success("登录成功");
            this.$router.push("/start");
          }else{
            this.$message.error(res.message);
          }
        }).catch((error) => {
        });  //一定别忘了这个
      }
    },
  }
</script>



<style scoped>

  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/style.default.css";
  @import "../assets/css/custom.css";

</style>
