  
<template>
    <div class="progress-bar" ref="progressBar" @click="MoveTo">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove"
            @touchend="onTouchEnd" >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    percent:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      touch:{}
    }
  },
  watch:{
    percent(v){
      if(v >= 0 && !this.touch.isMove ){
        let m = this.$refs.progressBar.clientWidth - 16
        let  l = m * v
        this.proMove(l)
      }
    }
  },
  methods:{
    proMove(l){
      this.$refs.progress.style.width = `${l}px`
      this.$refs.progressBtn.style.transform =`translateX(${l}px)`
    },
    //点击
    MoveTo(e){
      // console.log(e)
      let w = e.pageX -this.$refs.progressBar.offsetLeft 
      this.proMove(w),
      this.sendPercent()
    },
    //拖动
    onTouchStart(ev){
      this.touch.isMove = true
      //手指位置
      this.touch.x1 = ev.touches[0].pageX
      //按钮位置
      this.touch.b1 = this.$refs.progress.clientWidth
    },
    onTouchMove(ev){
      if(!this.touch.isMove){
        return
      }
      this.touch.x2 = ev.touches[0].pageX
      let w = Math.min(Math.max(0,this.touch.x2-this.touch.x1+this.touch.b1),this.$refs.progressBar.clientWidth-16)
      this.proMove(w)
    },
    onTouchEnd(ev){
      this.touch.isMove = false
      this.sendPercent()
      //手指移动的距离
    },
    sendPercent(){
      let w = this.$refs.progressBar.clientWidth - 16
      let p = this.$refs.progress.clientWidth / w
      this.$emit('changePercent',p)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable";
.progress-bar{
    height: 30px;
    .bar-inner{
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress{
        position: absolute;
        height: 100%;
        background: @color-theme;
      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn{
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid @color-text;
          border-radius: 50%;
          background:@color-theme;
        }
      }
    }
}
</style>

