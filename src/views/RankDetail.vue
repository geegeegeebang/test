<template>
<div class="detail">
    <transition>
    <song-list :tittle="tittle" :bgimg="bgImg" :list="songList"></song-list>
    </transition>
</div>
</template>

<script>
import songList from  '@/components/songsList'
import { getRList, getRankInfo } from '@/api/api.js'
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
        this.getRListData();
    },
    methods:{
        getRListData(){
            getRankInfo(this.$route.params.id).then(res=>{
                // console.log(res)
                this.tittle=res.topinfo.ListName
                this.bgImg=res.topinfo.pic_album
                this.songList = this.editSongs(res.songlist)
            })
        },
        editSongs(list){
            let nList = []
            for(var i=0;i<list.length;i++){
                let item ={
                    //不全
                    bg:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].data.albummid}.jpg`,
                    id:list[i].data.songid,
                    singer:list[i].data.singer,
                    songname:list[i].data.songname,
                    album:list[i].data.albumname,
                    songmid:list[i].data.songmid,
                    time:list[i].data.interval,
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

