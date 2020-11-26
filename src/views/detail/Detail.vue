<template>
  <div id="detail">
    <DetailNavBar class="datail-nav" @titleClick="titleClick" ref="detailNavBar" />
    <Scroll class="content" ref="scroll" @scroll="detailScroll"   :probeType = "3">
    <DetailSwiper :topImg="topImg" />
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
    <DetailShopInfo :shop="shop"/>
    <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="imgLoad" />
    <DetailParamInfo ref="params" :paramInfo="paramInfo" />
    <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
    <GoodsList ref="recommend" :goods="recommend"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBT" class="backTop"></BackTop>
    <DetailBottomBar @addToCart="addToCart" />
  </div>
</template>

<script>
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail, goods, shop, goodsParams, getRecommend} from 'network/detail'

  import {debounce} from 'common/untils'
  import {backTopMixin} from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    mixins:[backTopMixin],
    data() {
      return {
        iid: null,
        topImg:[],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParams: {},
        paramInfo: {},
        commentInfo:{},
        recommend:[],
        detailTopY:[],
        getTopY:null,
        index: 0
      }
    },
    methods:{
      imgLoad() {
        this.$refs.scroll.refresh()
        // cy用的方法，如果imgload会执行多次，就用这种方法
         // this.getTopY = debounce(() => {
          // this.detailTopY = []
          // this.detailTopY.push(0)
          // this.detailTopY.push(this.$refs.params.$el.offsetTop)
          // this.detailTopY.push(this.$refs.comment.$el.offsetTop)
          // this.detailTopY.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.detailTopY);
        // },100)     
        // this.getTopY()    

        // 以为之前做过图片加载完的判断，所以imgload只会执行一次
         this.detailTopY = []
          this.detailTopY.push(0)
          this.detailTopY.push(this.$refs.params.$el.offsetTop)
          this.detailTopY.push(this.$refs.comment.$el.offsetTop)
          this.detailTopY.push(this.$refs.recommend.$el.offsetTop)
          this.detailTopY.push(Number.MAX_VALUE)
          // 给一个很大的值，让position做判断，就不需要再用 ||
          // console.log(this.detailTopY);     
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.detailTopY[index], 200)
      },

      // problem
      detailScroll(position) {
        let length = this.detailTopY.length
        // 因为push了一个很大的值，所以要length-1，少遍历一次，普通做法不用-1
        for(let i =0; i< length-1 ; i++){
          // 普通做法，逻辑判断相对复杂
          // if( this.index !== i && ((i < length-1 && -position.y >= this.detailTopY[i] &&
          //   -position.y < this.detailTopY[i+1]) || (i === length-1 && -position.y
          //   >= this.detailTopY[i]))){              
          //     this.index = i;
          //     console.log(this.index)
          //     this.$refs.detailNavBar.currentIndex = this.index
          // }

          // hack做法，逻辑相对简单
          if( this.index !== i && (-position.y >= this.detailTopY[i] &&
             -position.y < this.detailTopY[i+1]) ){

              this.index = i;
              this.$refs.detailNavBar.currentIndex = this.index
          }

          // 用一次mixin里的函数，因为methods里面只会合并大的函数，不会合并函数里的内容
          this.getIsShowBT(position)
        }
        
      },
      addToCart() {
        // console.log(this.goods);
        
        const product = {}

        product.img = this.topImg[0]
        product.title = this.goods.title
        product.price = this.goods.nowPrice
        product.desc = this.goods.desc
        product.iid = this.iid

        // 因为this.$toast.show 是异步操作
        //***异步操作要用dispatch提交到actions里，同步可以用commit提交到mutations，不能乱用
        this.$store.dispatch('addCart', product).then(res => {
          // console.log(res);
          this.$toast.show(res, 2000)
        })

        
      }
    },
    
    created() { 
      // this.$refs.scroll.refresh()

      //将获取的iid保存在this.iid中
      this.iid = this.$route.params.iid

      //通过获取的iid发送请求，获得topImg
      getDetail(this.iid).then( res => {
        const data = res.result
        // console.log(res);
        this.topImg = res.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new goods(data.itemInfo, data.columns, data.shopInfo.services)
        
        //获取店铺信息
        this.shop = new shop(data.shopInfo)
        
        // 获取详细信息,没有建一个新的类
        this.detailInfo = data.detailInfo

        // 获取goods的params
        this.paramInfo = new goodsParams(data.itemParams.info, data.itemParams.rule)

        //获取评论信息 comment
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }


       
      })

       //获取推荐数据 recommend
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.list
      })
    
    },
   
    //让detail页面被创建时直接刷新一下，防止进来时不能滚动
    activated() {
      this.$refs.scroll.refresh()
    }



  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 3;
    background-color:#fff;
    height: 100vh;
  }
  .content{
    height: calc(100vh - 44px);
    overflow: hidden;
    /* position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 60px; */
  }
  /* .datail-nav {
    position: relative;
    z-index: 3; 
     background-color: #fff;
  } */
  .backTop{
    margin-bottom: 10px;
  }
</style>