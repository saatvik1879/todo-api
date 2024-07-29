const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    todo: {type:String,required:true},
    isChecked: {type : Boolean , default:false}
});

module.exports = mongoose.model('ToDo',todoSchema);