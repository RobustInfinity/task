
const isEmpty = require('../utils/isEmpty')


function validateFormInput(obj){

    var errors = {}

    //checking for empty, null or undefined
    var email = isEmpty(obj.email) ? '' : obj.email;
    var password = isEmpty(obj.password) ? '' : obj.password;

    //validating email
    if(isEmpty(email)){
        errors.email = 'Email cannot be empty';
    }
    if(!/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)){
        errors.email = 'Invalid Email'
    }

    //validating password
    if(isEmpty(password)){
        errors.password = 'Password cannot be empty';
    }

    return {
        errors : errors,
        isValid : isEmpty(errors)
    }
}

module.exports = validateFormInput;