const taskController = require("../controllers/task");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkauth = require("../MiddleWare/checkauth");
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
router.get("/", checkauth, taskController.getAllTask);
router.post("/", checkauth, upload, taskController.postTask);
router.get("/:taskid", checkauth, taskController.getSpecificTask);
router.patch("/:taskid", checkauth, upload, taskController.updateSpecificTask);
router.delete("/:taskid", checkauth, taskController.deleteSpecificTask);
module.exports = router;
