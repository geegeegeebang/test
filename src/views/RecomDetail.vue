<template>
<div class="detail">
    <transition>
    <song-list :tittle="tittle" :bgimg="bgImg" :list="songList"></song-list>
    </transition>
</div>
</template>

<script>
import songList from  '@/components/songsList'
import { getRList, getSingerInfo } from '@/api/api.js'
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
            getRList().then(res=>{
                console.log(res.data.cdlist[0].songlist)
                this.tittle=res.data.cdlist[0].dissname
                this.bgImg=res.data.cdlist[0].logo
                this.songList = this.editSongs(res.data.cdlist[0].songlist)
            })
        },
        editSongs(list){
            let nList = []
            for(var i=0;i<list.length;i++){
                let item ={
                    //不全
                    bg:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg`,
                    id:list[i].songid,
                    singer:list[i].singer,
                    songname:list[i].songname,
                    album:list[i].albumname,
                    songmid:list[i].songmid,
                    time:list[i].interval,
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

