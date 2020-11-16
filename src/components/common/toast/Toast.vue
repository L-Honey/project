<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      message:{
        type:String,
        default:''
      },
      isShow:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      showToast(message,duration){
        this.isShow = true
        this.message = message
        let timer = null
        if(!timer) {
          timer = setTimeout(()=>{
            this.isShow = false
            this.message = ''
          },duration)
        }
      }
    }
  }
</script>

<style scoped>
 .toast{
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   padding: 8px 10px;
   color: #ffff;
   z-index: 999;
   background-color: rgba(0,0,0,.75);
 }
</style>
