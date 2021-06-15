import { Ispec } from '@/api/dto/product/list/getProductDetail'

interface ITdialog{
	name:string
	firstCategory:string
	secondCategory:string
	detail:string
	hasSpec:string
	firstSpec:string
	secondSpec:string
	price:string
	count:string
	number:string
	status:boolean
	id:string
	specList:Array<any>
}
interface ISpecData{
	specName:string
	optionList:Array<any>
}

class DialogTF implements ITdialog {
	name = ''
	firstCategory = ''
	secondCategory = ''
	detail = ''
	hasSpec = '0'
	firstSpec = ''
	secondSpec = ''
	price = ''
	count = ''
	number = ''
	status = true
	id = ''
	specList:any = []
	constructor(name = '', firstCategory = '', secondCategory = '', detail = '',
		hasSpec = '0',firstSpec = '',secondSpec = '', price = '', count = '',
		number = '', status = true, id = '',spec?:Array<Ispec>) {
		this.name = name
		this.firstCategory = firstCategory
		this.secondCategory = secondCategory
		this.detail = detail
		this.hasSpec = hasSpec
		this.firstSpec = firstSpec
		this.secondSpec = secondSpec
		this.price = price
		this.count = count
		this.number = number
		this.status = status
		this.id = id
		if(this.firstSpec === ''&&this.secondSpec === ''){
			this.specList.push(new SpecData())
		}else{
			let firstSpecArr:Array<string> = []
			let secondSpecArr:Array<string> = []
			if(spec){
				spec.forEach(element => {
					if(element.firstSpec!==null){
						if(!firstSpecArr.includes(element.firstSpec)){
							firstSpecArr.push(element.firstSpec)
						}
					}
					if(element.secondSpec!==null){
						if(!secondSpecArr.includes(element.secondSpec)){
							secondSpecArr.push(element.secondSpec)
						}
					}
				});
			}
			if(this.firstSpec!==''){
				this.specList.push(new SpecData(this.firstSpec,firstSpecArr))
			}
			if(this.secondSpec!==''){
				this.specList.push(new SpecData(this.secondSpec,secondSpecArr))
			}
		}
	}
}
class SpecData {
	constructor(specName = '',optionList:Array<string> = []) {
		this.specName = specName
		if(optionList.length>0){
			optionList.forEach(element => {
				this.optionList.push(new OptionData(element))
			});
		}else{
			this.optionList.push(new OptionData())
		}
	}
	specName = ''
	optionList:any = []
}
class OptionData {
	constructor(optionName = '') {
		this.optionName = optionName
	}
	optionName = ''
}
export { DialogTF, ITdialog, SpecData, OptionData,ISpecData }
