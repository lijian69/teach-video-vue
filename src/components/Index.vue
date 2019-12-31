<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="" alt="">
        <span>后台管理系统</span>
      </div>
      <el-menu type="info"
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#373d41"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-custom"></i>我的工作台</template>
          <el-menu-item index="2-1" @click="logout"><i class="el-icon-remove"></i>退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="'180px'">
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false" router
                 :default-active="activePath">
          <!-- 一级菜单 -->
          <template  v-for="item in menulist">
            <el-submenu v-if="item.children.length > 0" :index="item.id + ''" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.menuName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item v-if="item.children" :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.menuName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else  :index="item.path" :key="item.id" @click="saveNavState(item.path)">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.menuName}}</span>
              </template>
            </el-menu-item>
          </template>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex2: '1',
        // 左侧菜单数据
        menulist: [],
        iconsObj: {
          '101': 'iconfont icon-user',
          '102': 'iconfont icon-tijikongjian',
          '103': 'iconfont icon-shangpin',
          '104': 'iconfont icon-danju',
          '105': 'iconfont icon-danju',
        },
        // 是否折叠
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        this.$message.info("用户退出成功")
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      // 获取所有的菜单
      async getMenuList() {
        this.$getAxios("/menu/getList",null).then((data) => {
          if (data.result === true){
            this.menulist = data.data;
          }else{
            this.$message.error(data.message)
          }
        })
      },
      // 点击按钮，切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      // 保存链接的激活状态
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
