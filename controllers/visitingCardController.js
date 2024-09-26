const VisitingCard = require('../model/VisitingCard.js');
const mongoose = require('mongoose');

// Add New Visiting Card
const addVisitingCard = async (req, res) => {
  const { user_id, doc_type_front, doc_type_back, company_name, email_address, phone_number } = req.body;
  const document_front = req.files?.document_front ? Buffer.from(req.files.document_front[0].buffer).toString('base64') : null;
  const document_back = req.files?.document_back ? Buffer.from(req.files.document_back[0].buffer).toString('base64') : null;

  const newCard = new VisitingCard({
    user_id,
    document_front,
    doc_type_front,
    document_back,
    doc_type_back,
    company_name,
    email_address,
    phone_number
  });

  try {
    const addNewCard = await newCard.save();
    res.status(201).json(addNewCard);
  } catch (error) {
    res.status(400).json({ message: 'Error adding visiting card', error });
  }
};


// Get All Visiting Cards
const fetchAllVisitingCards = async (req, res) => {
  try {
    const allVisitingCards = await VisitingCard.find();
    res.status(200).json(allVisitingCards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visiting cards', error });
  }
};


// Get Single Visiting Card
const getVisitingCardById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const getCard = await VisitingCard.findById(id);
    if (!getCard) {
      return res.status(404).json({ message: 'Visiting card not found' });
    }
    res.status(200).json(getCard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visiting card', error });
  }
};


// Update Visiting Card
const updateVisitingCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const updateCard = {
    user_id: req.body.user_id,
    document_front: req.files?.document_front ? Buffer.from(req.files.document_front[0].buffer).toString('base64') : null,
    doc_type_front: req.body.doc_type_front,
    document_back: req.files?.document_back ? Buffer.from(req.files.document_back[0].buffer).toString('base64') : null,
    doc_type_back: req.body.doc_type_back,
    company_name: req.body.company_name,
    email_address: req.body.email_address,
    phone_number: req.body.phone_number
  };

  try {
    const updatedVisitingCard = await VisitingCard.findByIdAndUpdate(id, updateCard, { new: true, omitUndefined: true });
    if (!updatedVisitingCard) {
      return res.status(404).json({ message: 'Visiting card not found' });
    }
    res.status(200).json(updatedVisitingCard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating visiting card', error });
  }
};


// Delete Visiting Card
const deleteVisitingCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedCard = await VisitingCard.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Visiting card not found' });
    }
    res.status(200).json({ message: 'Visiting card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting visiting card', error });
  }
};


// Get visiting cards by day, month & given date range
const getVisitingCardsByDate = async (req, res) => {
  const { day, month, startDate, endDate } = req.body;

  try {
    let filter = {};

    if (day && month) {
      const year = new Date().getFullYear();
      const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59);

      filter.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }
    else if (month) {
      const year = new Date().getFullYear();
      const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      filter.createdAt = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }
    else if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const visitingCards = await VisitingCard.find(filter).populate('user_id', 'name email');

    res.status(200).json(visitingCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visiting cards', error });
  }
};


module.exports = {
  addVisitingCard,
  fetchAllVisitingCards,
  getVisitingCardById,
  updateVisitingCard,
  deleteVisitingCard,
  getVisitingCardsByDate
};