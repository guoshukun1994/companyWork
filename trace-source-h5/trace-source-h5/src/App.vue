<template>
    <div id="app">
        <div class="app-main"><router-view /></div>
        <div class="bottom">
            <div>技术支持-墨客井链数字科技</div>
            <div>Copyright 2019-2025 All Reserved</div>
        </div>
    </div>
</template>

<style lang="less">
//     html,body{
//     width: 100vw;
//     height: 100vh;
//     overflow:hidden;
//     overflow-y:auto;
// }       
</style>

<style lang='less' scoped>

#app {
    min-height: 100%;
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    .app-main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: white;
    }
    .bottom {
        width: 100vw;
        padding: 10px 0;
        text-align: center;
        font-size: 11px;
        // height: 50px;
        background: #f7f4f8;
        color: #a7a7a7;
    }
}
</style>
