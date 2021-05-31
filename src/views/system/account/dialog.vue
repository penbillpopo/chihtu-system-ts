<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增帳號">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="帳號 (電子信箱)" prop="account">
            <el-input v-model="formdata.account" placeholder="請輸入帳號" />
          </el-form-item>
          <el-form-item label="密碼" prop="password" v-if="isCreateMode">
            <el-input v-model="formdata.password" placeholder="請輸入密碼" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="權限" prop="roleName">
            <el-select v-model="formdata.roleName">
              <el-option v-for="item in rolesOption" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item label="啟用" prop="status" class="flex">
            <el-switch
              v-model="formdata.status"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="submitForm" type="primary">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IndexTF } from './format/indexTF'
import { DialogTF, ITdialog } from './format/dialogTF'
import { CreateUsersF } from './format/createUsersF'
import { UpdateUsersF } from './format/updateUsersF'
import { createUsers, updateUser } from '@/api/system'
import { FormMode } from '@/share/formType'
import { Iselect, findSelectIdByName } from '@/share/select'
import { ISnoData } from '@/api/dto/common/resNoData'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  @Prop({ default: () => [] }) private rolesOption!: Iselect[]

  private formdata:ITdialog = new DialogTF()
  private dialogVisible = false
  private formMode:FormMode = FormMode.create
  get isCreateMode() {
    return this.formMode === FormMode.create
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
        this.formdata = new DialogTF(formdata.account,
          formdata.name, formdata.roleName, formdata.status, formdata.id)
        break
    }
  }

  private submitForm() {
    let formData:any = null
  	switch (this.formMode) {
  	case FormMode.create:
  		formData = new CreateUsersF(
  			this.formdata.account,
  			this.formdata.password,
  			this.formdata.name,
  			findSelectIdByName(this.rolesOption, this.formdata.roleName),
  			this.formdata.status ? '1' : '0'
  		)
  		createUsers(formData).then((res:any) => {
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
        formData = new UpdateUsersF(
  			this.formdata.id,
  			this.formdata.account,
  			this.formdata.name,
  			findSelectIdByName(this.rolesOption, this.formdata.roleName),
  			this.formdata.status ? '1' : '0'
  		)
  		updateUser(formData).then((res:any) => {
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
  // @Watch('rolesOption', { immediate: true, deep: true })
  // OnformdataChange(value: string) {
  //   console.log(value)
  // }
}
</script>
<style scoped lang="scss">

</style>
