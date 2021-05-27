<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增帳號">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="帳號 (電子信箱)" prop="account">
            <el-input v-model="formdata.account" placeholder="請輸入帳號" />
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="formdata.password" placeholder="請輸入密碼" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入姓名" />
          </el-form-item>
          <el-form-item label="權限" prop="roleName">
            <el-select v-model="formdata.roleName">
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
        <el-button @click="submitForm" type="primary">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IndexTF } from './format/indexTF'
import { DialogTF } from './format/dialogTF'
import { CreateUsersF } from './format/createUserF'
import { createUsers } from '@/api/system'
import { FormMode } from '@/share/formType'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private formdata = new DialogTF()
  private authorityOption = ['超級管理員', '管理員']
  private dialogVisible = false
  private formMode:FormMode = FormMode.create
  private handleClose() {
  	this.dialogVisible = false
  }

  private handleOpen(formdata:IndexTF, editId:number) {
  	this.dialogVisible = true
  	this.formdata.account = formdata.account
  	this.formdata.name = formdata.name
  	this.formdata.roleName = formdata.roleName
  	this.formMode = editId === undefined ? FormMode.create : FormMode.edit
  }

  private submitForm() {
    let formData:any = null
  	switch (this.formMode) {
  	case FormMode.create:
  		formData = new CreateUsersF(
  			this.formdata.account,
  			this.formdata.password,
  			this.formdata.name,
  			'60a9cbae3932cf48d465d6cb',
  			'1'
  		)
  		createUsers(formData).then((res:any) => {
  			if (res) {
  				console.log(res)
  				console.log('success')
  			} else {
  				console.log('fall')
  			}
  		})
  		break
  	case FormMode.edit:
  		break
  	}
  }
}
</script>
<style scoped lang="scss">

</style>
