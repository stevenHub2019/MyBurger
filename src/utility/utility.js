export const updateObject=(oldObj,updatedPropertyObj)=>{
    return{
        ...oldObj,
        ...updatedPropertyObj
    }
};

export const checkValidity=(value, rules)=>{
    let isValid=true;
    
    if(!rules){
        return true;
    }

    //check if a rule exists in validation
    if(rules.required){
        isValid=value.trim() !=='' && isValid;
    }

    if(rules.minLength){
        isValid=value.length>=rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid=value.length<=rules.maxLength && isValid;
    }

    if(rules.isEmail){

        const pattern = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
        isValid= pattern.test(value) && isValid;
    }

    if(rules.isAlphaNumeric){
        const pattern=/^[a-z0-9]+$/i ;
        isValid= pattern.test(value) && isValid;
    }

    return isValid;

};
