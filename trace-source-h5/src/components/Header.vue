<template>
    <div class="header">
        <div class="left" @click="back">
            <img src="@/assets/left.png" alt="" class="back">
            <p> 返回</p>
        </div>
        <div class="content">
            {{title}}
        </div>
        <div class="right">
        </div>
    </div>
</template>

<script>
export default {
    name: "myheader",
    props: {
        title: String
    },
    methods: {
        back() {
            this.$router.back(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 48px;
    background: red;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    background: url(../assets/header.png);
    background-size: 100% 100%;
    .left {
        width: 80px;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .back {
            width: 10px;
            height: 17.5px;
            margin-left: 20px;
            margin-right: 5px;
        }
    }
    .right {
        width: 80px;
    }
    .content {
        text-align: center;
        line-height: 48px;
        flex: 1;
        font-size: 18px;
    }
}
</style>