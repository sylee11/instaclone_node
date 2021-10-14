var express = require('express');
var router = express.Router();
var {getUser, createUser} = require('../controllers/user')
const {requireAuth} = require('../controllers/authenicate')

/* GET users listing. */
router.get('/', requireAuth, getUser);
router.post('/', createUser);

module.exports = router;
