import validator from "validator"
import isLocalEmpty from "./isLocalEmpty.js"

const validateLoginInput = (data) =>{
    const errors = {}
    
    data.email = !isLocalEmpty(data.email) ? data.email : '';
    data.password = !isLocalEmpty(data.password) ? data.password : '';

    if(validator.isEmpty(data.email)){
        errors.email = "Email is Required.";
    }
    if(!validator.isEmail(data.email)){
        errors.email = "Email is not valid."
    }

   
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required."
    }

    return {
        errors,
        isValid: isLocalEmpty(errors)
    }
}

export default validateLoginInput