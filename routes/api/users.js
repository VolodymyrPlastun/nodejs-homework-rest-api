const express = require('express')
const {register, login, currentUser, logout, updateSubscription} = require('../../controller')
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', register);

router.post('/login', login);

router.get('/current', auth, currentUser);

router.get('/logout', auth, logout);

router.patch('/:id/subscription', auth, updateSubscription);

module.exports = router;