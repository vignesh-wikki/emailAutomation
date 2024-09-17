const express = require("express");
const compression = require("compression");
const multer = require("multer");
const storage = multer.memoryStorage();
const bodyParser = require("body-parser");
const Campaign = require("./schema/campaign");
const EmailTemplate = require("./schema/EmailTemplateSchema");
const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const router = express.Router();
const cron = require("node-cron");
const app = express();
require("./DB");
const cors = require("cors");
require("dotenv").config();
const port = process.env.SERVER_PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api", router);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: storage });
const templetePost = require("./routes/templete_post/EmailTemp_post");
app.use(templetePost);
const templetePut = require("./routes/templete_put/EmailTemplete_put");
app.use(templetePut);
const templeteGet = require("./routes/templete_get/EmailTemplete_get");
app.use(templeteGet);

// Define a route to fetch all campaigns
router.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

cron.schedule("* * * * *", async () => {
  try {
    const currentDate = new Date();
    const campaigns = await Campaign.find({
      scheduledDate: { $lte: currentDate },
    });

    for (const campaign of campaigns) {
      const mailOptions = {
        from: `"${campaign.fromName}" <${campaign.fromAddress}>`,
        to: campaign.toAddress,
        subject: campaign.subjectLine,
        text: campaign.templateText,
        attachments: campaign.files.map((file) => ({
          filename: file.originalname,
          content: file.buffer,
        })),
      };

      await transporter.sendMail(mailOptions);

      // Remove the scheduled campaign from the database
      await Campaign.findByIdAndDelete(campaign._id);
    }
  } catch (error) {
    console.error("Error sending scheduled emails:", error);
  }
});

app.post("/submitForm", upload.array("files"), async (req, res) => {
  const {
    campaign_name,
    email_address,
    to_address,
    name,
    subject,
    template_text,
    date,
    hour,
    minute,
    ampm,
  } = req.body;
  console.log("Received a form submission:", req.body);
  let scheduledDatetime;

  try {
    if (date && hour && minute && ampm) {
      scheduledDatetime = new Date(`${date} ${hour}:${minute} ${ampm}`);

      if (isNaN(scheduledDatetime)) {
        console.error("Invalid date:", `${date} ${hour}:${minute} ${ampm}`);
        res.status(400).json({ message: "Invalid date and time format" });
        return;
      }
    }

    let toAddress = to_address;
    if (!toAddress && req.files && req.files.length > 0) {
      const fileBuffer = req.files[0].buffer;
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const emails = XLSX.utils.sheet_to_json(sheet, { header: "A" });

      const emailAddresses = emails
        .map((entry) => entry["A"])
        .filter((entry) => entry);

      if (emailAddresses.length > 0) {
        toAddress = emailAddresses.join(", ");
      } else {
        console.error("No email addresses found in the Excel file.");
        res
          .status(400)
          .json({ message: "No email addresses found in the Excel file" });
        return;
      }
    }

    const campaign = new Campaign({
      campaignName: campaign_name,
      fromAddress: email_address,
      fromName: name,
      toAddress: toAddress,
      subjectLine: subject,
      templateText: template_text,
      files: req.files ? req.files.map((file) => file.buffer) : [],
      scheduledDate: scheduledDatetime,
      scheduledTime: `${hour}:${minute} ${ampm}`,
      uploadedList: req.files ? req.files.map((file) => file.buffer) : [],
    });

    await campaign.save();

    if (!scheduledDatetime) {
      const mailOptions = {
        from: `"${campaign.fromName}" <${campaign.fromAddress}>`,
        to: campaign.toAddress,
        subject: campaign.subjectLine,
        html: campaign.templateText,
        attachments: (req.files || []).map((file) => ({
          filename: file.originalname,
          content: file.buffer,
        })),
      };

      transporter.sendMail(mailOptions);
    }

    res.status(201).json({ message: "Data saved and email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("Form submission processed successfully");
});

app.get("/templete", (req, res) => {
  const newTemplate = new EmailTemplate({
    name: "Intern Email",
    description: "Welcome to our platform!",
    content:
      "I hope this email finds you well. I am writing to express my strong interest in the [Internship Position] at [Company Name] as " +
      "advertised on your website or [where you found the internship listing]. Enclosed with this email is my resume, which provides a " +
      "detailed overview of my educational background, " +
      "relevant coursework, and skills that make me a strong candidate for this opportunity.",
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
