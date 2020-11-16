<template>
  <div class="category">
    <nav-bar  class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="categoryData" ref="scroll">
        <tab-content-category :subcategories="categoryData.subcategories"></tab-content-category>
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
        <tab-content-detail :category-detail="categoryData.categoryDetail[currentType]"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'
  import {debounce} from "common/utils";
  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'

  export default {
    name: "Category",
    components:{
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    data(){
      return {
        categories:[],
        currentIndex:-1,
        currentType:'pop',
        categoryData:{
          subcategories:[],
          categoryDetail:{
            'pop':[],
            'new':[],
            'sell':[]
          }
        }
      }
    },
    created(){
      this.getCategory()
    },
    mounted(){
      /*图片加载完成*/
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('categoryItemImgLoad',()=>{
        refresh()
      })
    },
    methods:{
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
      },
      selectItem(index){
        this.getSubcategory(index)
      },
      getCategory(){
        getCategory().then(res=>{
          this.categories = res.data.category.list
          this.getSubcategory(0)
        })
      },
      getSubcategory(index){
        this.currentIndex = index
        const maitKey = this.categories[index].maitKey
        getSubcategory(maitKey).then(res=>{
          this.categoryData.subcategories = res.data.list
        })
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      },
      getCategoryDetail(type){
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res=>{
          this.categoryData.categoryDetail[type] = res
        })
      }
    }
  }
</script>

<style scoped>
  .category{
    height: 100vh;
  }
 .category-nav{
   background-color: var(--color-tint);
   font-weight: 700;
   color: #fff;
 }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
  }
  #tab-content{
    height: 100%;
    flex: 1;
  }
</style>
