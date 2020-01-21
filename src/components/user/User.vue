<template>
    <el-card style="width: 50%">
      <el-container >
        <el-aside width="300px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                default-active="4"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-card>

</template>

<script>

  export default {

    props: {},
    data() {
      return {}
    },

    components: {},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }
</script>

<style scoped>

</style>
