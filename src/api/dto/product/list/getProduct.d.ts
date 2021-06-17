/* request */
interface Icontent{
	id:string
	name:string
	headImage:string
	number:string
	count:number
	status:number
	createdAt:string
	updatedAt:string
}
interface Idata{
	content:[Icontent]
	total:number
}
interface ISgetProdcut{
	success:boolean
	data:Idata
	msg:string
}

export { ISgetProdcut }
