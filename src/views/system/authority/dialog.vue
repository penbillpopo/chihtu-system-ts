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
                  <div
                    v-for="subitem in item.children"
                    :key="subitem.major"
                    :label="subitem.major">
                    <el-checkbox
                      :label="subitem.major"
                    >
                      {{$t('authority.'+subitem.major)}}
                    </el-checkbox>
                    <el-checkbox
                      v-for="minoritem in subitem.minor"
                      :key="minoritem"
                      :label="minoritem"
                    >
                      {{$t('authority.' + minoritem)}}
                    </el-checkbox>
                  </div>

                </el-checkbox-group>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="submitForm" type="primary">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthTable } from '@/share/authTable'
import { IndexTF } from './format/indexTF'
import { DialogTF } from './format/dialogTF'
import { FormMode } from '@/share/formType'
import { IQcreateRoles } from '@/api/dto/system/roles/createRoles'
import { IQupdateRoles } from '@/api/dto/system/roles/updateRoles'
import { createRoles, updateRoles } from '@/api/system'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private dialogVisible = false
  private activeName = 'system'
  private authorityList = AuthTable.authTableList
  private formdata = new DialogTF()
  private formMode:FormMode = FormMode.create

  mounted() {
  }

  private handleClose() {
  	this.dialogVisible = false
  }

  private handleOpen(formdata:IndexTF, editId:number) {
  	this.dialogVisible = true
    this.formMode = editId === undefined ? FormMode.create : FormMode.edit
    switch (this.formMode) {
      case FormMode.create:
        this.formdata = new DialogTF()
        break
      case FormMode.edit:
        this.formdata = new DialogTF(formdata.name,
          this.formdata.roles = [...formdata.oriRoles.split(',')], formdata.id)
        break
    }
  }

  private changeRolesToCode(roles:Array<string>) {
    const codeArr = roles.map(item => AuthTable.getAuthKeyByValue(item))
    return codeArr.toString()
  }

  private submitForm() {
    switch (this.formMode) {
      case FormMode.create:
        const createFormData:IQcreateRoles = {
          name: this.formdata.name,
          roles: this.changeRolesToCode(this.formdata.roles)
        }
        createRoles(createFormData).then((res:any) => {
          const resData:ISnoData = res
          if (resData.success) {
            this.$emit('updateData', true, resData.msg)
          } else {
            this.$emit('updateData', false, resData.msg)
          }
          this.handleClose()
        })
        break
      case FormMode.edit:
        const updateFormData:IQupdateRoles = {
          name: this.formdata.name,
          roles: this.changeRolesToCode(this.formdata.roles)
        }
        const idData:IQid = { id: this.formdata.id }
        updateRoles(updateFormData, idData).then((res:any) => {
          const resData:ISnoData = res
          if (resData.success) {
            this.$emit('updateData', true, resData.msg)
          } else {
            this.$emit('updateData', false, resData.msg)
          }
          this.handleClose()
        })
        break
  	}
  }
}
</script>
<style scoped lang="scss">

</style>
