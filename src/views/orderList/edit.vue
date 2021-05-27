<template>
  <div class="page-container hasBottomField">
    <!-- <router-link to="/product/productList">
        Back
    </router-link> -->
    <div class="page-body">
      <el-form ref="dataForm" class="formBox">
        <div class="tableGroup">
          <p class="rowTitle">訂單資訊</p>
          <table>
            <tbody>
                <tr>
                  <td class="name">訂單編號</td>
                  <td></td>
                  <td class="name">訂購日期</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="name">金額</td>
                  <td></td>
                  <td class="name">運費</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="name">付款方式</td>
                  <td></td>
                  <td class="name">運送方式</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="name">訂單狀態</td>
                  <td></td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td class="name">付款狀態</td>
                  <td></td>
                  <td class="name">付款時間</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="name">出貨狀態</td>
                  <td></td>
                  <td class="name">出貨時間</td>
                  <td></td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="tableGroup">
          <p class="rowTitle">訂單人資料</p>
          <table>
            <tbody>
                <tr>
                  <td class="name">姓名</td>
                  <td></td>
                  <td class="name">電話</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="name">Email</td>
                  <td></td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td class="name">配送方式</td>
                  <td></td>
                  <td class="name">配送地址</td>
                  <td></td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="tableGroup">
          <p class="rowTitle">發票資訊</p>
          <table>
            <tbody>
                <tr>
                  <td class="name">載具方式</td>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <td class="name">備註</td>
                  <td colspan="3"></td>
                </tr>
            </tbody>
          </table>
        </div>
      </el-form>
      <div class="table-container">
          <p class="rowTitle">訂購產品</p>
          <el-table
            :data="tableData"
            class="table-form"
            style="width: 100%"
          >
            <el-table-column
              prop="prodPic"
              label="商品圖片"
              min-width="120"
            />
            <el-table-column
              prop="prodNum"
              label="商品編號"
              min-width="120"
            />
            <el-table-column
              prop="prodName"
              label="商品名稱"
              min-width="120"
            />
            <el-table-column
              prop="count"
              label="數量"
              min-width="120"
            />
            <el-table-column
              prop="total"
              label="總額"
              min-width="120"
            />
          </el-table>
      </div>
    </div>
    <div class="bottomField">
      <el-button @click="$router.push('/order/orderList')">取消</el-button>
      <el-button type="primary">儲存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Edit'
})
export default class extends Vue {
  private formdata = null
  private dialogVisible = false
  private tableData = [
  	{
  		prodPic: '',
  		prodNum: '012345',
  		prodName: '玩具',
  		count: '紅色大:5\n綠色小: 10',
  		total: '100'
  	}
  ]
}

</script>
<style scoped lang="scss">

  .table-container{
    padding-bottom: 30px;
  }
</style>
