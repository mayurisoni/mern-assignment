const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const checkauth = require("../MiddleWare/checkauth");
const technologyController = require("../controllers/technology");
var Storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: Storage }).single("file");

router.get("/",checkauth,technologyController.getAllTech)
router.post("/", checkauth, upload, technologyController.postTechnology);
router.get("/:techid", checkauth, technologyController.getSpecificTechnology);
router.patch(
  "/:techid",
  checkauth,
  upload,
  technologyController.updateSpecificTechnology
);
router.delete(
  "/:techid",
  checkauth,
  technologyController.deleteSpecificTechnology
);
module.exports = router;
