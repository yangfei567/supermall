<template>
  <div>
    <Navbar>
      <div slot="left" class="backImg" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
        class="title-item"
        :class="{active: currentIndex === index}"
        @click="itemClick(index)"
        :key="index">{{item}}</div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .backImg  img{
    width: 18px;
    vertical-align: middle;
  }
</style>