<template>
  <div id="home">
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
     <TabControl :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="TabControl" 
      ref="tabcontrol1" 
      v-show="isFixed"/>
    <Scroll class="content" ref="scroll" :probeType = "3"  @scroll="contentScroll" 
      :pullUpLoad= "true"
      @pullingUp = "loadMore">
      <HomeSwiper :banners= "banners" 
      @swiperImgLoad = "swiperImgLoad"
       />
      <RecommendView :recommends= "recommends" />
      <FeatureView/>
      <TabControl :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol2"/>
      <GoodsList :goods="showType" />
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBT"></BackTop>

  </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from "network/home"
import {debounce} from 'common/untils'

  export default {
    name: 'Home',
    components: {
      Navbar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType:'pop',
        isShowBT: '',
        isFixed: false,
        tabOffsetTop: 0,
        saveY: 0
      }
    },
    created(){
      this.getHomeMultidata();

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      
      // console.log( this.$refs.tabcontrol2.$el.offsetTop);

      const refresh = debounce(this.$refs.scroll.refresh,500)
       this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },

    // 用来记录离开home时的位置
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)     
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    computed: {
      showType(){
        return this.goods[this.currentType].list
      }
    },
    methods: {

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
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBT = position.y < -1000
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      },

      // 网络请求的相关方法
      getHomeMultidata() {
        getHomeMultidata().then( res => {
        this.recommends = res.data.recommend.list
        this.banners = res.data.banner.list
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then( res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 

          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
  }
  .TabControl{
    position: relative;
    z-index: 3;
  }
  .content{   
    /* 用定位的方法，上滑到最后会出现一页的空白
    （calc也可能出现 ，可能是better-scroll的问题） */
    position: absolute;       
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* height: calc(100vh - 93px);
    overflow: hidden;
    margin-top: 44px; */
  }

  /* 不行是因为，better-scroll本质上会在父元素添加translate 让fixed失效 */
  /* .isFixed{
    position: fixed;
    top: 44px;
    left:0;
    right:0;
    z-index: 6;
  } */
</style>