/* request */
interface IProdSpec{
	firstSpec: string
	secondSpec: string
	price: number
	count: number
	number: string
}
interface IQupdateProduct{
	name:string
	firstCategory: string
	secondCategory: string
	detail: string
	hasSpec: number
	firstSpec: string
	secondSpec: string
	price: number
	count: number
	number: string
	headImage: string
	prodImages: string
	status: number
	spec:Array<IProdSpec>

}

export { IQupdateProduct }
