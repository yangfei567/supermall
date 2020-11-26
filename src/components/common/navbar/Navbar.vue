<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div> 
  </div>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    /* box-shadow: 0 1px 1px rgba(100,100,100,.5); */
    box-shadow: 0 -3px  10px  rgba(100,100,100,.8);
  }
  .left, .right{
    width: 60px;
    /* background-color: red; */
  }
  .center{
    flex: 1;
    /* background-color: black; */
  }
</style>