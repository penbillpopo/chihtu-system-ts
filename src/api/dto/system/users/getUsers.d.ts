/* response */
interface Icontent{
	id:string
	account:string
	password:string
	name:string
	roleId:string
	roleName:string
	roles:string
	roleLevel:number
	status:string
	createdAt:string
	updatedAt:string
}
interface Idata{
	content:[Icontent]
	total:number
}
interface ISgetUsers{
	success:boolean
	data:Idata
	msg:string
}
export { ISgetUsers }
