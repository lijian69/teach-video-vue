<template>
  <div>
    <el-form :model="goods" label-width="80px">
      <el-form-item label="商品标识">
        <el-input v-model="goods.id" :disabled="goods.flag === 'update'" ></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="goods.name"></el-input>
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select v-model="goods.type" placeholder="请选择商品类别">
          <el-option label="进货商品" value = "1"></el-option>
          <el-option label="出货商品" value = "2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-switch v-model="goods.status"></el-switch>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

  export default {

    props: {
      goodsData: {

      }
    },
    data() {
      return {
        goods : {
          id: '',
          name: '',
          type: '',
          status: true,
          flag : ''
        }
      }
    },

    created() {},
    watch: { // 监听到数据然后赋值
      goodsData (newV, oldV) {
        this.goods = newV;
      }
    },
    mounted() {
      this.goods = this.goodsData
    },
    components: {},
    methods: {

    }

  }
</script>

<style scoped>

</style>
