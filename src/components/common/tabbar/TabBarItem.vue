<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
    },
    data(){
      return {
       /* isActive:false*/
      }
    },
    computed:{
      isActive(){
        return this.$route.path === this.path;
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    font-size:12px;
    height: 49px;
  }
 .tab-bar-item img{
   height: 24px;
   width: 24px;
   padding-top: 3px;
   margin-top: 5px;
   vertical-align: middle;
 }
  .active{
    color:red;
  }
</style>
