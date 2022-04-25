export {};
let express = require("express");
let router = express.Router();
var multer = require("multer");
const DIR = './files';
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
      cb(null, DIR);
  },
  filename: (req:any, file:any, cb:any) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, `${new Date()}-${file.originalname}`)
  }
});
import * as path from 'path';
const FormatEmailData = require('../../data/formatEmail');

var upload = multer({
  storage: storage,
});
router.post(
    "/upload",
    upload.single("formatfile"),
    async (req: any, res: any, next: any) => {
      let formatEmailData = new FormatEmailData();
      const files = path.join(process.cwd(), 'files/');
      let filepath=files+req.file.filename
      let result = await formatEmailData.AddFormats(
        req.body,
        filepath,
        req.header
      );
  
      result = {
        success: true,
        message: "Formats Added.",
      };
      res.status(200).send(result);
    }
  );
  module.exports=router;