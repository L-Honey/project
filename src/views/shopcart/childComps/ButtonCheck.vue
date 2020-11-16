<template>
  <div class="button" :class="{'button-active':isChecked}" @click="btnClick">
    <img src="~assets/img/cart/check.svg" alt="">
  </div>
</template>
<script>
  export default {
    name: "ButtonCheck",
    props:{
      isChecked: {
        type: Boolean,
        default: true
      },
      index:Number
    },
    methods:{
      btnClick(){
        this.$store.commit('changeCheck',{
          index:this.index
        })
      }
    }
  }
</script>

<style scoped>
  .button {
    position: relative;
    margin: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .button img {
    width: 100%;
    height: 100%;
  }
  .button-active {
    background-color: #ff3c5f;
    border-color: #ff3c5f;
  }
</style>
