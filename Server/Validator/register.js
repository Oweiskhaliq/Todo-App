import validator from 'validator'
import isLocalEmpty from './isLocalEmpty.js'

const validateRegisterInput = (data) =>{
    
    const errors = {}

    data.name = !isLocalEmpty(data.name) ? data.name : "";
    data.email = !isLocalEmpty(data.email) ? data.email: "";
    data.password= !isLocalEmpty(data.password)? data.password : "";
    data.password2= !isLocalEmpty(data.password2)? data.password2 : "";

    if(!validator.isLength(data.name,{min:2,max:30})){
        errors.name = "Name must be between 2 to 40 characters."
    }

    if(validator.isEmpty(data.name)){
        errors.name = "Name field is required."
    }
   

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required."
    }
    if(!validator.isEmail(data.email)){
        errors.email = "Email is not valid."
    }
    if(!validator.isLength(data.password,{min:6,max:40})){
        errors.password="Password must be between 6 to 40 characters."
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required."
    }
  
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password is required."
    }
    if (!validator.equals(data.password,data.password2)){
    errors.password2 = "password and confrim password must be same."
    }

    return {
        errors,
        isValid: isLocalEmpty(errors)
    }
}

export default validateRegisterInput