<template>
  <div class="roles">
    <el-card>
      <el-button class="add-role" type="primary" @click="handleAddRoles"
        >添加权限</el-button
      >

      <!-- 权限角色 -->
      <el-table
        v-loading="rolesTabDataLoading"
        stripe
        border
        style="width: 80%"
        :data="rolesTabData.roles"
      >
        <el-table-column prop="name" label="身份"></el-table-column>
        <el-table-column prop="desc" label="说明"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="isAdmin(scope.row)"
              @click="handleEditRoles(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              size="mini"
              :disabled="isAdmin(scope.row)"
              @click="handleDeleteRoles(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="rolesTabData.count"
        :page-size="queryParams.pageSize"
        @current-change="handlePages"
      >
      </el-pagination>

      <!-- 权限树形图 -->
      <el-dialog title="权限编辑" :visible.sync="dialogVisible" width="800px">
        <el-form ref="rolesForm" :model="formData" :rules="rules">
          <el-form-item label="身份" prop="name" label-width="70px">
            <el-input v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="desc" label-width="70px">
            <el-input v-model="formData.desc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="roles-tree">
          <span>菜单</span>
          <el-tree
            show-checkbox
            node-key="name"
            ref="tree"
            :data="treeInfo.allRoutes"
            :props="treeInfo.defaultProps"
            :render-after-expand="false"
          >
          </el-tree>
        </div>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleSubmit"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router'
import { createRoles, delRoles, editRoles, queryRoles } from '@/api/roles'
export default {
  data() {
    return {
      submitType: 0, // 0:创建角色 1:编辑角色
      treeInfo: {
        allRoutes: this.formatRoutes([...asyncRoutes]), // 树形图渲染结构数据
        defaultProps: {
          children: 'children',
          label: item => item.meta.title
        }
      },
      dialogVisible: false, // 对话框显示
      formData: {}, //  对话框表单数据
      rules: {
        // 表单校验规则
        name: [
          {
            required: true,
            message: '请输入要添加的身份类别',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入相关说明',
            trigger: 'blur'
          }
        ]
      },
      // 查询参数
      queryParams: {
        currentPage: 0,
        pageSize: 10
      },
      rolesTabData: {}, // 角色表格数据
      rolesTabDataLoading: false, // 表格Loading
      fullscreenLoading: false // 全屏Loading
    }
  },

  created() {
    this.getRolesArr()
  },

  methods: {
    // Ajax获取角色权限信息
    async getRolesArr() {
      this.rolesTabDataLoading = true
      this.rolesTabData = (await queryRoles(this.queryParams)).data
      this.rolesTabDataLoading = false
    },

    // Ajax创建角色
    async createRoles() {
      try {
        this.fullscreenLoading = true
        await createRoles(this.formData)
        await this.getRolesArr()
        this.$message({
          message: '创建成功',
          type: 'success',
          center: true
        })
      } catch (err) {
        throw err
      } finally {
        this.fullscreenLoading = false
      }
    },

    // Ajax删除角色
    async delRoles(index, row) {
      try {
        this.rolesTabDataLoading = true
        await delRoles({ id: row._id })
        await this.getRolesArr()
        this.rolesTabDataLoading = false
        this.$message({
          message: '删除成功',
          type: 'success',
          center: true
        })
      } catch (err) {
        throw err
      } finally {
        this.rolesTabDataLoading = false
      }
    },

    // Ajax编辑角色
    async editRoles() {
      try {
        this.fullscreenLoading = true
        await editRoles(this.formData)
        await this.getRolesArr()
        this.$message({
          message: '编辑成功',
          type: 'success',
          center: true
        })
      } catch (err) {
        throw err
      } finally {
        this.fullscreenLoading = false
      }
    },

    handlePages(val) {
      this.queryParams.currentPage = val - 1
      this.getRolesArr()
    },

    // 格式化路由数组结构，处理只有一个children和hidden的情景
    formatRoutes(routesArr) {
      return routesArr
        .filter(item => {
          if (item.children && item.children.length === 1) {
            return !(item.hidden || item.children[0].hidden)
          }
          return !item.hidden
        })
        .map(item => {
          // 子叶存在 但是只有一个时
          if (item.children && item.children.length === 1) {
            return item.children[0]
          }
          // 子叶有多个
          if (item.children) {
            item.children = this.formatRoutes(item.children)
          }
          return item
        })
    },

    // 角色Admin不可编辑
    isAdmin(row) {
      return row.name === 'admin'
    },

    // 编辑角色权限
    handleEditRoles(index, row) {
      this.submitType = 1
      this.formData = Object.assign({ id: row._id }, row)
      this.$nextTick(() => {
        this.$refs.rolesForm.clearValidate()
        this.$refs.tree.setCheckedKeys(row.pages)
      })

      this.dialogVisible = true
    },

    // 删除角色
    async handleDeleteRoles(index, row) {
      try {
        await this.$confirm('此操作将永久删除相关数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.delRoles(index, row)
      } catch (err) {
        throw err
      }
    },

    // 添加角色
    handleAddRoles() {
      this.submitType = 0
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
      this.dialogVisible = true
    },

    // 获取路由Tree选中的节点
    handleGetNodes() {
      let selectRoutes = []
      let routes = this.$refs.tree.getCheckedNodes(false, true)
      for (let i = 0; i < routes.length; i++) {
        selectRoutes.push(routes[i].name)
      }
      return selectRoutes
    },

    // 权限确认
    async handleSubmit() {
      this.formData.pages = this.handleGetNodes()
      switch (this.submitType) {
        case 0:
          await this.createRoles()
          break
        case 1:
          await this.editRoles()
          break
        default:
          break
      }
      // this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.roles {
  .roles-tree {
    padding: 20px;
    display: flex;
    align-items: flex-start;
    span {
      margin: 5px 10px 10px;
    }
    .el-tree {
      width: 90%;
    }
  }
  .el-card {
    min-height: 88vh;
    position: relative;
    .add-role {
      position: absolute;
      top: 20px;
      right: 30px;
    }
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
