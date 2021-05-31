<template>
  <div class="page-container hasBottomField">
    <!-- <router-link to="/product/productList">
        Back
    </router-link> -->
    <div class="page-body">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="商品名稱" prop="name" class="formItem">
            <el-input v-model="formdata.name" placeholder="請輸入商品名稱" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="商品一級分類" prop="firstCategory">
            <el-select v-model="formdata.firstCategory" placeholder="請選擇一級分類">
              <el-option v-for="(item,index) in firstCategoryOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品二級分類" prop="secondCategory">
            <el-select v-model="formdata.secondCategory" placeholder="請選擇二級分類">
              <el-option v-for="(item,index) in secondCategoryOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item label="商品詳情" prop="detail">
            <el-input v-model="formdata.detail" placeholder="請輸入商品詳情" type="textarea" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="有無規格" prop="spec">
            <el-radio v-model="formdata.spec" label="0">無</el-radio>
            <el-radio v-model="formdata.spec" label="1">有</el-radio>
          </el-form-item>
        </div>
        <div v-if="formdata.spec==='0'">
          <div class="formRow">
            <el-form-item label="商品價格" prop="price">
              <el-input v-model="formdata.price" placeholder="請輸入商品價格" />
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="商品數量" prop="amount">
              <el-input v-model="formdata.amount" placeholder="請輸入商品數量" />
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="商品貨號" prop="number">
              <el-input v-model="formdata.number" placeholder="請輸入商品貨號" />
            </el-form-item>
          </div>
        </div>
        <div v-else class="specField">
          <div v-for="(item,index) in formdata.specList" :key="index" class="specGroup">
            <div class="specbox">
              <el-form-item label="規格名稱" prop="">
                <el-input v-model="item.specName" placeholder="請輸入規格名稱" />
              </el-form-item>
              <div v-for="(subitem,subindex) in item.optionList" :key="subindex" class="optionBox">
                <el-form-item :label="subindex===0?'選項':''">
                  <div class="optionItem">
                    <el-input v-model="subitem.optionName" placeholder="請輸入選項名稱" />
                    <button
                      v-if="subindex===item.optionList.length - 1"
                      class="optionBtn"
                      type="button"
                      @click="addOptionbox(item)"
                    >
                      <i class="el-icon-circle-plus" />
                    </button>
                    <button
                      v-else
                      class="optionBtn"
                      type="button"
                      @click="deleteOptionbox(item,subindex)"
                    >
                      <i class="el-icon-remove" />
                    </button>
                  </div>
                </el-form-item>
              </div>
            </div>
            <div v-if="index===formdata.specList.length - 1 && formdata.specList.length===1" class="specBtnBox">
              <el-button
                class="specBtn"
                type="primary"
                size="mini"
                icon="el-icon-circle-plus-outline"
                @click="addSpecbox"
              >
                新增規格</el-button>
            </div>
            <dir v-else-if="index===formdata.specList.length - 1" class="specBtnBox">
              <el-button
                class="specBtn"
                type="primary"
                size="mini"
                icon="el-icon-circle-plus-outline"
                @click="addSpecbox"
              >
                新增規格</el-button>
              <el-button
                class="specBtn"
                type="danger"
                size="mini"
                icon="el-icon-remove-outline"
                @click="deleteSpecbox(index)"
              >
                刪除規格</el-button>
            </dir>
            <dir v-else class="specBtnBox">
              <el-button
                class="specBtn"
                type="danger"
                size="mini"
                icon="el-icon-remove-outline"
                @click="deleteSpecbox(index)"
              >
                刪除規格</el-button>
            </dir>
          </div>
        </div>
        <div v-if="specListVisiable" class="formRow all">
          <p class="rowTitle">規格表</p>
          <el-table
            :data="specTable"
            class="table-form"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item,index) in formdata.specList"
              :key="index"
              :label="item.specName"
              :prop="item.specName"
              min-width="120"
            />
            <el-table-column
              label="價格"
              prop="price"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].optionPrice" @change="modifySpecTable" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品數量"
              prop="amount"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].optionAmount" @change="modifySpecTable" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="貨號"
              prop="itemNumber"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].optionItemNumber" @change="modifySpecTable" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="formRow all">
          <div class="uploadField">
            <div class="uploadBox">
              <p class="uploadTitle">封面圖片</p>
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="1"
                :class="{hide: hideCoverUploadBtn}"
                :auto-upload="false"
                :on-change="coverUploadChange"
                :on-preview="coverUploadCardPreview"
                :on-remove="coverUploadRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </div>
            <div class="uploadBox">
              <p class="uploadTitle">商品圖片</p>
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="6"
                :class="{hide: hideUploadBtn}"
                :auto-upload="false"
                :on-change="uploadChange"
                :on-preview="uploadCardPreview"
                :on-remove="uploadRemove"
              >
                <i class="el-icon-plus" />
                <p slot="tip" class="el-upload__tip" />
              </el-upload>
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="formRow">
          <el-form-item label="是否上線" prop="publish" class="flex">
            <el-switch
              v-model="formdata.publish"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="bottomField">
      <el-button @click="$router.push('/product/productList')">取消</el-button>
      <el-button>儲存並下架</el-button>
      <el-button type="primary">儲存並上架</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
class FormData {
  constructor() {
    this.specList.push(new SpecData())
  }

    name = ''
    firstCategory = ''
    secondCategory = ''
    detail = ''
    spec = ''
    price = ''
    amount = ''
    number = ''
    specList:any = []
    publish = ''
}
class SpecData {
  constructor() {
    this.optionList.push(new OptionData())
  }

