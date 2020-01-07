<template>
  <div class="page-admin">
    <el-card>
      <el-table
        v-loading="rolesTabDataLoading"
        stripe
        border
        style="width: 80%"
        :data="tableData"
      >
        <el-table-column prop="user" label="用户"></el-table-column>
        <el-table-column prop="role.name" label="权限"></el-table-column>
        <el-table-column prop="desc" label="简介"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEditUser(scope.$index, scope.row)"
              >编辑权限</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="handleDeleteUser(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="用户权限编辑" :visible.sync="dialogVisible" width="800px">
      <el-select v-model="roleId" placeholder="请选择">
        <el-option
          v-for="item in rolesData"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryUser, queryRoles, editUserRole } from '@/api/roles'
export default {
  data() {
    return {
      roleId: '',
      rolesTabDataLoading: false,
      dialogVisible: false,
      // 查询参数
      queryParams: {
        page: 0,
        pageSize: 20
      },
      tableData: [],
      rolesData: []
    }
  },

  async created() {
    await this.queryUser()
    await this.queryRoles()
  },

  methods: {
    // Ajax 查询所有用户
    async queryUser() {
      try {
        this.tableData = (await queryUser(this.queryParams)).data
      } catch (error) {
        throw error
      }
    },

    // Ajax 查询所有角色
    async queryRoles() {
      try {
        this.rolesData = (await queryRoles()).data
      } catch (error) {
        throw error
      }
    },

    handleEditUser() {
      this.dialogVisible = true
    },

    handleDeleteUser() {},

    async handleEditSubmit() {
      try {
        this.dialogVisible = false
        await editUserRole({ role: this.roleId })
      } catch (error) {
        throw error
      } finally {
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
