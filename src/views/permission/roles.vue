<template>
  <div class="roles">
    <el-card>
      <el-button type="primary" @click="handleAddRoles">添加权限</el-button>

      <!-- 权限角色 -->
      <el-table
        v-loading="rolesTabLoading"
        :data="rolesTab"
        stripe
        border
        style="width: 80%"
      >
        <el-table-column prop="key" label="身份"></el-table-column>
        <el-table-column prop="description" label="说明"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editRoles(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="deleteRoles(scope.$index)"
              :disabled="isAdmin(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 权限树形图 -->
      <el-dialog title="权限编辑" :visible.sync="dialogVisible" width="800px">
        <el-form ref="rolesForm" :model="formData" :rules="rules">
          <el-form-item label="身份" prop="key" label-width="70px">
            <el-input v-model="formData.key" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="description" label-width="70px">
            <el-input
              v-model="formData.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="roles-tree">
          <span>菜单</span>
          <el-tree
            show-checkbox
            node-key="name"
            ref="tree"
            :data="treeInfo.allRoutes"
            :default-expanded-keys="formData.pages"
            :props="treeInfo.defaultProps"
            :render-after-expand="false"
          >
          </el-tree>
        </div>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router'
import { getRoles } from '@/api/roles'
export default {
  data() {
    return {
      treeInfo: {
        allRoutes: [...asyncRoutes], // 只需要异步路由即可
        defaultProps: {
          children: 'children',
          label: item => item.meta.title
        }
      },
      dialogVisible: false, // 对话框显示
      formData: {},
      rules: {
        key: [
          {
            required: true,
            message: '请输入要添加的身份类别',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入相关说明',
            trigger: 'blur'
          }
        ]
      },
      rolesTab: [],
      rolesTabLoading: false
    }
  },

  created() {
    this.getRolesArr()
  },

  methods: {
    async getRolesArr() {
      this.rolesTabLoading = true
      this.rolesTab = (await getRoles()).data.allRoles
      this.rolesTabLoading = false
    },

    isAdmin(row) {
      return row.key === 'admin'
    },

    editRoles(index, row) {
      this.formData = row
      this.$nextTick(() => {
        this.$refs.rolesForm.clearValidate()
        this.$refs.tree.setCheckedKeys(row.pages)
      })

      this.dialogVisible = true
    },

    async deleteRoles(index, row) {
      try {
        await this.$confirm('此操作将永久删除相关数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.rolesTabLoading = true
        setTimeout(() => {
          this.rolesTab.splice(index, 1)
          this.rolesTabLoading = false
        }, 3000)

        console.log(row)
      } catch (err) {
        throw err
      }
    },

    handleAddRoles() {
      this.formData = {}
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
      this.dialogVisible = true
    },

    handleGetNodes() {
      // 获取路由Tree选中的节点
      let selectRoutes = []
      let routes = this.$refs.tree.getCheckedNodes(false, true)
      for (let i = 0; i < routes.length; i++) {
        selectRoutes.push(routes[i].name)
      }
      return selectRoutes
    },

    handleSubmit() {
      this.formData.pages = this.handleGetNodes()
      this.dialogVisible = false
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
  .el-table {
    margin-top: 30px;
  }
}
</style>
