<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增權限">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="權限名稱" prop="name">
            <el-input placeholder="請輸入權限名稱" />
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item>
            <el-tabs v-model="activeName">
              <el-tab-pane v-for="item in authorityList" :key="item.name" :label="item.name" :name="item.name">
                <el-checkbox-group v-model="formdata.authority">
                  <el-checkbox
                    v-for="subitem in item.authority"
                    :key="subitem"
                    :label="subitem"
                  />
                </el-checkbox-group>
              </el-tab-pane>
            </el-tabs>
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
// import { getAuthorities } from '@/utils/authority'
@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private formdata = { authority: '' }
  private dialogVisible = false
  private activeName = '頁面管理'
  private authorityList = []
  // private authorityList = getAuthorities()
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
