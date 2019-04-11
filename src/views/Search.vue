<template>
  <div class="Search">
    <div class=" SE">
      <i class="icon-search"></i>
      <input type="text" placeholder="Search singer songs" ref="query"  v-model="query" @keyup.13="goSearch">
      <i class="icon-dismiss" @click="clear"></i>
    </div>
  <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <div class="shortcut">
          <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                  <li class="item" v-for="item in hotList" :key="item.key" @click="addSearch(item.k)">
                      <span>{{item.k}}</span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
   <scroll class="search-result" ref="searchResult" v-show="query" :listenScroll=true :pullup=true @scrollToEnd="pullUp">
            <div class="search-list">
                <ul>
                    <li class="search-item" v-for="item in searchList" :key="item.key" @click="add(item)">
                        <i class="icon"></i>
                        <h6 class="text">{{item.songname}}</h6>
                        <p class="subtext"><span>{{item.singer[0].name}} .</span><span>{{item.album}}</span></p>
                    </li>
                </ul>
            </div>
  </scroll>
      <div class="loading" v-show="isloading">
          <loading></loading> 
      </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import scroll from '@/components/scroll'
import loading from '@/components/loading'
import {getHotKey,search} from '@/api/api.js'
export default {
  data() {
    return {
      hotList: [],
      isloading:false,
      query:'',
      searchList:[],
       pageNum:20,
       pageSize:1,
       loadingTitle:"",
       totalNum:0,
    }
  },
  components:{
    scroll,
    loading
  },
  created(){
    this._getHotKey()
  },
  methods:{
    watchPlayList(playList){
          if(playList.length > 0){
              this.$refs.searchResult.$el.style.bottom = '60px'
              this.$refs.searchResult.refresh()
          }
     },
  _getHotKey() {
    getHotKey().then((res) => {
      // console.log(res)
        this.hotList = res.data.hotkey.slice(0, 10)
        // console.log(this.hotList)
    })
  },
  addSearch(item){
    this.query = item
  },
  clear(){
    this.query = ''
    this.searchList = []
  },
  goSearch(){
    this.isloading = false
    search(this.query,this.pageSize,this.pageNum).then(res=>{
      this.totalNum = res.data.song.totalnum
      let list = this.editSongs(res.data.song.list)
      this.searchList = this.searchList.concat(list)
      this.$nextTick(() => {
                    this.$refs.searchResult.refresh()
      })
      // console.log(this.searchList)
    })

  },
   pullUp(){
      if(this.pageSize < Math.ceil(this.totalNum / this.pageNum) && this.pageNum < this.totalNum){
        this.pageSize ++
        this.isloading = true
        setTimeout(() => {
          this.isloading = false
            search(this.query,this.pageSize,this.pageNum).then(res => {
                //console.log(res.data.song.list)
                    let list = this.editSongs(res.data.song.list)
                    this.searchList = this.searchList.concat(list)
                    this.$nextTick(() => {
                        this.$refs.searchResult.refresh()
                    })
            })
        },2000)
      }
   },
   editSongs(list){
      let nSongsList = [];
      for(var i=0;i<list.length;i++){
          let item = {
              id:list[i].id,
              songmid:list[i].mid,
              songname:list[i].name,
              album:list[i].album.name,
              time:list[i].interval,
              bg:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].album.mid}.jpg?max_age=2592000`,
              singer:list[i].singer
          }
          nSongsList.push(item)
      }
      return nSongsList
    },
    add(item){
        let list = []
        list.push(item)
        this.addPlayer({
            list:list,
            index:0
        })
      },
      ...mapActions(["addPlayer"])
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variable.less';
.Search{
  .SE{
    text-align: center;
    height: 50px;
    width: 100%;
    margin-top: 18px;
    position: relative;
    input{
      height: 40px;
      border-radius: 22px;
      width: 80%;
      padding: 5px 16px 5px 50px;
      background: @color-dialog-background;
      font-size: @font-size-large;
      font-weight: 900;
      font-family:"楷体";
      color:@color-theme;
    }
    .icon-search{
      position: absolute;
      top: 5px;
      left: 16px;
      font-size: 40px;
      height: 40px;
      line-height: 40px;
      width: 40px;
      color: @color-theme;
    }
    .icon-dismiss{
      position: absolute;
      top: 5px;
      right: 16px;
      font-size: @font-size-large;
      height: 40px;
      line-height: 40px;
      width: 40px;
      color: @color-theme;
    }
    input[type=text]:focus {
      // border: 1px solid white;
      color: rgb(217, 255, 0);
      outline: none;
      // font-family:"宋体"
    }
  }
   .shortcut-wrapper{
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            display: flex;
            align-items: center;
            height: 40px;
            font-size: @font-size-medium;
            color: @color-text-l;
            .text{
              flex: 1;
            }
            .clear{
              .icon-clear{
                font-size: @font-size-medium;
                color: @color-text-d;
              }
            }
          }
        }
      }
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 168px;
      overflow: hidden;
      bottom: 0;
      .search-list{
        .search-item{
            position: relative;
            height: 55px;
            padding-left: 56px;
            overflow: hidden;
            .icon{
                position: absolute;
                top: 18px;
                left: 18px;
                width: 22px;
                height: 20px;
                background-position: 0 0;
                // background-image: url(./search_sprite.png);
                background-repeat: no-repeat;
                background-size: 22px 30px;
            }
            .text {
                margin: 10px 0 2px;
                line-height: 18px;
                font-weight: normal;
                color: @color-text-ll;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: @font-size-medium;
            }
            .subtext{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: @color-text-l;
                font-size: @font-size-small;
            }
            &::after{
                content: "";
                position: absolute;
                height: 1px;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
            }
        }
      }
    }
}
</style>