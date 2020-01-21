<template>
    <div>
      <div class="bg000">
        <div class="container-types clearfix"><h3 class="types-title clearfix"><span>新上好课</span></h3>
          <div class="clearfix types-content">
            <template v-model="listData">
              <div class="index-card-container course-card-container container" v-for="(item,i) in listData" >
                <a target="_blank" class="course-card"
                   :href="item.url"
                   data-track="sztj-1-1">
                  <div class="course-stat new">{{item.stateName}}</div>
                  <div class="course-card-top hashadow">
                    <img class="course-banner"
                         :src="item.img">
                    <div class="course-label">
                      <label>{{item.typeName}}</label>
                    </div>
                  </div>
                  <div class="course-card-content">
                    <h3 class="course-card-name">{{item.name}}</h3>
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
        listData:[{
          stateName:"本站会员免费",
          typeName:"Java",
          url:"//coding.imooc.com/class/402.html?mc_marking=b587280c0c1c0e76c1092aa21406565a&amp;mc_channel=syb6",
          img:"//img4.mukewang.com/szimg/5dfb46f20806e68506000338-360-202.jpg",
          name:"Jetpack全组件实战"
        },{
          stateName:"本站会员免费",
          typeName:"Java",
          url:"//coding.imooc.com/class/409.html?mc_marking=60e5294c605a87b2af7257d06f70505e&amp;mc_channel=syb7",
          img:"//img2.mukewang.com/szimg/5e0030e6091d0fc712000676-360-202.png",
          name:"玩转Java并发工具，精通JUC，成为并发多面手"
        }]
      }
    },

    components: {},
    methods: {}

  }
</script>

<style scoped>
  @import "../../assets/css/home.css";
</style>
