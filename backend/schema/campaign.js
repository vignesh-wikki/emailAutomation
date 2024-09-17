const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: String,
  fromAddress: String,
  fromName: String,
  toAddress: String,
  selectedList: [String],
  subjectLine: String,
  templateText: String,
  files: Buffer,
  scheduledDate: Date,
  scheduledTime: String,
  uploadedList: Buffer,
  // Tracking fields
  uniqueIdentifier: String, 
  responses: [{ type: String }], // store email IDs of users who clicked the email
  clickCount: { type: Number, default: 0 },
  opened: { type: Boolean, default: false },
  openCount: { type: Number, default: 0 }, // new field for counting opens
  openedResponses: [{ type: String }], // store email IDs of users who opened the email
  originalLink: String, 
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
