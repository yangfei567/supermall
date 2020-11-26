<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   isShow: {
    //     type: Boolean,
    //     default: false
    //   }
    // }
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, time) {
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, time)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    width: 250px;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    text-align: center;
    z-index: 999;

    color: white;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>