const express = require('express');
const { userRegistration, userSignIn, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', userRegistration);
router.post('/signin', userSignIn);
router.get('/get_all_users', getAllUsers);
router.get('/:id/get_user_by_id', getUserById);
router.put('/:id/update_user', updateUser);
router.delete('/:id/delete_user', deleteUser);

module.exports = router;
