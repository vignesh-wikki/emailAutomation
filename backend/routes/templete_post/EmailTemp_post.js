const express = require("express");
const router = express.Router();
const EmailTemplate = require("../../schema/EmailTemplateSchema")

router.post("/upload/templete", (req, res) => {

  const { name, description, content } = req.body;
  const newTemplate = new EmailTemplate({
    name: name,
    description: description,
    content: content,
  });
  newTemplate
    .save()
    .then((template) => {
      console.log("Email template saved:", template);
    })
    .catch((error) => {
      console.error("Error saving email template:", error);
    });
  res.send(newTemplate);
});

module.exports = router;
