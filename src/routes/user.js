const { Router } = require('express');
const router = Router();


const {
    registerUser,
    loginUser,
    getDatosDummy
} = require('../controllers/user.controller');

router.route('/register')
    .post(registerUser);
router.route('/loginUser')
    .post(loginUser);
router.route('/getDatosDummy')
    .get(getDatosDummy);

module.exports = router;