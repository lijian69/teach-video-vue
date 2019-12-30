<template>
  <div>
  <el-form ref="form" label-position="left" :model="form" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="订单日期" prop="batchDate">
          <el-date-picker
            v-model="form.batchDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品" prop="goodsId">
        <el-select v-model="form.goodsId" filterable clearable  placeholder="请选择商品">
          <el-option
            v-for="item in goodsAllData"
            :key="item.value"
            clearable
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="价格" prop="goodsPrice">
          <el-input-number v-model="form.goodsPrice" :precision="2" :step="0.1"  ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数量" prop="goodsAmount">
          <template>
            <el-input-number v-model="form.goodsAmount"  :min="1" label="描述文字"></el-input-number>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="来源" prop="companyId">
      <el-select v-model="form.companyId" placeholder="请选择来源">
        <el-option
          v-for="item in dataOptionsCompany"
          :key="item.value"
          clearable
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.goodsMark"></el-input>
    </el-form-item>
  </el-form>
    </div>
</template>

<script>

  export default {

    props: {
      goodsAllData : {},
      type : {},
      dataOptionsCompany:{},
      formData:{}
    },
    data() {
      return {
        form:{
          batchDate: '',
          goodsId: '',
          goodsPrice: 1,
          goodsAmount:1,
          companyId: '',
          goodsMark: '',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

      }
    },

    components: {},
    methods: {

    },
    watch: { // 监听到数据然后赋值
      formData (newV, oldV) {
        this.form = newV;
      }
    },
    mounted() {
      this.form = this.formData
    },

  }
</script>

<style scoped>

</style>
