const mongoose = require("mongoose");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
module.exports.postforgotPassword = async (req, res, next) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    console.log(oldUser);
    if (!oldUser) {
      errorResponse(res, 404, "User Not Exists!!");
    } else {
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      const link = `http://localhost:3000/#/resetPassword/${oldUser._id}/${token}`;

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mayurisoniwork@gmail.com",
          pass: "jmavovpgbcawdzgq",
        },
      });

      var mailOptions = {
        from: "mayurisoniwork@gmail.com",
        to: oldUser.email,
        subject: "Password Reset",
        text: link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      successResponse(
        res,
        201,
         "Reset Password Link Sent to Your Email Address",
        oldUser
      );
    }
  } catch (error) {
    errorResponse(res, 500, error);
  }
};
module.exports.getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.find({ _id: id });
  try {
    if (!oldUser) {
      errorResponse(res, 404, "User Not Exists!!");
    } else {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      successResponse(res, 200, "Verified", verify.email);
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, "Not Verified");
  }
};
module.exports.postResetPassword = async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  const oldUser = await User.findById({ _id: id });
  try {
    if (!oldUser) {
      errorResponse(res, 404, "User Not Exists!!");
    } else {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
          errorResponse(res, 500, err);
        } else {
          const newUser = await User.updateOne(
            {
              _id: id,
            },
            {
              $set: {
                password: hash,
              },
            }
          );
          console.log(newUser);

          successResponse(res, 201, "New Password is Set", newUser);
        }
      });
    }
  } catch (error) {
    errorResponse(res, 500, error);
  }
};
