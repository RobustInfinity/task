const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating userSchema
const UserSchema = new Schema({
   
    userId : {
        required : true,
        type : String
    },
    name : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'notes'
    }]
})

const User = mongoose.model('users', UserSchema)
module.exports = User;