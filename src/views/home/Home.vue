<template>
  <div id="home">
    <nav-bar class="nav-home"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControla" class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true"
            @scroll="whereShowBack"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControlb"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"></back-top>

  </div>
</template>
<script>
  /*公共组件*/
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from  'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  /*子组件*/
  import HomeSwiper from './childComponents/HomeSwiper'
  import RecommendView from './childComponents/RecommendView'
  import FeatureView from './childComponents/FeatureView'

  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {debounce} from 'common/utils'



  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page : 0, list:[]},
          'new':{page : 0, list:[]},
          'sell':{page : 0, list:[]},
        },
        currentType:'pop',
        showBack:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created(){
      /*轮播和recommends图片*/
      this.getHomeMultidata()
      /*goods数据*/
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      /*图片加载完成*/
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('homeItemImgLoad',()=>{
        refresh()
      })
    },
    computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY =  this.$refs.scroll.scroll.y
    },
    methods:{
      /*事件处理*/
      tabClick(index){
        switch(index){
          case 0:
          this.currentType = 'pop'
          break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControla.currentIndex = index
        this.$refs.tabControlb.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,600)
      },
      whereShowBack(position){
        this.showBack = Math.abs(position.y) > 1000

        this.isTabFixed = this.tabOffsetTop < Math.abs(position.y)
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad(){
        /*获取tabcontrol的offsettop*/
        this.tabOffsetTop = this.$refs.tabControlb.$el.offsetTop
      },
      /*网络请求*/
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page +=1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>


<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .nav-home{
    background-color: var(--color-tint);
    color:white;
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
