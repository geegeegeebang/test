<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="cdInfo">
      <div>
        <swiper :options="swiperOption">
        <swiper-slide v-for="item in slider" :key="item.key"><a :href="item.linkUrl"><img :src="item.picUrl" width="100%"></a></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
         </swiper>
        <div class="hot">
          <h2>热门歌单推荐</h2>
          <ul>
            <li v-for="item in cdInfo" :key="item.key" @click="toDetail(item.id)">
              <div class="zuo"><img :src="item.picUrl"></div>
              <div calss="you">
                <h3>{{item.songListAuthor}}</h3>
                <p>{{item.songListDesc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading" v-show="isLoading">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { getRecommend  } from '@/api/api.js'
import scroll from '@/components/scroll'
import loading from '@/components/loading'
export default {
  data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
           autoplay: {
            delay: 1500,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        slider:[],
        cdInfo:[],
        isLoading:true
      }
  },
  components: {
    swiper,
    swiperSlide,
    loading,
    scroll
  },
  created(){
    this.getRecommendData();
  },
  methods:{
    //获取接口
    getRecommendData(){
      getRecommend().then(res=>{
        this.cdInfo = res.data.songList
        this.slider = res.data.slider
        this.isLoading = false
      })
    },
    toDetail(id){
      this.$router.push({
        path:`/recommend/${id}`
      })
    },


  },
  // mounted(){
  //   this.$nextTick(()=>{
  //     this.scroll = new Bscroll(this.$refs.wrapper,{})
  //   })
  // }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variable.less';
.recommend{
     position: fixed;
     top: 84px;
     bottom:0;
     width: 100%;
    .recommend-content{
      height:100%;
      overflow: hidden;
      .hot{
          h2{
            text-align: center;
            color: @color-theme;
            font-size: @font-size-medium;
            margin:20px 0 ;
          };
          ul{
            li{
              padding:0px 20px 20px 40px;
              display: flex;
              // height: 70px;
              box-sizing: border-box;
              .zuo{
                height: 60px;
                width: 60px;
                flex: 0 0 60px;
                margin-right: 20px;
                img{
                  height:60px;
                  width:60px;
                }
              }
              .you{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                line-height: 20px;
                overflow: hidden;
                font-size:@font-size-medium;
              }
              h3{
                color: @color-text;
                font-size:@font-size-medium;
                margin: 6px 0 16px 0;
              }
              p{
                color:@color-text-l;
                font-size:@font-size-small;
              }

            }
          }
        }

    }
}
</style>
