<template>
  <div v-if="Object.keys(goods).length !==0" class="detail-base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="info-services">
      <div class="info-services-item" v-for="index in goods.services.length-1">
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    font-size: 16px;
    color: #222;
  }
  .info-price{
    margin-top: 10px;
  }
  .n-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .discount{
    background-color: var(--color-high-text);
    color: #000;
    font-size: 15px;
    border-radius: 7px;
  }
  .info-other{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding-top:10px;
  }
  .info-services{
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
  .info-services-item{
    font-size: 12px;
    padding: 0  3px;
  }
  .info-services-item img{
    width: 13px;
    height: 13px;
  }
</style>
