<template>
    <div class="header">
         <div class="logo"></div>
         <div class="text">Spotify</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variable.less';
.header{
    text-align: center;
    height: 44px;
    color:@color-theme;
    .logo{
        display: inline-block;
        width: 30px;
        height:30px;
        background: url(./default.png) 0 0 no-repeat;
        background-size: 100% 100%;
        margin-top: 4px;
        vertical-align: top;
        margin-right: 10px;
    }
    .text{
        line-height: 44px;
        display: inline-block;
        font-size: @font-size-large-x;
        font-weight: 600;
    }
}
</style>
