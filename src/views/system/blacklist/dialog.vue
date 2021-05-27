<template>
  <div class="dialog-container small">
    <el-dialog :visible.sync="dialogVisible" title="新增黑名單IP">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow all">
          <el-form-item label="黑名單IP" prop="blockIp">
            <el-input v-model="formdata.blockIp" placeholder="請輸入黑名單IP" />
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item label="原因" prop="reason">
            <el-input v-model="formdata.reason" placeholder="請輸入原因" type="textarea" />
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
