<template>
  <div class="check-botton" :class="{checkActive: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckBotton',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },

  }
</script>

<style scoped>
  .check-botton {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid grey;
  }
  .check-botton img {
    width: 15px;
    height: 15px;
  }
  .checkActive {
    background-color: hotpink;
    border: 2px solid hotpink;
  }
</style>