/* request */
interface Icontent{
	id:string
	name:string
	secondCategory:string
	createdAt:string
	updatedAt:string
}
interface Idata{
	content:[Icontent]
	total:number
}
interface ISgetProdCategory{
	success:boolean
	data:Idata
	msg:string
}

export { ISgetProdCategory }
