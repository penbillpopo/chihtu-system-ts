<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增帳號">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="帳號 (電子信箱)" prop="email">
            <el-input v-model="formdata.email" placeholder="請輸入帳號" />
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="formdata.email" placeholder="請輸入密碼" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="姓名" prop="email">
            <el-input v-model="formdata.email" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="權限" prop="authority">
            <el-select v-model="formdata.authority">
              <el-option v-for="item in authorityOption" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="啟用" prop="status" class="flex">
            <el-switch
              v-model="formdata.status"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private formdata = {}
  private authorityOption = ['超級管理員', '管理員']
  private dialogVisible = false
  private handleClose() {
    this.dialogVisible = false
  }

  private handleOpen(formdata:any) {
    this.dialogVisible = true
    this.formdata = Object.assign({}, formdata)
  }
}
</script>
<style scoped lang="scss">

</style>
