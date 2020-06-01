<template>
    <div class="bulk">
        <el-button @click="handleDownload" class="bulk-delete" type="primary" icon="el-icon-s-tools"
            >导出excel</el-button
        >
    </div>
</template>

<script>
export default {
    props: { excelData: '' },
    data() {
        return {
            multipleSelection: []
        };
    },
    methods: {
        handleDownload() {
            this.multipleSelection = this.excelData;
            console.log('multipleSelection', this.multipleSelection);
            if (this.multipleSelection.length) {
                this.multipleSelection.forEach((item, index) => {
                    console.log('item', item.consume_Status);
                    item.consume_Status = item.consume_Status === 0 ? '未消费' : '已消费';
                    console.log('item', item.consume_Status);
                });
                // this.downloadLoading = true
                import('../../vendor/ExportTags').then((excel) => {
                    const tHeader = [
                        '商品编码',
                        '商品名称',
                        '商品规格',
                        // '保质期',
                        '批次号',
                        '产品价格(元)',
                        '验证码',
                        '消费码',
                        '标签存证Hash',
                        // '存证时间',
                        '消费状态',
                        '存证状态'
                    ];
                    const filterVal = [
                        'goods_CD',
                        'goods_Name',
                        'goods_Spen',
                        'goods_lot',
                        'goods_Pric',
                        'check_code',
                        'consume_code',
                        'reg_hash',
                        // 'product_date',
                        'consume_Status',
                        'hashStatus'
                    ];
                    // const list = [...this.multipleSelection]

                    const list = JSON.parse(JSON.stringify(this.multipleSelection));

                    // list.forEach((item) => {
                    //     item.product_date = this.changeTimestamp(item.product_date * 1000);

                    //     item.add_date = this.changeTimestamp(item.add_date * 1000);
                    // });

                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    });
                    // this.$refs.tableData.clearSelection();
                    // this.downloadLoading = false
                });
            } else {
                this.$message({
                    message: '请选择导出条目!',
                    type: 'warning'
                });
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]));
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

