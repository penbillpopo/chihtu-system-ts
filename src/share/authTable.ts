interface IauthChildren{
	major:string
	minor:string[]
}
interface IauthTable{
	name:string
	head:string
	children:IauthChildren[]
}
enum AuthChildType{
	major,
	minor
}
/*
為了減少存進資料庫的字串長度，以所短編碼代替
規則:(左到右)
英文字母(1) + 數字(2) + 英文字母(3) + 數字(4)
*英文字母(1)為自定義，小寫並且不可重複，一般為類別標頭第一個字。
*英文字母(3)為J時:第"數字(2)"children的major。
*英文字母(3)為N時:第"數字(2)"children的minor中第"數字(4)"index。
*/
class AuthTable {
    static authTableList:Array<IauthTable> = [
    	{
    		name: 'system',
    		head: 's',
    		children: [
          {
            major: 'checkAccount',
            minor: ['editAccount', 'deleteAccount']
          },
          {
            major: 'checkAuthority',
            minor: ['editAuthority', 'deleteAuthority']
          },
          {
            major: 'checkLogs',
            minor: ['editLogs', 'deleteLogs']
          },
          {
            major: 'checkBlacklist',
            minor: ['editBlacklist', 'deleteBlacklist']
          }
    		]
    	},
    	{
    		name: 'product',
    		head: 'p',
    		children: [
          {
            major: 'checkProductList',
            minor: ['editProductList', 'deleteProductList']
          },
          {
            major: 'checkProductCategory',
            minor: ['editProductCategory', 'deleteProductCategory']
          },
          {
            major: 'checkShipCategory',
            minor: ['editShipCategory', 'deleteShipCategory']
          }
    		]
    	},
    	{
    		name: 'order',
    		head: 'o',
    		children: [
          {
            major: 'checkOrderList',
            minor: ['editOrderList', 'deleteOrderList']
          }
    		]
    	}
    ]

    static getAuthKeyByValue(value:string):string {
    	for (let i = 0; i < AuthTable.authTableList.length; i++) {
    		const parent = AuthTable.authTableList[i]
    		for (let j = 0; j < parent.children.length; j++) {
    			const children = parent.children[j]
          const headTxt = parent.head + j.toString()
    			if (children.major === value) {
    				return headTxt + 'J'
    			} else {
            for (let k = 0; k < children.minor.length; k++) {
              const minor = children.minor[k]
              if (minor === value) {
                return headTxt + 'N' + k.toString()
              }
            }
          }
    		}
    	}
    	return ''
    }

    static getAuthValueByKey(key:string):string {
    	const compareHead = key[0]
    	const compareBody = key.substr(1, key.length - 1)
    	let compareType:AuthChildType = AuthChildType.major
      let codeArr:Array<any> = []
      let code = ''
      if (compareBody.includes('J')) {
        compareType = AuthChildType.major
        code = 'J'
      } else if (compareBody.includes('N')) {
        compareType = AuthChildType.minor
        code = 'N'
      }
      codeArr = compareBody.split(code)
      for (let i = 0; i < AuthTable.authTableList.length; i++) {
        const parent = AuthTable.authTableList[i]
        if (parent.head === compareHead) {
          for (let j = 0; j < parent.children.length; j++) {
            const children = parent.children[j]
            if (j.toString() === codeArr[0]) {
              switch (compareType) {
                case AuthChildType.major:
                  return children.major
                case AuthChildType.minor:
                  for (let k = 0; k < children.minor.length; k++) {
                    const minor = children.minor[k]
                    if (k.toString() === codeArr[1]) {
                      return minor
                    }
                  }
                  break
              }
            }
          }
        }
      }
      return ''
    }
}
export { AuthTable }
