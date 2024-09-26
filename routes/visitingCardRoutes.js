const express = require('express');
const { addVisitingCard, fetchAllVisitingCards, getVisitingCardById, updateVisitingCard, deleteVisitingCard, getVisitingCardsByDate } = require('../controllers/visitingCardController.js');
const { upload } = require('../middleware/upload.js');

const router = express.Router();

router.post('/add_visiting_card', upload, addVisitingCard);
router.get('/get_all_visiting_cards', fetchAllVisitingCards);
router.get('/:id/get_visiting_card_by_id', getVisitingCardById);
router.put('/:id/update_visiting_card', upload, updateVisitingCard);
router.delete('/:id/delete_visiting_card', deleteVisitingCard);
router.get('/get_visiting_cards_by_date', getVisitingCardsByDate)

module.exports = router;
