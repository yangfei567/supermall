<template>
<div>
  <Navbar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
  </Navbar>
  <CartList/>
  <CartBottom/>
  <MainTabbar/>
</div>
</template>

<script> 
  import Navbar from 'components/common/navbar/Navbar'
  import CartList from './childComps/CartList'
  import MainTabbar from 'components/content/MainTabbar/MainTabbar'
  import CartBottom from './childComps/CartBottom'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      Navbar,
      CartList,
      MainTabbar,
      CartBottom
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>