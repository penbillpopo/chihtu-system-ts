<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增權限">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="權限名稱" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入權限名稱" />
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item>
            <el-tabs v-model="activeName">
              <el-tab-pane v-for="item in authorityList" :key="item.name" 
                :label="$t('authority.'+item.name)" :name="item.name">
                <el-checkbox-group v-model="formdata.roles">
                  <el-checkbox
                    v-for="subitem in item.children"
                    :key="subitem"
                    :label="$t('authority.'+subitem)"
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AuthTable } from '@/share/authTable'
import { IndexTF } from './format/indexTF'
import { DialogTF } from './format/dialogTF'
import { FormMode } from '@/share/formType'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private dialogVisible = false
  private activeName = 'system'
  private authorityList = AuthTable.authTableList
  private formdata = new DialogTF()
  private formMode:FormMode = FormMode.create

  private handleClose() {
  	this.dialogVisible = false
  }

  private handleOpen(formdata:IndexTF, editId:number) {
  	this.dialogVisible = true
  	this.formdata.name = formdata.name
  	this.formdata.roles = [...formdata.roles.split(',')]
  }
  @Watch('formdata',{ immediate: true, deep: true })
  OnformdataChange(value: string){
    console.log(value)
  }


}
</script>
<style scoped lang="scss">

</style>
