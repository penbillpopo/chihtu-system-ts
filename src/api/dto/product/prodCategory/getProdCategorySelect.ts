interface Icontent{
	firstCategory:string
	secondCategory:[string]
}

interface Idata{
	content:[Icontent]
	total:number
}

interface ISprodCategorySelect{
	success:boolean
	data:Idata
	msg:string
}

export { ISprodCategorySelect }
