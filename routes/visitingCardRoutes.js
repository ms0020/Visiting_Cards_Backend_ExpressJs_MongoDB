const express = require('express');
const { addVisitingCard, fetchAllVisitingCards, getVisitingCardById, updateVisitingCard, deleteVisitingCard, getVisitingCardsByDate } = require('../controllers/visitingCardController.js');
const { upload } = require('../middleware/upload.js');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     VisitingCard:
 *       type: object
 *       required:
 *         - user_id
 *         - company_name
 *         - email_address
 *         - phone_number
 *       properties:
 *         user_id:
 *           type: string
 *           description: The user ID associated with the visiting card
 *         company_name:
 *           type: string
 *           description: The name of the company
 *         email_address:
 *           type: string
 *           description: The email address of the visiting card holder
 *         phone_number:
 *           type: string
 *           description: The phone number of the visiting card holder
 *         document_front:
 *           type: string
 *           description: The file path to the front of the visiting card
 *         doc_type_front:
 *           type: string
 *           description: The document type for the front of the visiting card
 *         document_back:
 *           type: string
 *           description: The file path to the back of the visiting card
 *         doc_type_back:
 *           type: string
 *           description: The document type for the back of the visiting card
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the visiting card was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the visiting card was last updated
 */

/**
 * @swagger
 * /api/visiting_card/add_visiting_card:
 *   post:
 *     summary: Add a new visiting card
 *     tags: [VisitingCard]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The user ID associated with the visiting card
 *                 example: 60d0fe4f5311236168a109ca
 *               company_name:
 *                 type: string
 *                 description: The name of the company
 *                 example: Tech Corp
 *               email_address:
 *                 type: string
 *                 description: The email address of the visiting card holder
 *                 example: email@company.com
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the visiting card holder
 *                 example: +123456789
 *               document_front:
 *                 type: string
 *                 format: binary
 *                 description: The file upload for the front of the visiting card
 *               doc_type_front:
 *                 type: string
 *                 description: The document type for the front of the visiting card
 *                 example: image/png
 *               document_back:
 *                 type: string
 *                 format: binary
 *                 description: The file upload for the back of the visiting card
 *               doc_type_back:
 *                 type: string
 *                 description: The document type for the back of the visiting card
 *                 example: image/png
 *     responses:
 *       200:
 *         description: Visiting card added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Visiting card added successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid data or missing required fields
 */
router.post('/add_visiting_card', upload, addVisitingCard);

/**
 * @swagger
 * /api/visiting_card/get_all_visiting_cards:
 *   get:
 *     summary: Fetch all visiting cards
 *     tags: [VisitingCard]
 *     responses:
 *       200:
 *         description: List of all visiting cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VisitingCard'
 *       404:
 *         description: No visiting cards found
 */
router.get('/get_all_visiting_cards', fetchAllVisitingCards);

/**
 * @swagger
 * /api/visiting_card/{id}/get_visiting_card_by_id:
 *   get:
 *     summary: Get a visiting card by ID
 *     tags: [VisitingCard]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The visiting card ID
 *     responses:
 *       200:
 *         description: Visiting card data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VisitingCard'
 *       404:
 *         description: Visiting card not found
 */
router.get('/:id/get_visiting_card_by_id', getVisitingCardById);

/**
 * @swagger
 * /api/visiting_card/{id}/update_visiting_card:
 *   put:
 *     summary: Update a visiting card by ID
 *     tags: [VisitingCard]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The visiting card ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               email_address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               document_front:
 *                 type: string
 *                 format: binary
 *               doc_type_front:
 *                 type: string
 *               document_back:
 *                 type: string
 *                 format: binary
 *               doc_type_back:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visiting card updated successfully
 *       404:
 *         description: Visiting card not found
 */
router.put('/:id/update_visiting_card', upload, updateVisitingCard);
/** 
* @swagger
 * /api/visiting_card/{id}/delete_visiting_card:
 *   delete:
 *     summary: Delete a visiting card by ID
 *     tags: [VisitingCard]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The visiting card ID
 *     responses:
 *       200:
 *         description: Visiting card deleted successfully
 *       404:
 *         description: Visiting card not found
 */
router.delete('/:id/delete_visiting_card', deleteVisitingCard);

/**
* @swagger
* /api/visiting_card/get_visiting_cards_by_date:
*   get:
*     summary: Get visiting cards within a date range
*     tags: [VisitingCard]
*     parameters:
*       - in: query
*         name: startDate
*         schema:
*           type: string
*           format: date
*         required: true
*         description: The start date in the format YYYY-MM-DD
*       - in: query
*         name: endDate
*         schema:
*           type: string
*           format: date
*         required: true
*         description: The end date in the format YYYY-MM-DD
*     responses:
*       200:
*         description: List of visiting cards within the date range
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/VisitingCard'
*       404:
*         description: No visiting cards found for the date range
*/
router.get('/get_visiting_cards_by_date', getVisitingCardsByDate)

module.exports = router;