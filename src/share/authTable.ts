interface IauthTable{
	name:string
	head:string
	children:string[]
}
class AuthTable {
    static authTableList:Array<IauthTable> = [
    	{
    		name: 'system',
    		head: 's',
    		children: [
    			'checkAccount',
    			'editAccount',
    			'checkAuthority',
    			'editAuthority',
    			'checkLogs',
    			'editLogs',
    			'checkBlacklist',
    			'editBlacklist'
    		]
    	},
    	{
    		name: 'product',
    		head: 'p',
    		children: [
    			'checkProductList',
    			'editProductList',
    			'checkProductCategory',
    			'editProductCategory',
    			'checkShipCategory',
    			'editShipCategory'
    		]
    	},
    	{
    		name: 'order',
    		head: 'o',
    		children: [
    			'checkOrderList',
    			'editOrderList'
    		]
    	}
    ]

    static getAuthKeyByValue(value:string):string {
    	let compareTxt = ''
    	for (let i = 0; i < AuthTable.authTableList.length; i++) {
    		const parent = AuthTable.authTableList[i]
    		for (let j = 0; j < parent.children.length; j++) {
    			const children = parent.children[j]
    			compareTxt = parent.head + j.toString()
    			if (compareTxt === value) {
    				return children
    			}
    		}
    	}
    	return ''
    }

    static getAuthValueByKey(key:string):string {
    	const compareHead = key[0]
    	const compareBody = key.substr(1, 1)
		for (let i = 0; i < AuthTable.authTableList.length; i++) {
			const parent = AuthTable.authTableList[i];
			if (parent.head === compareHead){
				for (let j = 0; j < parent.children.length; j++) {
					const children = parent.children[j];
					if (j.toString() === compareBody){
						return children
					}
				}
			}
		}
		return ''
    }
}
export { AuthTable }
