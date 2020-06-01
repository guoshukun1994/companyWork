<template>
    <div class="bulk">
        <el-button @click="bulkDelete" class="bulk-delete" type="primary" icon="el-icon-delete"
            >批量删除</el-button
        >
    </div>
</template>

<script>
import { delHistoryBindingBar, searchBar } from '../../api/api';
export default {
    props: { deleteData: '' },
    data() {
        return {
            loading1: true,
            loading2: false,
            type: '',
            compCD: ''
        };
    },
    created() {
        this.type = localStorage.getItem('user_Type');
    },
    methods: {
        bulkDelete() {
            if (!this.deleteData.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择删除条目!',
                    type: 'warning'
                });
            } else {
                this.$confirm('此操作将删除已选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.a();
                        let arrData = [];
                        for (let i = 0; i < this.deleteData.length; i++) {
                            arrData.push(this.deleteData[i].check_code);
                        }
                        delHistoryBindingBar(
                            { delCheckCode: arrData },
                            this.$store.getters.token
                        ).then((res) => {
                            this.b();
                            if (res.code === 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '删除成功!',
                                    type: 'success'
                                });
                                if (this.userType != 2) {
                                    this.compCD = localStorage.getItem('comp_CD');
                                }
                                searchBar(
                                    { compCD: this.compCD, pageNum: 1, pageSize: 10, delFlag: '0' },
                                    this.$store.getters.token
                                ).then((res) => {
                                    this.$emit('getData1', res.sqlValue);
                                    this.$emit('getData2', res.total[0].total);
                                });
                            } else if (res.code === 2) {
                                this.$notify({
                                    title: '失败!',
                                    message: '删除异常,请联系管理员!',
                                    type: 'warning'
                                });
                            } else if (res.code === 3) {
                                this.$notify({
                                    title: '失败!',
                                    message: '已删除的数据不能再删除!',
                                    type: 'warning'
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
        },
        a() {
            this.$emit('childDe', this.loading1);
        },
        b() {
            this.$emit('childDe', this.loading2);
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
