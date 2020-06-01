const express = require('express');
const User = require('../controllers/user');
const Validation = require('../validation/User');
const auth = require('../auth/verifyToken');
const Helper = require('../helper/helper');
const router = express.Router();


router.post('/login', Validation.login, User.login);
router.post('/register', Validation.register, User.register);
router.get('/getProfile', Validation.getProfile, auth.verifyToken, User.getProfile);


module.exports = router;
