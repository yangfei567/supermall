<template>
  <div class="profile">
    <Navbar>
      <div slot="center">
        蘑菇街商城
      </div>
    </Navbar>
    <UserInfo/>

    <ListItem/>
  </div>
</template>

<script>
  import ListItem from './childComps/ListItem'
  import UserInfo from './childComps/UserInfo'
  import Navbar from 'components/common/navbar/Navbar'

  export default {
    name: 'Profile',
    components: {
      ListItem,
      UserInfo,
      Navbar
    }
  }
</script>

<style scoped>

</style>