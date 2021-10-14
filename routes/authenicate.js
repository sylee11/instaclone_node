const express = require('express');
const router = express.Router()
const {loginController} = require('../controllers/authenicate')


router.post('/login', loginController);

module.exports = router;