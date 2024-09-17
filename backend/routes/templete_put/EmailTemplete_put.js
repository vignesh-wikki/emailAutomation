const express = require("express");
const router = express.Router();
const EmailTemplate = require("../../schema/EmailTemplateSchema");

router.put("/templates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, content } = req.body;

    const template = await EmailTemplate.findByIdAndUpdate(
      id,
      { name, description, content },
      { new: true }
    );

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
