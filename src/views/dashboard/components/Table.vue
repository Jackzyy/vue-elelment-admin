<template>
  <div class="table">
    <el-table :data="tableList" width="100%">
      <el-table-column prop="id" label="ID" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="price" label="价格" width="100"> </el-table-column>
      <el-table-column prop="quantity" label="数量" width="100">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="primary">已完成</el-tag>
          <el-tag v-if="scope.row.status === 1" type="warning">在途</el-tag>
          <el-tag v-if="scope.row.status === 2" type="danger">失败</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>
