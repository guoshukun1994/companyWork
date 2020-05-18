<template>
  <div class="box">
    <div
      style="line-height:35px;border-bottom:1px solid rgba(200, 200, 200, 0.6);width:95%;margin:0 auto"
    >历史标签查询</div>
    <div
      style="width:95%;margin:0 auto;border-bottom:1px solid rgba(200, 200, 200, 0.6);height:115px;margin-top:10px"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业名称:">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="包装编码:">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="包装名称:">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="包装单位:">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="溯源码:">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="生产日期:">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="是否存证:" style="margin-left:50px">
          <el-radio-group v-model="radio1">
            <el-radio :label="3">已存证</el-radio>
            <el-radio :label="6">未存证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包装层级:" style="margin-left:50px">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">顶级</el-radio>
            <el-radio :label="6">全部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button
            class="code-query"
            icon="el-icon-search"
            style="width:120px;background-color: rgb(48, 65, 86);color: white;"
          >查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width:95%;margin:0 auto;margin-top:10px">
      <el-button
        class="code-query"
        icon="el-icon-search"
        style="width:120px;background-color: rgb(48, 65, 86);color: white;"
      >查 询</el-button>
      <el-button
        class="code-query"
        icon="el-icon-search"
        style="width:120px;background-color: rgb(48, 65, 86);color: white;"
      >查 询</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 95%;margin:0 auto;margin-top:10px"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50px" align="center"></el-table-column>
      <el-table-column type="index" width="50px" align="center"></el-table-column>
      <el-table-column
        prop="date"
        label="包装编码"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="包装名称"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="address" label="包装单位" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="包装消费码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="包装存证Hash" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="存证时间" align="center"></el-table-column>
      <el-table-column prop="address" label="次级标签数量" align="center"></el-table-column>
      <el-table-column prop="address" label="生成日期" align="center"></el-table-column>
      <el-table-column prop="address" label="企业编码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="企业名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <div style="width:95%;margin:0 auto;text-align:center;margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      value: "",
      radio1: "",
      radio2: "",
      currentPage: 1
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
