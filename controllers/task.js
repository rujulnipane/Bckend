import {Task} from '../models/task.js';

export const addTask = async (req,res) => {
    const {title,desc} = req.body;

    await Task.create({
        title,
        desc,
        user:req.user
    })

    res.status(201).json({
        success: true,
        message: "Task added",
    })
}

export const getmyTask = async(req,res, next) => {
    const userid = req.user._id;
    const tasks = await Task.find({user:userid});
    res.status(200).json({
        success: true,
        tasks,
    })
}
export const updateTask = async(req,res, next) => {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new Error("Nice"));
    task.iscompleted = !task.iscompleted;
    await task.save();
    res.status(200).json({
        success: true,
        message: "Task updated",
    })
}

export const deleteTask = async(req,res, next) => {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new Error());
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted",
    })
}