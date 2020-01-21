<template>
  <div>
    <li-new-class/>
    <li-total-class/>
  </div>
</template>

<script>
  import NewClass from './NewClass'
  import TotalClass from './TotalClass'
  export default {
    name: "MoocHome",
    components:{
      'li-new-class':NewClass,
      'li-total-class':TotalClass
    }
  }
</script>

<style scoped>
  @import "../../assets/css/home.css";
</style>
