<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="新增帳號">
      <el-form ref="dataForm" :rules="rules" :model="formdata" class="formBox">
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
import { IQcreateUsers } from '@/api/dto/system/users/createUsers'
import { IQupdateUsers } from '@/api/dto/system/users/updateUsers'
import { createUsers, updateUser } from '@/api/system'
import { FormMode } from '@/share/formType'
import { Iselect, findSelectIdByName } from '@/share/select'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'
import { alphanumericRule,alphanumeriChineseRule } from '@/share/rule'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  @Prop({ default: () => [] }) private rolesOption!: Iselect[]

  private formdata:ITdialog = new DialogTF()
  private dialogVisible = false
  private formMode:FormMode = FormMode.create
  private rules = {
    account: [
      { required: true, message: '請輸入帳號', trigger: 'blur' },
      { type: 'email', message: '信箱格式錯誤', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '請輸入密碼', trigger: 'blur' },
      { validator: alphanumericRule(this.formdata.password,'password',this.$refs.dataForm)
        , trigger: 'change' }
    ],
    name: [
      { required: true, message: '請輸入名稱', trigger: 'blur' },
      { validator: alphanumeriChineseRule(this.formdata.name,'name',this.$refs.dataForm)
        , trigger: 'change' }
    ],
    roleName: [
      { required: true, message: '請選擇權限', trigger: 'blur' }
    ]
  }

  get isCreateMode() {
    return this.formMode === FormMode.create
  }

  private handleClose() {
    const ref:any = this.$refs.dataForm
    ref.clearValidate()
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
    const ref:any = this.$refs.dataForm
  	switch (this.formMode) {
  	case FormMode.create:
        ref.validate(valid => {
          if (valid) {
            const createFormData:IQcreateUsers = {
              account: this.formdata.account,
              password: this.formdata.password,
              name: this.formdata.name,
              roleId: findSelectIdByName(this.rolesOption, this.formdata.roleName),
              status: this.formdata.status ? '1' : '0'
            }
            createUsers(createFormData).then((res:any) => {
              const resData:ISnoData = res
              if (resData.success) {
                this.$emit('updateData', true, resData.msg)
              } else {
                this.$emit('updateData', false, resData.msg)
              }
              this.handleClose()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
  		break;
  	case FormMode.edit:
      ref.validate(valid => {
          if (valid) {
            const updateFormData:IQupdateUsers = {
              account: this.formdata.account,
              name: this.formdata.name,
              roleId: findSelectIdByName(this.rolesOption, this.formdata.roleName),
              status: this.formdata.status ? '1' : '0'
            }
            const idData:IQid = {
              id: this.formdata.id
            }
            updateUser(updateFormData, idData).then((res:any) => {
                const resData:ISnoData = res
              if (resData.success) {
                  this.$emit('updateData', true, resData.msg)
              } else {
                  this.$emit('updateData', false, resData.msg)
              }
                this.handleClose()
            })
          }
        }
      )
  		break;
  	}
  }
}
</script>
<style scoped lang="scss">

</style>
