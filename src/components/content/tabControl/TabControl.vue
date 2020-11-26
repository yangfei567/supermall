<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" 
      :class="{active:  currentIndex === index}"
      :key="index"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default(){
          return [] 
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: rgb(250, 250, 250);

    position: sticky;
    top: 44px;
  }
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
    padding: 5px;
  }
</style>