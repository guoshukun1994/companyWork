<template>
    <div class="bulk">
        <el-button @click="bulkRe()" class="bulk-delete" type="primary" icon="el-icon-s-help"
            >批量恢复</el-button
        >
    </div>
</template>

<script>
import { recoverHistoryBar, searchBar } from '../../api/api';
export default {
    props: { reData: '' },
    data() {
        return {
            loading1: true,
            loading2: false,
            type: '',
            compCD: '',
            delRadio1: '0',
            delRadio2: '0'
        };
    },
    created() {
        this.type = localStorage.getItem('user_Type');
    },
    methods: {
        bulkRe() {
            if (!this.reData.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择恢复条目!',
                    type: 'warning'
                });
            } else {
                this.a();
                let reData = [];
                for (let i = 0; i < this.reData.length; i++) {
                    reData.push(this.reData[i].check_code);
                }
                recoverHistoryBar({ recoverBars: reData }, this.$store.getters.token).then(
                    (res) => {
                        this.b();
                        if (res.code === 1) {
                            this.$notify({
                                title: '成功!',
                                message: '数据恢复成功!',
                                type: 'success'
                            });
                            this.$emit('changeDel1', this.delRadio1);

                            searchBar(
                                { compCD: this.compCD, pageNum: 1, pageSize: 10, delFlag: '0' },
                                this.$store.getters.token
                            ).then((res) => {
                                this.$emit('getInfo1', res.sqlValue);
                                this.$emit('getInfo2', res.total[0].total);
                                this.$emit('changeDel2', this.delRadio2);
                            });
                        } else if (res.code === 2) {
                            this.$notify({
                                title: '失败!',
                                message: '恢复失败,请联系管理员!',
                                type: 'warning'
                            });
                        } else if (res.code === 3) {
                            this.$notify({
                                title: '注意!',
                                message: '请勿对未删除的条目进行恢复操作!',
                                type: 'warning'
                            });
                        }
                    }
                );
            }
        },
        a() {
            this.$emit('childRe', this.loading1);
        },
        b() {
            this.$emit('childRe', this.loading2);
        }
    }
};
</script>

<style lang="scss" scoped>
.bulk {
    &-delete {
        margin-top: 10px;
        background-color: rgb(48, 65, 86);
        color: white;
        border: 0px;
    }
}
</style>

//
<style lang="scss">
// .bulk {
//     &-delete {
//         margin-top: 10px;
//         background-color: rgb(48, 65, 86);
//         color: white;
//     }
// }
//
</style>
