<template>
  <div class="cart-bottom">
    <div class="bottom-left">
      <!-- .native  dong? -->
      <CheckBotton :isActive="selectAll"  @click.native="bottonClick"></CheckBotton>
      <span>全选</span>
    </div>
    <div class="bottom-center">
      合计:{{'￥'+totalPrice}}
    </div>
    <div class="bottom-right" @click="rightClick">
      <span>
      结算({{checkedLength}}件)
      </span>
    </div>
  </div>
</template>

<script>
   import CheckBotton from 'components/content/checkBotton/CheckBotton'

  export default {
    name: 'CartBottom',
    components: {
      CheckBotton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((pre,item) => {
          return pre + item.count 
        }, 0)
      },
      selectAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find( item => {
          return !item.checked
        })
      }

    },
    methods: {
      bottonClick() {
        console.log(123);
        if(this.selectAll){
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      rightClick() {
        if(!this.checkedLength){
          this.$toast.show('请选择商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom{
    display: flex;
    background-color: #eeeeee;
    height: 40px;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
  .bottom-left span {
    margin-left: 5px;
  }
  .bottom-right {
    background-color: orangered;
    width: 90px;
    height: 40px;
    padding-top: 10px;
    text-align: center;
    color: white;
  }
</style>