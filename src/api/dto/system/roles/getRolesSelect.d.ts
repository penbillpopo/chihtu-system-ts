/* response */
interface Icontent{
	id:string
	name:string
}
interface Idata{
	content:[Icontent]
}
interface ISgetRolesSelect{
	success:boolean
	data:Idata
	msg:string
}
export { ISgetRolesSelect }
