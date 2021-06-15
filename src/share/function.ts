export function nullReturn(target:any,nullReturn:any,elseReturn:any){
    if(typeof target === typeof null){
        return nullReturn
    }else{
        return elseReturn
    }
}