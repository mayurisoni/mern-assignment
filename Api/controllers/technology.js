const mongoose = require("mongoose");
const Technology = require("../models/technology");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
module.exports.getAllTech = async (req, res, next) => {
  try {
    const search = req.query.search
   
    let technologies =Technology.find();
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) ;
    const skip = (page - 1) * pageSize;
    const total = await Technology.countDocuments();
   
    const pages = Math.ceil(total / pageSize);
    technologies = technologies.skip(skip).limit(pageSize).find({ technologyName: { $regex: search }});
    
    

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await technologies;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      totalDocs:total,
      data: result,
    });
    // const technologies = await Technology.find();
   
    // if (technologies.length >= 1) {
    //   successResponse(
    //     res,
    //     200,
    //     "All technologies listed successfully",
    //     technologies
    //   );
    //   // res
    //   //   .status(200)
    //   //   .json({ message: "all technologies listed successfully", technologies: technologies });
    // } else {
    //   successResponse(
    //     res,
    //     200,
    //     "There is No Technologies Available.Please, Add New Technology ",
    //     technologies
    //   );
    //   // res
    //   //   .status(200)
    //   //   .json({
    //   //     message: "There is No Technologies Available.Please, Add New Technology ",
    //   //     technologies: technologies
    //   //   });
    // }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.postTechnology = async (req, res, next) => {
  
  try {
    if(req.file){
      const technology = new Technology({
        _id: new mongoose.Types.ObjectId(),
        technologyName: req.body.technologyName,
        Resources: req.body.Resources,
        status: req.body.status,
        file: {
          data: req.file.filename,
          contentType: "image/*",
        },
      });
      const Createdtechnology = await technology.save();
    successResponse(
      res,
      201,
      "Technology Registered Successfully",
      Createdtechnology
    );
    }
    else{
      const technology = new Technology({
        _id: new mongoose.Types.ObjectId(),
        technologyName: req.body.technologyName,
        Resources: req.body.Resources,
        status: req.body.status,
       
      });
      const Createdtechnology = await technology.save();
    successResponse(
      res,
      201,
      "Technology Registered Successfully",
      Createdtechnology
    );
    }
    
    // res
    //   .status(201)
    //   .json({
    //     message: "Technology Registered Successfully",
    //     Createdtechnology: Createdtechnology,
    //   });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.getSpecificTechnology = async (req, res, next) => {
  const id = req.params.techid;
  try {
    const technology = await Technology.findById(id);
    if (!technology) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({

      //   message: "Not found",
      // });
    } else {
      successResponse(res, 200, "Technology Found", technology);
      // res
      //   .status(200)
      //   .json({ message: "Technology Found", technology: technology });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.updateSpecificTechnology = async (req, res, next) => {
  const id = req.params.techid;

  try {
    const technology = await Technology.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!technology) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({

      //   message: "Not found",
      // });
    } else {
      successResponse(res, 200, "Technology Updated Successfully", technology);
    }

    // res
    //   .status(200) //this
    //   .json({
    //     message: "Technology Updated Successfully",
    //     Updatedtechnology: technology,
    //   });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.deleteSpecificTechnology = async (req, res, next) => {
  const id = req.params.techid;
  try {
    const technology = await Technology.remove({ _id: id });
    successResponse(res, 202, "Technology deleted suceessfully", technology);
    // res.status(202).json({
    //   message: "Technology deleted suceessfully",
    //   DeletedTechnology: technology,
    // });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
