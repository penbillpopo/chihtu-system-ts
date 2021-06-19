/* request */
interface IQgetProdcutDetail{
	id:string
}

/* response */
interface Ispec{
	firstSpec: string|null
	secondSpec: string|null
	count: number
	price: number
	number: string
}
interface Icontent{
	id:string
	name:string
	firstCategory:string
	secondCategory:string
	detail:string
	hasSpec:number
	firstSpec:string|null
	secondSpec:string|null
	number:string|null
	price:number|null
	count:number|null
	headImage:string
	prodImages:string
	status:number
	spec:Array<Ispec>
}
interface Idata{
	content:Icontent
	total:number
}
interface ISgetProdcutDetail{
	success:boolean
	data:Idata
	msg:string
}

export { ISgetProdcutDetail, IQgetProdcutDetail, Ispec }
