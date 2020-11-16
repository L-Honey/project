<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Scroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      /*创建*/
      this.scroll = new Scroll(this.$refs.wrapper,{
        /*probeType: value   当value值为0（默认）和1时 不监听滚动事件    当值为2时 只监听手指触碰时的滚动 不监听惯性滑动
        * 当值为3时，时时监听滚动包括惯性滑动*/
        probeType: this.probeType,
        click:true,/*默认false不能监听better-scroll包裹的点击事件*/
        pullUpLoad:this.pullUpLoad/*监听上拉加载更多*/
      })
      /*监听*/
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll  &&  this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll  && this.scroll.finishPullUp()
      }
    },
    watch:{
      data(){
        setTimeout(this.refresh,20)
      }
    }
  }
</script>

<style scoped>

</style>
