const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    content: {type:String,required:true}
});

module.exports = mongoose.model('ToDo',todoSchema);