<template>
  <div class="rank">
    <scroll class="scroll">
      <ul>
        <li v-for="item in topList " :key="item.key" @click="toDetail(item.id)">
          <div class="left">
            <img :src="item.picUrl" class="imga">
          </div>
          <div class="right">
            <p v-for="(item1,index) in item.songList" :key="(item1,index).key">{{index+1}}.
              <span>{{item1.songname}}  -  </span>
              <span>{{item1.singername}}</span>
            </p>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import store from '@/store.js'
import { getRankList,getRankInfo  } from '@/api/api.js'
import scroll from '@/components/scroll'
import loading from '@/components/loading'
export default {
  data(){
    return{
      topList:[]
    }
  },
  created(){
    this.getRankListData()
  },
  methods:{
    getRankListData(){
      getRankList().then(res=>{
        this.topList = res.data.topList
        // console.log(this.topList)
      })
      // getRankInfo("4").then(res=>{
      //   console.log(res)
      // })
    },
    toDetail(id){
      this.$router.push({
        path:`/rank/${id}`
      })
    }
  },
  components:{
    scroll,
    loading
  }
}
</script>

<style lang="less" scoped>
 @import '~@/assets/less/variable.less' ;
.rank{
  position: fixed;
     top: 84px;
     bottom:0;
     width: 100%;
  .scroll{
    height:100%;
    overflow: hidden;
    ul{
      margin-bottom: 20px;
      li{
        display: flex;
        height: 110px;
        margin: 16px 40px 0 40px;
        box-sizing: border-box;
        .left{
          height: 110px;
          width:110px;
          // display: inline-block;
          color: red;
          .imga{
            height: 110px;
            width: 110px;
          }
        }
        .right{
          font-size:@font-size-small;
          padding: 16px 0px 20px 20px;
          display: flex;
          flex-direction:column;
          width: 60%;
          background: @color-text-d;
          color: @color-text-l;
          p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            justify-content:space-between;
            margin: 6px 0 ;
          }
        }
      }
    }
  }
}
</style>
