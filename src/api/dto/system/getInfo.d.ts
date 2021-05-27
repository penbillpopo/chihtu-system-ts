/* response */
interface Idata{
	roles:string
	name:string
}
interface ISgetInfo{
	success:boolean
	data:Idata
	msg:string
}
export { ISgetInfo }
