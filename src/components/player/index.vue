<template>
    <div class="player"  v-if="playList.length > 0">
            <div class="normal-player" v-show="fullScreen">
                <!-- 背景模糊 -->
                <div class="background">
                    <img alt="" width="100%" height="100%" :src="currentSong.bg">
                </div>
                <!-- 顶部 -->
                <div class="top">
                    <div class="black" @click="changeFull">
                        <i class="icon-back" ></i>
                    </div>
                    <div class="title">
                    <marquee  behavior=alternate scrolldelay=100 scrollamount=2 >
                        {{currentSong.songname}}
                        </marquee>
                    </div>
                    <h2 class="subtitle"><span>{{currentSong.singer[0].name}}</span></h2>
                </div>
                <!-- 中间转动 -->
                <swiper class="middle" :options="swiperOption">
                    <swiper-slide class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img :src="currentSong.bg" alt="" class="image " :class="cdState">
                            </div>
                        </div>
                        <div class="playing-lyric-warpper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </swiper-slide>
                    <!-- 歌词滚动那个 -->
                    <swiper-slide>
                        <scroll class="middle-r" ref="lyriclist" :listenScroll=true :probeType=3>
                            <div class="lyric-wrapper">
                            <div>
                                <p class="text" ref="lyricLine" v-for="(item,index) in lyric.lines" :key="item.key" :class="{'current':currentLineNum ==index }" @click="seek(index)">
                                    {{item.txt}}
                                </p>
                            </div>
                            </div>
                        </scroll>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination">
                    </div>
                </swiper>
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{presentTime}}</span>
                        <!-- 进度条 -->
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @changePercent="changeTime"></progress-bar>
                        </div>
                        <span class="time time-r">{{songTime}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" @click="prev">
                            <i class="icon-prev" ></i>
                        </div>
                        <div class="icon i-center">
                            <i :class="btnState" @click="changeState"></i>
                        </div>
                        <div class="icon i-right" @click="next">
                            <i class="icon-next" ></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
             <div class="mini-player" v-show="!fullScreen">
                    <div class="icon" @click="changeFullM">
                        <img alt="" width="40" height="40" :class="cdState" :src="currentSong.bg">
                    </div>
                    <div class="text">
                        <marquee class="name"  behavior=alternate scrolldelay=100 scrollamount=3 >
                          {{currentSong.songname}}
                        </marquee>
                        <p class="desc"><span>{{currentSong.singer[0].name}}</span></p>
                    </div>
                    <div class="control">
                        <i :class="btnState" @click="changeState"></i>
                    </div>
                    <div class="control">
                        <i class="icon-playlist"></i>
                    </div>
             </div> 
        <audio :src="url"  ref="audio" @canplay="readyState" @error="readyState" @ended="ended" @timeupdate="timeupdata"></audio>
    </div>
</template>

<script>
import scroll from '@/components/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import store from '@/store.js'
import {mapGetters,mapMutations} from 'vuex'
import {getkey,getLyric} from '@/api/api.js'
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
import progressBar from '@/components/progressBar'
export default {
    data(){
        return{
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            },
            url:'',
            lyric:{},
            playingLyric:'',
            isready:false,
            currentLineNum:0,
            currentTime:0
        }
    },
    components:{
        scroll,
        swiper,
        swiperSlide,
        progressBar
    },
    computed:{
        cdState(){
            return this.playing ? 'play' :'pause'
        },
        btnState(){
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        presentTime(){
            let m = Math.floor(this.currentTime/60)
            let s = Math.floor(this.currentTime&60)
            if(s.toString().length < 2){
                s = '0' + s
            }
            return m +":"+ s
        },  
        songTime(){
            let m = Math.floor(this.currentSong.time/60)
            let s = this.currentSong.time&60 | 0
            if(s.toString().length < 2){
                s = '0' + s
            }
            return m +":"+ s
        },
        //进度条
        percent(){
            return this.currentTime / this.currentSong.time
        },
        ...mapGetters(['playList','currentSong','fullScreen','playing','currentIndex'])
    },
    updated(){
        this.aaa()
    },
    methods:{
        aaa(){
            // console.log(this.playList)
        },
        changeFull(){
            this.changeFullScreen(false)
        },
        changeFullM(){
             this.changeFullScreen(true)
        },
        //播放暂停
        changeState(){
            this.changePlaying(!this.playing)
            this.playing ? this.$refs.audio.play() : this.$refs.audio.pause()
            this.lyric.togglePlay()
        },
        next(){
            let index = this.currentIndex+1
            if(index==this.playList.length){
                index = 0 
            }
            this.changeCurrentIndex(index)
            if(!this.playing){
                this.changeState()
            }
            // this.lyric.next()
        },
        prev(){
            let index = this.currentIndex-1
            if(index==0){
                index = this.playList.length
            }
            this.changeCurrentIndex(index)
            if(!this.playing){
                this.changeState()
            }
        },
        readyState(){
            this.isready = true
        },
        ended(){
           this.next()
        },
        seek(index){
            // this.lyric.seek(index)
            console.log(index)
        },
        timeupdata(e){
            this.currentTime = e.target.currentTime
            // console.log(e.target.currentTime)
        },
        getLyrics(){
            this.lyric = {}
            getLyric(this.currentSong.id).then(res => {
                // console.log(new Lyric(Base64.decode(res.lyric)))
                //let lyric = new Lyric(Base64.decode(res.lyric))
                this.lyric = new Lyric(Base64.decode(res.lyric),this.handler)
                if (this.playing) {
                    this.lyric.play()
                }
            })
        },
        handler({lineNum, txt}){
            // console.log(lineNum,txt)
            this.currentLineNum = lineNum
            if (lineNum > 6) {
                let lineEl = this.$refs.lyricLine[lineNum - 6]
                this.$refs.lyriclist.scrollToElement(lineEl, 1000)
            } else {
                this.$refs.lyriclist.scrollTo(0, 0, 1000)
            }
            this.playingLyric = txt
        },
        changeTime(v){
            let t = this.currentSong.time * v
            this.$refs.audio.currentTime = t
            // console.log(t)
            if (this.currentLyric) {
                this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
            }

        },
        ...mapMutations(['changeFullScreen','changePlaying','changeCurrentIndex'])
    },
    watch:{
        currentSong(newvalue,oldvalue){
            if(!newvalue){
                return
            }
            if(newvalue == oldvalue){
                return
            }
            if (this.currentLyric) {
                this.currentLyric.stop()
                this.currentTime = 0
                this.playingLyric = ''
                this.currentLineNum = 0
            }
            this.$nextTick(()=>{
                this.getLyrics()
            })
            getkey(newvalue.songmid).then(res=>{
                // console.log(res)
                this.url=`http://ws.stream.qqmusic.qq.com/${res.data.items[0].filename}?fromtag=0&guid=126548448&vkey=${res.data.items[0].vkey}`
                this.$nextTick(()=>{
                    this.$refs.audio.play()
                })
            })

        },
        playing(v){
            this.$nextTick(()=>{
                v? this.$refs.audio.play():this.$refs.audio.pause()
            })
        }
                
    }
}
</script>

<style lang="less" scoped>
 @import '~@/assets/less/variable.less' ;
 @-webkit-keyframes rotate{
     0%{
         transform: rotate(0)
     }
     100%{
         transform: rotate(360deg)
     }
 }
 .player{
     .normal-player{
         position: fixed;
         left:0;
         right:0;
         top:0;
         bottom:0;
         background: @color-background;
         .background{
             position:absolute;
             top:0;
             left:0;
             width: 100%;
             height: 100%;
             z-index: -1;
             opacity: 0.6;
             filter: blur(15px);
         }
         .top{
             position: relative;
             margin-bottom: 25px;
             margin-top: 10px;
             .black{
                 position: absolute;
                 top: 0;
                 left: 6px;
                //  z-index: 50;
                 .icon-back{
                     display: block;
                     padding: 9px;
                     font-size: @font-size-large-x;
                     color: @color-theme;
                    transform: rotate(-90deg)
                 }
             }
             .title{
                 width: 70%;
                 margin: 0 auto;
                 line-height: 40px;
                 font-size: @font-size-large;
                 color: @color-text;
                 text-align: center;
                 white-space: nowrap;
                 overflow: hidden;
             }
             .subtitle{
                 width: 70%;
                 margin: 0 auto;
                 line-height: 3x0px;
                 font-size: @font-size-small;
                 color: @color-text;
                 text-align: center;
             }
         }
         .middle{
             position:fixed;
             width: 100%;
             top: 80px;
             bottom: 180px;
             white-space: nowrap;
             font-size: 0;
             .middle-l{
                 display: inline-block;
                 vertical-align: top;
                 .cd-wrapper{
                     margin-top: 20px;
                     .cd{
                         text-align: center;
                         .image{
                             margin: 0 auto;
                             border-radius: 50%;
                             &.play{
                                 animation: rotate 14s linear infinite;
                             }
                             &.pause{
                                 animation-play-state: paused;
                             }
                         }
                     }
                 }
                 .playing-lyric-warpper{
                     text-align: center;
                     margin: 30px 10px ;
                     .playing-lyric{
                        line-height: 30px;
                        font-size: @font-size-medium;
                         color: @color-text-l;
                         white-space:normal;
                     }
                 }
             }
             .swiper-pagination{
              }
             .middle-r{
                   height: 95%;
                  overflow: hidden;
                 .lyric-wrapper{
                    text-align: center;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 0 30px 4px 30px;
                    white-space:normal;
                    margin-bottom:10px;
                    .text{
                        font-size: @font-size-medium;
                        &.current{
                            color:@color-text-l ;
                            font-size: @font-size-large;
                        }
                    }
                 }
             }
         }
         .bottom{
             position: absolute;
             bottom:58px;
             left: 0;
             width: 100%;
             box-sizing: border-box;
             .progress-wrapper{
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0  0 0;
                    .time{
                        color: @color-text;
                        font-size: @font-size-small;
                        flex: 0 0 30px;
                        line-height: 30px;
                        width: 30px;
                        &.time-l{
                        text-align: left;
                        }
                        &.time-r{
                        text-align: right;
                        }
                    }
                    .progress-bar-wrapper{
                        flex: 1;
                    }
            }          
             .operators{
                 padding: 0px 10px 4px 30px;
                 display: flex;
                 margin-top: 20px;
                 font-size: 40px;
                 .icon{
                     color: @color-theme;
                     flex: 1;
                     &.i-center{
                         font-size: 50px;
                     }
                 }
             }
         }
     }
     .mini-player{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        height: 70px;
        z-index: 99;
        padding: 10px 10px 10px 20px;
        box-sizing: border-box;
        background: rgba(40, 40, 40,0.9);
        .icon{
            height: 54px;
            width: 54px;
            img{
                height: 54px;
                width: 54px;
                border-radius: 50%;
                &.play{
                    animation: rotate 14s linear infinite;
                }
                &.pause{
                    animation-play-state: paused;
                }
            }
        }
        .text{
            margin: 4px 0 0 16px;
            width: 50%;
            text-align:left;
            .name{
                font-size: @font-size-large;
                color: @color-text-l;
                margin-bottom: 6px;
                white-space: nowrap;
                box-sizing:border-box;
            }
            .desc{
                font-size: @font-size-medium-x;
                color: @color-text-d;
            }
        }
        .control{
            font-size: 38px;
            color: @color-theme;
            margin-top: 10px;
            margin-left:24px;
            .icon-playlist{
            }
        }
    }

 }
</style>

