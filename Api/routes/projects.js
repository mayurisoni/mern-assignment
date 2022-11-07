const express = require("express");
const router = express.Router();
const checkauth = require("../MiddleWare/checkauth");
const multer = require("multer");
const path = require("path");

const projectController = require("../controllers/projects");
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

router.get("/", checkauth, projectController.getAllProject);
router.post("/", checkauth, upload, projectController.postProject);
router.get("/:projectId", checkauth, projectController.getSpecificProject);
router.patch(
  "/:projectId",
  checkauth,
  upload,

  projectController.updateSpecificProject
);
router.delete(
  "/:projectId",
  checkauth,
  projectController.deleteSpecificProject
);
module.exports = router;
