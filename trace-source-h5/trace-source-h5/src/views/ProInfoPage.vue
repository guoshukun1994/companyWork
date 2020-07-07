<template>
    <div>
        <MyHeader :title="title"></MyHeader>
        <div style="width:100%;height: 0.1rem;background: #F6F6F6;"></div>
        <ShowContainer title1="商品信息" :title2="title" :photoList="goodsPhotoList" :highIndex="highIndex"></ShowContainer>
    </div>
</template>

<script>
import { goodsPhoto } from '../api/api';
export default {
    name: "proInfoPage",
    data(){
        return {
            highIndex: 1,
            goodsPhotoList: [],
            title: ""
        }
    },
    created(){

        const { type,title } = this.$route.query;
        this.title = title;

        const { goods_relation } = this.$store.state.app.codeDetailList.list;

        // 获取商品图片list
        goodsPhoto({ goods_relation, type }).then((res)=> {
            this.goodsPhotoList = res.data;
            console.log(res.data);
        })
        
    }
}
</script>