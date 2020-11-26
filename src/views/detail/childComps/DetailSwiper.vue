<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(item,index) in topImg" 
    :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props:{
     topImg: {
      type: Array,
      default() {
        return []
      }
     }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 350px;
    overflow: hidden;
  }
</style>