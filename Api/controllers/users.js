const User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
module.exports.userRegister = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      errorResponse(res, 409, "Mail Exists");
      // return res.status(409).json({
      //   message: "Mail exists",
      // });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          errorResponse(res, 500, err);
        } else {
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            roleradio: req.body.roleradio,
          });
          const Createduser = await user.save();
           const NewUser={
            name:Createduser.name,
            email:Createduser.email,
            roleradio:Createduser.roleradio
           }
          successResponse(res, 201, "User Register", NewUser);
          // res
          //   .status(201)
          //   .json({ message: "user register", Createduser: Createduser });
        }
      });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 409, err);
  }
};

module.exports.userLogin = async (req, res, next) => {
  try {
    const user = await User.find({ email:req.body.email });
    
    if (user.length == 0) {
    
      return errorResponse(res, 404, "This User is Not Registered");
      // return res.status(404).json({
      //   message: "This User is Not Registered",
      // });
    }else{
    bcrypt.compare(req.body.password, user[0].password, async(err, result) => {
      if (!result) {
       
       return  errorResponse(res,401, "Password is incorrect,try again");
        // res.status(500).json({
        //   error: err,
        // });
      }
      if (result) {
        const token = jwt.sign(
          { email: user[0].email, userId: user[0]._id },
          process.env.SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );
        const currentUser = {
          id:user[0].id,
          name:user[0].name,
          email:user[0].email,
          roleradio:user[0].roleradio,
          authToken:token

        }
       return successResponse(res, 200, "User LoggedIn Successfully", {currentUser});
        // return res
        //   .status(200)
        //   .json({ message: " User LoggedIn Successfully", token: token });
      }
      // res.status(401).json({ message: " Auth Failed" });
    });  }
  } catch (err) {
   // console.log(err);
   return  errorResponse(res, 500, err);
  }
};
module.exports.getAllUser= async (req, res, next) => {
  try {
    const userList = await User.find();
    const users = userList.map(user=>{
     return({id:user.id,
      name:user.name,
      email:user.email,
      roleradio:user.roleradio,
      authToken:user.authToken}) 
    })
      

    
   
      if (users.length >= 1) {
        successResponse(res, 200, "all Users listed successfully", users);
        // res
        //   .status(200)
        //   .json({ message: "all tasks listed successfully", tasks: tasks });
      } else {
        successResponse(
          res,
          200,
          "There is No User Available.Please, Add New User ",
          users
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
