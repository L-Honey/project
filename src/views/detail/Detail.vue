<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" ref="navbar"
                    @itemClick="itemClick"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="scrollListener">
      <detail-swiper :topImages="swiperPhoto" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from  './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from  'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        iid: null,
        swiperPhoto: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        showBack: false,
        paramOffSetTop:0,
        commentOffSetTop:0,
        recommendOffSetTop:0
      }
    },
    created() {
      this.iid = this.$route.query.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        /*1获取轮播图数据*/
        this.swiperPhoto = res.result.itemInfo.topImages
        /*2获取商品信息*/
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        /*3获取店铺信息*/
        this.shop = new Shop(data.shopInfo)
        /*4获取商品展示图片*/
        this.detailInfo = data.detailInfo
        /*5获取商品参数信息*/
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        /*6获取品论信息*/
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted(){
      /*图片加载完成*/
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailItemImgLoad',()=>{
        refresh()
      })
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
        this.paramOffSetTop = this.$refs.param.$el.offsetTop
        this.commentOffSetTop = this.$refs.comment.$el.offsetTop
        this.recommendOffSetTop = this.$refs.recommend.$el.offsetTop
      },
      scrollListener(position) {
        this.showBack = Math.abs(position.y) > 1000

        if(Math.abs(position.y)>=this.recommendOffSetTop){
          if(this.$refs.navbar.currentIndex !== 3){
            this.$refs.navbar.currentIndex = 3
          }
        }else if(Math.abs(position.y)>=this.commentOffSetTop){
          if(this.$refs.navbar.currentIndex !== 2){
            this.$refs.navbar.currentIndex = 2
          }
        }else if(Math.abs(position.y)>=this.paramOffSetTop){
          if(this.$refs.navbar.currentIndex !== 1){
            this.$refs.navbar.currentIndex = 1
          }
        }else{
          if(this.$refs.navbar.currentIndex !== 0){
            this.$refs.navbar.currentIndex = 0
          }
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 600)
      },
      itemClick(index){
        switch (index){
          case 0:
            this.$refs.scroll.scrollTo(0,0,200)
            break
          case 1:
            this.$refs.scroll.scrollTo(0,-this.paramOffSetTop,200)
            break
          case 2:
            this.$refs.scroll.scrollTo(0,-this.commentOffSetTop,200)
            break
          case 3:
            this.$refs.scroll.scrollTo(0,-this.recommendOffSetTop,200)
            break
        }
      },
      addToCart(){
        const product = {}
        product.iid = this.iid;
        product.image = this.swiperPhoto[0];
        product.title = this.goods.title;
        product.price = this.goods.realPrice;
        product.desc = this.goods.desc;
        this.$store.dispatch('addToCart',{
          product
        })
      }
    }
  }
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav-bar{
   position: relative;
   z-index:9;
   background-color: #fff;
 }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
