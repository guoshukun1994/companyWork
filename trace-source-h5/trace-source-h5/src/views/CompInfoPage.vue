<template>
    <div>
        <MyHeader :title="title"></MyHeader>
        <div style="width:100%;height: 0.1rem;background: #F6F6F6;"></div>
        <ShowContainer title1="企业信息" :title2="title" :photoList="companyPhotoList" :showIndex="5" :inputShow="inputShow"></ShowContainer>
    </div>
</template>

<script>
import { companyPhoto } from '../api/api';
export default {
    name: "compInfoPage",
    data(){
        return {
            companyPhotoList: [],
            inputShow: true,
            title: ""
        }
    },
    created(){

        const { type,title } = this.$route.query;
        this.title = title;

        const { comp_relation } = this.$store.state.app.codeDetailList.list;

        // 获取商品图片list
        companyPhoto({ comp_relation, type }).then((res)=> {
            this.companyPhotoList = res.data;
            console.log(res.data);
        })
        
    },
}
</script>