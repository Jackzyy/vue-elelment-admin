<template>
  <div class="page-admin">
    <el-card>
      <el-table
        v-loading="rolesTabDataLoading"
        stripe
        border
        style="width: 80%"
        :data="userTabData.users"
      >
        <el-table-column prop="user" label="用户"></el-table-column>
        <el-table-column prop="role.name" label="权限"></el-table-column>
        <el-table-column prop="desc" label="简介"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="isAdmin(scope.row)"
              @click="handleEditUser(scope.row)"
              >编辑权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="userTabData.count"
        :page-size="userTabData.pageSize"
        @current-change="handlePages"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="用户权限编辑" :visible.sync="dialogVisible" width="800px">
      <el-form ref="form" :model="userForm" label-width="80px">
        <el-form-item label="用户">
          <el-input v-model="userForm.user" disabled></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="userForm.desc" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in rolesData"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
        currentPage: 0,
        pageSize: 10
      },
      userTabData: {},
      count: 0, // 总条数
      rolesData: [],
      userForm: {}
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
        this.rolesTabDataLoading = true
        this.userTabData = (await queryUser(this.queryParams)).data
      } catch (error) {
        throw error
      } finally {
        this.rolesTabDataLoading = false
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

    // 角色Admin不可编辑
    isAdmin(row) {
      return row.user === 'admin'
    },

    handleEditUser(row) {
      this.dialogVisible = true
      this.userForm = row
      this.roleId = row.role._id
    },

    async handleEditSubmit() {
      try {
        this.dialogVisible = false
        await editUserRole({
          user: this.userForm.user,
          _id: this.roleId
        })
        this.$message({
          message: '编辑成功',
          type: 'success',
          center: true
        })
        this.queryUser()
      } catch (error) {
        throw error
      } finally {
        this.dialogVisible = false
      }
    },

    handlePages(val) {
      this.queryParams.currentPage = val - 1
      this.queryUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-admin {
  .el-card {
    min-height: 88vh;
    position: relative;
    .el-table {
      margin-bottom: 50px;
    }
    .el-pagination {
      text-align: right;
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>
