<template>
  <div class="singer">
    <singer-list :singers="SingerList"></singer-list>
  </div>
</template>

 <script>
 import { getSingerList,getSingerInfo} from '@/api/api.js'
 import singerList from  '@/components/singerList'
 export default {
   data(){
     return{
       SingerList:[],
     }
   },
   porps:['SingerList'],
   created(){
     this.getSingerListData()
   },
   methods:{
      getSingerListData(){
        getSingerList().then(res=>{
          this.SingerList = this.newsinger(res.data.list)
          // console.log(res.data.list)
          // this.newsinger(res.data.list)
        })
        
      },
      newsinger(list){
        let nList = {
          hot:{
            tittle:"热门",
            list:[]
          }
        }
        list.forEach((item,index) => {
           //去前十条数据作为热门数据
          if(index < 10){
            nList.hot.list.push({
              id : item.Fsinger_mid,
              name : item.Fsinger_name,
              img : `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg`
            })
          }
          //通过姓名首字母来排序
          let key = item.Findex 
          if(!nList[key]){
            nList[key] = {
              tittle : key,
              list:[]
            }
          }
          nList[key].list.push({
            id : item.Fsinger_mid,
            name : item.Fsinger_name,
            img : `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg`
          })
        });
        // console.log(nList)
        //排成有序数组
        let hot = []
        let other = []
        for( var i in nList){
          if(nList[i].tittle == "热门"){
            hot.push(nList[i])
          }else if(nList[i].tittle.match(/[a-zA-Z]/)){
            other.push(nList[i])
          }
        }
        other.sort((a,b) =>{
          return a.tittle.charCodeAt(0) - b.tittle.charCodeAt(0)
        })
          return hot.concat(other)
      }
   },
   components:{
     singerList
   }
 }
 </script>
 
<style lang="less" scoped>
.singer{
  position: fixed;
  top: 84px;
  bottom:0;
  width: 100%;
}
</style>
