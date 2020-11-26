<template>
  <div class="wrapper">
    <div style="margin-bottom: 20px;">{{nowDate}}</div>

    <div>{{25.1561651.toFixed(2)}}</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default {
    name: 'Category',
    data() {
      return{
        scroll: null,
        nowDate: new Date().toLocaleString()
      }
    },
    created () {
      // 时钟
      setInterval(() => {
        this.nowDate = new Date().toLocaleString()
      },1000)
      console.log(this.nowDate);
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true,
      })     
      this.scroll.on('scroll', (position) => {
        console.log(position)
      })
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
        this.scroll.finishPullUp()
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 200px;
    background-color: rgb(105, 105, 105);
    overflow: hidden;
    color: white;
  }
</style>