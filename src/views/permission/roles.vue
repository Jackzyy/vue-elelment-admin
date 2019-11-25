<template>
  <div class="roles">
    <el-card>
      <el-button type="primary"
                 @click="handleAddRoles">添加权限</el-button>
      <el-dialog title="权限编辑"
                 :visible.sync="dialogVisible"
                 width="800px">
        <el-form :model="formData"
                 :rules="rules"
                 ref="rolesForm">
          <el-form-item label="身份"
                        prop="key"
                        label-width="70px">
            <el-input v-model="formData.key"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明"
                        prop="description"
                        label-width="70px">
            <el-input v-model="formData.description"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="roles-tree">
          <span>菜单</span>
          <el-tree :data="allRoutes"
                   show-checkbox
                   :render-after-expand="false"
                   node-key="name"
                   :props="defaultProps"
                   ref="tree">
          </el-tree>
        </div>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleGetNodes">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router'
export default {
  data () {
    return {
      allRoutes: [...asyncRoutes], // 只需要异步路由即可
      defaultProps: {
        children: 'children',
        label: item => item.meta.title
      },
      selectRoutes: [],
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
      }
    }
  },
  methods: {
    handleAddRoles () {
      this.dialogVisible = true
    },

    handleCloseDialog () {

    },

    handleGetNodes () { // 获取路由Tree选中的节点
      let selectRoutes = []
      let routes = this.$refs.tree.getCheckedNodes(false, true)
      for (let i = 0; i < routes.length; i++) {
        selectRoutes.push(routes[i].meta.title)
      }

      this.selectRoutes = selectRoutes

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
    span{
      margin: 5px 10px 10px;
    }
    .el-tree{
      width: 90%;
    }
  }
}
</style>
