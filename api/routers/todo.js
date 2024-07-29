const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const todo = require("../models/todo");

router.get('/',(req,res,next)=>{
    todo.find()
    .exec()
    .then(result =>{
        const response = result.map(todo =>{
                return {
                    id:todo.id,
                    todo:todo.todo,
                    isChecked:todo.isChecked
                }
            });

        
        res.status(200).json(response);
    })
    .catch(error => res.status(500).json({
        error:error
    }));

});

router.post('/',(req,res,next)=>{
    const obj = new todo({
        id:new mongoose.Types.ObjectId(),
        todo:req.body.todo,
        isChecked:false
    });

    obj.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            messege:"new todo created"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.patch('/',(req,res,next)=>{
    const id = req.body.id;
    const updates = {};
    updates["todo"] = req.body.todo;
    updates["isChecked"] = req.body.isChecked;
    todo.updateOne({id:id},{$set:updates})
    .then(result=>{
        console.log(result);
        res.status(200).json({
            messege:"succesfully patched!"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/',(req,res,next)=>{
    const id = req.body.id;
    todo.deleteOne({id:id}).exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            messege:"deletion successfull!"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})
module.exports = router;