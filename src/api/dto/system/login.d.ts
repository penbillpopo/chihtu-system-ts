/* request */
interface IQlogin{
	account:string
	password:string
}
/* response */
interface Idata{
	islogin:boolean
	token:string
}
interface ISlogin{
	success:boolean
	data:Idata
	msg:string
}
export { IQlogin, ISlogin }
