const mongoose = require("mongoose");
const Task = require("../models/task");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
module.exports.getAllTask = async (req, res, next) => {
  const search = req.query.search
  const projectTask = req.query.projectTask
  let tasks;
  try {
    if(search){
      console.log(search)
       tasks = await Task.find({ TaskName: { $regex: search }},{projectId:projectTask});
    }
    else{
       tasks = await Task.find({projectId:projectTask});
    }
    
    if (tasks.length >= 1) {
      successResponse(res, 200, "all tasks listed successfully", tasks);
      // res
      //   .status(200)
      //   .json({ message: "all tasks listed successfully", tasks: tasks });
    } else {
      successResponse(
        res,
        200,
        "There is No Task Available.Please, Add New Task ",
        tasks
      );
      // res
      //   .status(200)
      //   .json({
      //     message: "There is No Task Available.Please, Add New Task ",
      //     tasks: tasks,
      //   });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.postTask = async (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    TaskName: req.body.TaskName,
    estimatedDuration: req.body.estimatedDuration,
    finalTime: req.body.finalTime,
    comment: req.body.comment,
    developerName: req.body.developerName,
    date: req.body.date,
    status: req.body.status,
    projectName: req.body.projectName,
    projectId: req.body.projectId,
  });
  try {
    const CreatedTask = await task.save();
    successResponse(res, 201, "Task Created Successfully", CreatedTask);
    // res
    //   .status(201)
    //   .json({
    //     message: "Task Registered Successfully",
    //     CreatedTask: CreatedTask,
    //   });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.getSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;
  try {
    const task = await Task.findById(id);
    if (!task) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({

      //   message: "Not found",
      // });
    } else {
      // res.status(200).json({ message: "Task Found", task: task });
      successResponse(res, 200, "Task Found", task);
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.updateSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!task) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({

      //   message: "Not found",
      // });
    } else {
      successResponse(res, 200, "Task Updated Successfully", task);
    }

    // res
    //   .status(200) //this
    //   .json({ message: "Task Updated Successfully", UpdatedTask: task });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.deleteSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;
  try {
    const task = await Task.deleteOne({ _id: id });
    successResponse(res, 200, "Task deleted suceessfully", task);
    // res.status(200).json({
    //   message: "Task deleted suceessfully",
    //   Deletedtask: task,
    // });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
