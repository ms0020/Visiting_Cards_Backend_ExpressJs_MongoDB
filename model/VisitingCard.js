const mongoose = require('mongoose');

const VisitingCardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company_name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  document_front: { type: String },
  doc_type_front: { type: String },
  document_back: { type: String },
  doc_type_back: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const VisitingCard = mongoose.model('VisitingCard', VisitingCardSchema);

module.exports = VisitingCard;
