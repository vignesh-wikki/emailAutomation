const express = require("express");
const router = express.Router();
const EmailTemplate = require("../../schema/EmailTemplateSchema");

router.get("/getemplete", async (req, res) => {
  try {
    const templete = await EmailTemplate.find({}).exec();
    console.log("Retrieved documents:", templete);
    res.send(templete);
  } catch (error) {
    console.error("Error while retrieving data:", error);
  }
});
module.exports = router;
