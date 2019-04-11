<template>
    <div class="loading">
        <img src="./pac.gif">
        <p>Loading...</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variable.less';
.loading{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    img{
          width: 40px;
          height: 40px;
    }
    p{
        line-height: 20px;
        font-size: @font-size-medium;
        color: @color-text-l
    }
}
</style>

