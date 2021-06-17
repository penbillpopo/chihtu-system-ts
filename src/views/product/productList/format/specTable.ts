enum SpecListShowType{
    add,
    delete,
    addAndDelete,
}
interface IspecTableIndexData{
    indexKey:string
    specName:string
}
interface ISpecData{
	specName:string
	optionList:Array<any>
}
class specTableIndexData implements IspecTableIndexData{
    indexKey:string = ''
    specName:string = ''
    constructor(indexKey:string,specName:string){
        this.indexKey = indexKey
        this.specName = specName
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
export {SpecListShowType,IspecTableIndexData,specTableIndexData,SpecData,OptionData,ISpecData}