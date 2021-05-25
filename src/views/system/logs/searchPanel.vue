<template>
  <div class="search-panel">
    <el-form ref="form" class="search-form">
      <el-form-item prop="timestamp" class="small-gap">
        <el-date-picker type="datetime" placeholder="請輸入開始時間" clearable />
      </el-form-item>
      <el-form-item prop="timestamp" class="small-gap">
        <el-date-picker type="datetime" placeholder="請輸入結束時間" clearable />
      </el-form-item>
      <el-button type="primary">查詢</el-button>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'SearchPanel'
})
export default class extends Vue {
  private option = 'email'
  private optionList = [{
    value: 'email',
    label: '帳號(信箱)'
  }, {
    value: 'name',
    label: '名稱'
  }, {
    value: 'phone',
    label: '電話'
  }, {
    value: 'authority',
    label: '權限'
  }]
}
</script>
<style scoped lang="scss">
</style>
