const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
   
    noteId : {
        type : String,
        required: true
    },
    note : {
        type : String
    },
   
})

const Note = mongoose.model('notes', NoteSchema)
module.exports = Note;