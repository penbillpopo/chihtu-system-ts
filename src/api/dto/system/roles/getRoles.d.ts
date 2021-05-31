/* response */
interface Icontent{
	id:string
	roles:string
	name:string
    createdAt:string
	updatedAt:string
}
interface Idata{
	content:[Icontent]
	total:number
}
interface ISgetRoles{
	success:boolean
	data:Idata
	msg:string
}
export { ISgetRoles }
