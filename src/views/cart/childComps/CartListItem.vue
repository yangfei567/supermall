<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 监听自创的组件一定要用 .native -->
      <CheckBotton :is-active="product.checked"  @click.native="bottonClick" />
    </div>
    <div class="item-img">
      <img :src="product.img" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBotton from 'components/content/checkBotton/CheckBotton'

  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object
      }
    },

    components: {
      CheckBotton
    },
    methods: {
      bottonClick() {
        this.product.checked = !this.product.checked
        // console.log(this.product.checked);
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>