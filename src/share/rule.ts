export const alphanumericRule = function(props:any, propsName:string, refs:any) {
  return (rule:any, value:any, callback:any) => {
    const reg = /[^A-Za-z0-9]/
    if (reg.test(value)) {
      callback(new Error('請輸入英文或數字'))
    } else {
      if (props !== '') {
        refs.validateField(propsName)
      }
      callback()
    }
  }
}
export const alphanumeriChineseRule = function(props:any, propsName:string, refs:any) {
  return (rule:any, value:any, callback:any) => {
    const reg = /[^A-Za-z0-9\u4E00-\u9FFF]/
    if (reg.test(value)) {
      callback(new Error('請輸入中英文或數字'))
    } else {
      if (props !== '') {
        refs.validateField(propsName)
      }
      callback()
    }
  }
}
