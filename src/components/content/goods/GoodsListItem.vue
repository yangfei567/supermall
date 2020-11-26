<template>
  <div class="goods" @click="goodsItemClick">
    <img v-lazy="showImg" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{'￥'+goodsItem.price}}</span>
      <img src="~assets/img/common/collect.svg" alt="" @load="imgLoad">
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img 
      }
    },
    methods: {
      imgLoad() {
        // console.log('imgload finished');
        this.$bus.$emit('itemImgLoad')
      },
      goodsItemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods{
    width: 48%;
    padding-bottom: 40px;
    position: relative;
    margin-bottom: 16px;
  }
  .goods img{
    width: 100%;
    border-radius: 8px;
    
  }
  .goods-info{
    font-size: 13px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 5px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 18px;
  }
  .goods-info .collect{
    position: relative;
  }
  /* 通过伪元素 添加收藏按钮 */
  /* .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    width: 14px;
    height: 14px;
  } */
  .goods-info img{
    width: 14px;
    height: 14px;
    margin-right: 1px;
    margin-bottom: -1px;
  }
</style>