<template>
    <div class="topNav">
        <div class="backLeft">
            <div class="backBtn"></div>
            <div class="backTxt" @click="back">返回</div>
        </div>
        {{title}}
    </div>
</template>

<script>
export default {
    name: "myHeader",
    props: {
        title: String
    },
    methods: {
        back(){
            this.$router.back(-1);
        }
    }
}
</script>

<style lang="less" scoped>
    .topNav {
        width: 100%;
        height: 0.48rem;
        position: relative;
        background-image: url("../assets/header.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        .backLeft {
            display: flex;
            align-items: center;
            position: absolute;
            left: 0.19rem;
             .backBtn {
                width: 0.1rem;
                height: 0.195rem;
                margin-right: 0.055rem;
                background-image: url("../assets/left.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
    }
</style>