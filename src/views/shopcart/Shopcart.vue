<template>
  <div class="cart">
    <nav-bar>
      <div class="nav-bar" slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <div class="bottom-check" v-show="isShow">
      <div v-for="(item,index) in checks" :key="index"
           @click="itemClick(index)" :class="{'check-item-active':currentIndex ===index}">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import CartList from './childComps/CartList'
  export default {
    name: "Shopcart",
    components:{
      NavBar,
      Scroll,
      CartList
    },
    data(){
      return {
        checks:['全选','全不选','反选','结算'],
        currentIndex: 0,
        isShow:false
      }
    },
    computed:{
      /*直接使用Vuex中的计算属性getters写法1*/
      /*...mapGetters({
        /!*新属性名：getters中的属性名*!/
        length:'cartListLength',
        list:'cartList',
      })*/
      /*方法二*/
      ...mapGetters([
        'cartList',
        'cartListLength'
      ])
    },
    activated(){
      this.$refs.scroll.refresh()
      if(this.cartListLength !== 0) this.isShow = true
      this.$bus.$on('noCartItem',()=>{
        this.isShow = false
      })
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        switch (index){
          case 0:
            this.$store.commit('allChecked')
            break
          case 1:
            this.$store.commit('noChecked')
            break
          case 2:
            this.$store.commit('backChecked')
            break
          case 3:
            this.calculate()
            break
        }
      },
      calculate(){
        let sum = 0;
        for(let item of this.cartList){
          if(item.checked){
            sum += item.price * item.count
          }
        }
        this.$toast.showToast('您好！您购买的商品合计价格为:'+sum+'元',6000)
      }
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    background-color: #fff;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    justify-content: center;
    color: white;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 79px;
    left: 0;
    right: 0;
  }
  .bottom-check{
    height: 30px;
    background-color: var(--color-tint);
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .check-item-active{
    background-color: #ff6332;
    border-radius: 20%;
  }
</style>
