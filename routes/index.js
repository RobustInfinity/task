var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const formInputValidate = require('../validations/formInput')
const dbOperations = require('../db/crudoperations/user')
const path = require('path')

router.get('/*',(request, response)=>{
  response.sendFile(path.join(__dirname, '/../public/index.html'));
    // console.log(pathToIndex)
  // response.sendfile(pathToIndex)
})


//@route POST /signUp
//@description Create a user in db
router.post('/signup',(request, response)=>{
  console.log(request.url)
  var body = request.body
  //validating phoneNumber (can be extended for other input variables)
  var {isValid, errors} = formInputValidate(body)

  if(isValid){
    // if validation is success, check if user already exists
  dbOperations.findByEmail(body.email,function(error, result){
    if(error){
      response.json({success : false, error : error})
    }else{
      //checkong if user already exist
      if(result){
        response.status(200).json({success : false,  message : 'User with this email already exists !!!'})
      }else{
        //if user doesn't exist, create user and send mail else send message
        dbOperations.createUser(body,(error, result)=>{
          if(error){
            response.status(200).json({success : false,  message : 'Something Went Wrong !!!'})
          }else{
              response.status(200).json({success : true,  message : 'Registered Successfully'})
          }
        })
      }
    }
  })
}else{
    response.status(200).json({success : false, errors : errors})
  }
})

//@route POST /login
//@description Login User
router.post('/login',function(request, response){
  var body = request.body

  var {isValid, errors} = formInputValidate(body)

  if(isValid){
  dbOperations.findByEmail(body.email, function(error, result){
    if(error){
      response.json({success : false, error : error})
    }else{
      if(!result){
          response.json({success : false, message : 'No such User found'})
      }else{
        bcrypt.compare(body.password, result.password,(error, isMatch)=>{
          if(isMatch){
            var data = {}
            data['userId'] = result.userId
            data['name'] = result.name
            data['email'] = result.email
            data['notes'] = result.notes
            response.json({success : true, result : data})
          }else{
            response.json({success : false,message : 'Incorrect Password'})
          }
        })
      }
    }
  })
}else{
  response.status(200).json({success : false, errors : errors})
}
})

module.exports = router;
