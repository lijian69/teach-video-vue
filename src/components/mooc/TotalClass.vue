<template>
  <div>
    <div class="bg000">
      <div class="container-types container-rank clearfix">
        <h3 class="types-title clearfix">
          <span>本站全部课程</span>
          <ul class="js-rank-tab">
            <li :class="currentFlag == '1' ?  'curr' : 'mianfei'" @click="toChange('1')">会员免费课程</li>
            <li :class="currentFlag == '1' ?  'mianfei' : 'curr'" @click="toChange('2')">限时免费课程</li>
          </ul>
        </h3>
        <div class="clearfix types-content js-rank-content">
          <template v-model="totalList">
            <div class="index-card-container course-card-container container" v-for="(item,i) in totalList">
              <a target="_blank" class="course-card"
                 :href="item.url"
                 data-track="xshk-1-1">
                <div class="course-card-top hashadow">
                  <img class="course-banner"
                       :src="item.img">
                  <div class="course-label">
                    <label style="margin-left: 3px" v-for = "(item2,i2) in item.label">{{item2}}</label>
                  </div>
                </div>
                <div class="course-card-content">
                  <h3 class="course-card-name">{{item.name}}</h3>
                  <div class="clearfix course-card-bottom">
                    <div class="course-card-info">
                      <span>中级</span><span><i class="imv2-set-sns"></i>443</span>
                      <span class="r js-hover-evaluation">22人评价</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    props: {},
    data() {
      return {
        currentFlag : '1',
        totalList:[{
          stateName:"本站会员免费",
          typeName:"Java",
          label:['SpringBoot','微服务'],
          url:"//coding.imooc.com/class/397.html?mc_marking=4cd147ccf2ff2ca7d226ce6dc286e465&amp;mc_channel=syszxl",
          img:"//img4.mukewang.com/szimg/5de8adb00809bd4406000338-360-202.jpg",
          name:"Vue全家桶实战 从零独立开发企业级电商系统(免费升级Vue3.0)"
        }]
      }
    },

    components: {},
    methods: {
      toChange : function (value) {
        this.currentFlag = value;
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/css/home.css";
</style>
