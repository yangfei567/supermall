<template>
  <Swiper>
     <SwiperItem v-for="(item,index) in banners" :key="index">
       <a :href="item.link">
         <img :src="item.image" alt="" @load="imgLoad">
       </a>
    </SwiperItem> 
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: true
      }
    },
    methods: {
      imgLoad() {
        if(this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>