<template>
  <el-container>
    <el-header>
      <div>
        <div class="container-fluid">
          <div class="header d-lg-flex justify-content-between align-items-center px-sm-3">
            <!-- logo -->
            <div id="logo">
              <img style="height: 40px;width: 100px" src="../assets/logo.png"/>
            </div>
            <div class="nav_w3ls">
              <nav>
                <label for="drop" class="toggle">Menu</label>
                <input type="checkbox" id="drop" />
                <ul class="menu">
                  <li><router-link  to="/home" class="active" >首页</router-link></li>
                  <li><router-link  to="/moochome" class="active" >M 课资源</router-link></li>
                  <li><a href="pricing.html">K 研资源</a></li>
                  <li><a href="contact.html">关于我们</a></li>
                </ul>
              </nav>
            </div>
            <!-- //nav -->
            <div class="d-flex mt-lg-1 mt-sm-2 mt-3 justify-content-center">
              <!-- search -->
              <div class="search-w3layouts mr-3">
                <form action="#" method="post" class="search-bottom-wthree d-flex">
                  <input class="search" type="search" placeholder="Search Here..." required="">
                  <button class="form-control btn" type="submit"><span class="fa fa-search"></span></button>
                </form>
              </div>
              <!-- //search -->
              <!-- download -->
              <a  href="" target="_blank">
                <span>登陆</span>
              </a>
              <!-- //download -->
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
    import Home from "./home/Home";
    export default {
        name: "Start",
        components:{
          'li-home' : Home
        }
    }
</script>

<style scoped>

  @import "../assets/css/bootstrap.css";
  @import "../assets/css/style.css";
  @import "../assets/css/font-awesome.min.css";
</style>
