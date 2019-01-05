const User = require('../models/user');
const randomString = require('randomstring')
const bcryptjs = require('bcryptjs')
const config = require('../../config/config')
const dbOperations = {

    //argumrnts : userData = {name,email,dob,phoneNumber}
    //method for saving user document
    createUser : function (userData, callback){
        
        var data = {}
        console.log(userData)
        data['userId'] = randomString.generate(8)
        data['name'] = userData.name
        data['email'] = userData.email
        bcryptjs.genSalt(10,(error, salt)=>{
            bcryptjs.hash(userData.password,salt,(error, hash)=>{
                data['password'] = hash
                var user = new User({...data})
        
        user.save(function(err, result){
            //handling error via callback
            if(err){
                callback(err, null)
            }else{
                if(!result){
                   callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
            })
        })
        

    },

    //arguments : email
    //method for finding user via email
    findByEmail : function(email, callback){
       User.findOne({
           email : email
       }).populate({
           path : 'notes'
       }).exec((err, result)=>{
           if(err){
               callback(err, null)
           }else{
               if(!result){
                   callback(null, null)
               }else{
                   callback(null, result)
               }
           }
       })
    }
} 

module.exports = dbOperations;