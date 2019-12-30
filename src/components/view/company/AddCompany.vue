<template>
    <div>
      <el-form :model="company" label-width="80px">
        <el-form-item label="单位标识">
          <el-input v-model="company.id" :disabled="company.flag === 'update'" ></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-input v-model="company.name"></el-input>
        </el-form-item>
        <el-form-item label="单位类型">
          <el-select v-model="company.type" placeholder="请选择单位类型">
            <el-option label="进货单位" value="1"></el-option>
            <el-option label="出货单位" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

</template>

<script>

  export default {

    props: {
      companyData: {

      }
    },
    data() {
      return {
        company : {
          id: '',
          name: '',
          type : '',
          flag : ''
        }
      }
    },
    watch: { // 监听到数据然后赋值
      companyData (newV, oldV) {
        this.company = newV;
      }
    },
    mounted() {
      this.company = this.companyData
    },
    components: {},
    methods: {}

  }
</script>

<style scoped>

</style>
