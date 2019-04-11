<template>
<div class="detail">
    <transition>
    <song-list :tittle="tittle" :bgimg="bgImg" :list="songList"></song-list>
    </transition>
</div>
</template>

<script>
import songList from  '@/components/songsList'
import {  getSingerInfo,getkey } from '@/api/api.js'
export default {
    data(){
        return{
            songList:[],
            tittle:"",
            bgImg:"",
        }
    },
    components:{
        songList,
    },
    created(){
        this.getSingerInfoData()
    },
    methods:{
        getSingerInfoData(){
           getSingerInfo(this.$route.params.id).then(res=>{
                // console.log(res.data)
                this.tittle=res.data.singer_name
                this.bgImg= `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg`
                this.songList = this.editSongs(res.data.list)
            })
        },
         // http://dl.stream.qqmusic.qq.com/C400000Qepff3UyUWO.m4a?guid=998429vkey=FC8A898232CBC7C9F2BE18D2E28778D746AAB812A6649CFF66F86E9605A2FF0E8AD12B76010E2300541FF160AA14E4E10C11F89490FFuin=8081&fromtag=38
         // songmid: "000Qepff3UyUWO"

        editSongs(list){
            let nList = []
            for(var i=0;i<list.length;i++){
                let item ={
                    //不全
                    bg:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg`,
                    id:list[i].musicData.songid,
                    singer:list[i].musicData.singer,
                    songname:list[i].musicData.songname,
                    //专辑封面
                    album:list[i].musicData.albumname,
                    //歌曲时间
                    time:list[i].musicData.interval,
                    //歌曲链接
                    songmid:list[i].musicData.songmid
                }
                    nList.push(item)
            }
            return nList
        }
    },
}
</script>

<style lang="less" scoped>
.detail{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: black;
    // z-index: 99;
}
</style>

