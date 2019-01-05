const Note = require('../models/note');
const randomString = require('randomstring')
const dbOperations = {

    //argumrnts : userData = {name,email,dob,phoneNumber}
    //method for saving user document
    createNote : function (noteData, callback){
        
        var data = {}
        data['noteId'] = randomString.generate(4)
        data['note'] = noteData.note
        var note = new Note({...data})
        
        note.save(function(err, result){
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

    },

    saveNoteInUser : function(noteId, userId){
        var User = require('../models/user')
        User.updateOne({
            'userId' : userId
        },{
            '$push' : {
                'notes' : noteId
            }
        },function(error, result){
            if(error){
                console.log(error)
            }else{
                console.log(result)
            }
        })
    },

    getNotes : function(userId, callback){
        var User = require('../models/user')
        User.findOne({
            'userId' : userId
        }).populate({
            path : 'notes'
        }).exec(function(error, result){
            if(error){
                console.log(error)
                callback(error, null)
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