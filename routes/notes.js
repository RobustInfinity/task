var express = require('express');
var router = express.Router();
const dbOperations = require('../db/crudoperations/note')

router.post('/createNote', function(request, response){
    var body = request.body
    var note = {}
    note['note'] = body.note
    dbOperations.createNote(note,function(error, result){
        if(error){
            response.status(200).json({error : error})
        }else{
            if(!result){
                response.status(200).json({message : 'Unable save note'})
            }else{
                dbOperations.saveNoteInUser(result._id, body.userId)
                dbOperations.getNotes(body.userId, function(error, result){
                    if(error){
                        response.status(200).json({error : error})
                    }else{
                        if(!result){
                            response.status(200).json({'message' : 'Unable to get notes'})
                        }else{
                            var data = {}
                            data['notes'] = result.notes
                            response.status(200).json({success : true, result : data})
                        }
                    }
                })
            }
        }
    })
})


router.post('/getNotes',function(request, response){

    var body = request.body
    dbOperations.getNotes(body.userId, function(error, result){
        if(error){
            response.status(200).json({error : error})
        }else{
            if(!result){
                response.status(200).json({'message' : 'Unable to get notes'})
            }else{
                var data = {}
                data['notes'] = result.notes
                response.status(200).json({message : true, result : data})
            }
        }
    })
})

module.exports = router