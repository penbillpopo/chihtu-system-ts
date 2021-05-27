/* response */
interface IgetRoles{
	success:boolean;
	data:Idata;
	msg:string;
}

interface Idata{
	content:[Icontent];
	total:number;
}

interface Icontent{
	id:string;
	roles:string;
	name:string;
    createdAt:string;
	updatedAt:string;
}

export {IgetRoles}
