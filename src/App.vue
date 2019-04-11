<template>
  <div id="app">
    <music-header></music-header>
     <tab></tab>
    <router-view ></router-view>
    <player></player>
  </div>
</template>
<script>
import MusicHeader from '@/components/musicheader'
import Tab from '@/components/tabs'
import player from '@/components/player'
export default {
    name:'App',
    components:{
      MusicHeader,
      Tab,
      player
    }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/less/index.css' ;


</style>
