/* request */
interface Idata{
	fileName:string
}
interface IQuploadProdImage{
	success:boolean
	data:Idata
	msg:string
}

export { IQuploadProdImage }
