var express = require('express');
var router = express.Router();
var {getUser, createUser, updateUser} = require('../controllers/user')
const {requireAuth} = require('../controllers/authenicate')

/* GET users listing. */
router.get('/', requireAuth, getUser);
router.post('/', createUser);
router.post('/',requireAuth, updateUser);

module.exports = router;
