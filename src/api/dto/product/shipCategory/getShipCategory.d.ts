/* request */
interface Icontent{
	id:string
	name:string
	createdAt:string
	updatedAt:string
}
interface Idata{
	content:[Icontent]
	total:number
}
interface ISgetShipCategory{
	success:boolean
	data:Idata
	msg:string
}

export { ISgetShipCategory }
