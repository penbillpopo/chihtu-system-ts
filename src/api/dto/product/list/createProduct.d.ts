/* request */
interface IProdSpec{
	firstSpec: string;
	secondSpec: string;
	price: number;
	count: number;
	number: string;
}
interface IQcreateProduct{
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
	status: number
	spec:Array<IProdSpec>
}

export { IQcreateProduct,IProdSpec }