  specName = ''
  optionList:any = []
}
class OptionData {
    optionName = ''
    optionPrice =''
    optionAmount =''
    optionItemNumber =''
}
@Component({
  name: 'Edit'
})
export default class extends Vue {
  private formdata:any = null
  private firstCategoryOption = ['女性衣著', '男性衣著', '美妝保健']
  private secondCategoryOption = ['T-shirt', '長褲', '短褲']
  private specTable:any = []
  private recursiveTempObj:any = {}
  private dialogImageUrl = ''
  private dialogVisible = false
  private hideCoverUploadBtn = false
  private hideUploadBtn = false
  private temp:any = []

  private modifySpecTable() {
  	for (let i = 0; i < this.temp.length; i++) {
  		if (this.temp[i].optionPrice) {
  			this.$set(this.specTable[i], 'optionPrice', this.temp[i].optionPrice)
  		}
  		if (this.temp[i].optionAmount) {
  			this.$set(this.specTable[i], 'optionAmount', this.temp[i].optionAmount)
  		}
  		if (this.temp[i].optionItemNumber) {
  			this.$set(this.specTable[i], 'optionItemNumber', this.temp[i].optionItemNumber)
  		}
  	}
  }

  private addSpecbox() {
  	this.formdata.specList.push(new SpecData())
  }

  private deleteSpecbox(index:any) {
  	this.formdata.specList.splice(index, 1)
  }

  private addOptionbox(parent:any) {
  	parent.optionList.push(new OptionData())
  }

  private deleteOptionbox(parent:any, index:any) {
  	parent.optionList.splice(index, 1)
  }

  private specListRecursive(arr:any, index:any) {
  	if (index === arr.length) {
  		this.specTable.push(Object.assign({}, this.recursiveTempObj))
  		return
  	}
  	for (let i = 0; i < arr[index].optionList.length; i++) {
  		this.recursiveTempObj[arr[index].specName] = arr[index].optionList[i].optionName
  		this.specListRecursive(arr, index + 1)
  	}
  }

  private coverUploadRemove(file:any, fileList:any) {
  	this.coverUploadBtnVisable(fileList)
  }

  private coverUploadChange(file:any, fileList:any) {
  	this.coverUploadBtnVisable(fileList)
  }

  private coverUploadCardPreview(file:any) {
  	this.dialogImageUrl = file.url
  	this.dialogVisible = true
  }

  private coverUploadBtnVisable(fileList:any) {
  	if (fileList.length >= 1) {
  		this.hideCoverUploadBtn = true
  	} else {
  		this.hideCoverUploadBtn = false
  	}
  }

  private uploadRemove(file:any, fileList:any) {
  	this.uploadBtnVisable(fileList)
  }

  private uploadChange(file:any, fileList:any) {
  	this.uploadBtnVisable(fileList)
  }

  private uploadCardPreview(file:any) {
  	this.dialogImageUrl = file.url
  	this.dialogVisible = true
  }

  private uploadBtnVisable(fileList:any) {
  	if (fileList.length >= 6) {
  		this.hideUploadBtn = true
  	} else {
  		this.hideUploadBtn = false
  	}
  }

  get specListVisiable():boolean {
  	if (this.formdata.specList[0].specName === '' ||
        this.formdata.specList[0].optionList[0].optionName === '') { return false }
  	return true
  }

  created() {
  	this.formdata = new FormData()
  }

  @Watch('formdata.specList')
  onPropertyChanged(value: string) {
  	this.temp = [...this.specTable]
  	this.specTable = []
  	this.recursiveTempObj = {}
  	this.specListRecursive(value, 0)
  	this.modifySpecTable()
  }
}
</script>
<style scoped lang="scss">
  .specField{
    margin-bottom: 22px;
    .specGroup{
      margin-bottom: 10px;
      .specbox{
        width: 50%;
        background-color: #00000005;
        padding: 15px;
        padding-right: 40px;
        margin-bottom: 10px;
        .specTitle{
          margin-bottom: 10px;
        }
        .optionBox{
          .el-form-item{
            margin-bottom: 10px;
          }
          .optionItem{
            position: relative;
            .optionBtn{
              position: absolute;
              right: 0%;
              bottom: 0%;
              transform: translate(100%,0%);
              width: 36px;
              height: 36px;
              border: 0;
              background-color: transparent;
              cursor: pointer;
              .el-icon-circle-plus{
                font-size: 20px;
                color: #1890ff;
              }
              .el-icon-remove{
                font-size: 20px;
                color: #ff4949;
              }
            }
          }

        }
      }
      .specBtnBox{
        width: 50%;
        padding: 0;
        display: flex;
        margin: 5px 0;
        .specBtn{
          width: 100%;
        }
      }
    }
  }
  .formRow{
    .addImg{
      .el-input__inner{
        display: none;
        border: 0!important;
        color: transparent!important;
      }
    }
  }
  ::v-deep .uploadField{
    background-color: #00000005;
    padding: 15px;
    padding-right: 40px;
    .uploadBox{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .uploadTitle{
        font-size: 14px;
        font-weight: 700;
        color: #606266;
        margin-right: 15px;
        white-space: nowrap;
      }
      .hide .el-upload.el-upload--picture-card {
        display: none!important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .specField{
      .specGroup{
        .specbox{
          width: 100%;
        }
        .specBtnBox{
          width: 100%;
        }
      }
    }
  }
</style>
