<template>
  <div id="app">
   <keep-alive exclude="Detail">
     <router-view></router-view>
   </keep-alive>
   <MainTabbar></MainTabbar>
  </div>
</template>

<script>

import MainTabbar from './components/content/MainTabbar/MainTabbar'
export default {
  name: 'App',
  components: {
    MainTabbar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
