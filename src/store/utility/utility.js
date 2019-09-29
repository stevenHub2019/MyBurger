export const updateObject=(oldObj,updatedPropertyObj)=>{
    return{
        ...oldObj,
        ...updatedPropertyObj
    }
}