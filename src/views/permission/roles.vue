<template>
  <div class="roles">
    <el-card>
      <el-button type="primary" @click="handleAddRoles">添加权限</el-button>

      <!-- 权限角色 -->
      <el-table
        v-loading="rolesTabDataLoading"
        :data="rolesTabData"
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
      rolesTabData: [], // 角色表格数据
      rolesTabDataLoading: false // 表格Loading
    }
  },

  created() {
    this.getRolesArr()
  },

  methods: {
    // 格式化路由数组结构，处理只有一个children和hidden的情景
    formatRoutes(routesArr) {
      return routesArr
        .filter(item => {
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

    // Ajax获取角色权限信息
    async getRolesArr() {
      this.rolesTabDataLoading = true
      this.rolesTabData = (await getRoles()).data.allRoles
      this.rolesTabDataLoading = false
    },

    // 角色Admin不可编辑
    isAdmin(row) {
      return row.key === 'admin'
    },

    // 编辑角色权限
    editRoles(index, row) {
      this.formData = row
      this.$nextTick(() => {
        this.$refs.rolesForm.clearValidate()
        this.$refs.tree.setCheckedKeys(row.pages)
      })

      this.dialogVisible = true
    },

    // 删除角色
    async deleteRoles(index, row) {
      try {
        await this.$confirm('此操作将永久删除相关数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.rolesTabDataLoading = true
        setTimeout(() => {
          this.rolesTabData.splice(index, 1)
          this.rolesTabDataLoading = false
        }, 3000)

        console.log(row)
      } catch (err) {
        throw err
      }
    },

    // 添加角色
    handleAddRoles() {
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
