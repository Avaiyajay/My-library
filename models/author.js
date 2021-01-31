const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Author' , authSchema);