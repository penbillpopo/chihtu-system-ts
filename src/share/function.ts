export function nullReturn(target:any, nullReturn:any, elseReturn:any) {
  if (typeof target === typeof null) {
    return nullReturn
  } else {
    return elseReturn
  }
}
export function objectToFormData(target:any) {
  const formData = new FormData()
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const element = target[key]
      formData.append(key, JSON.stringify(element))
    }
  }
  return formData
}
