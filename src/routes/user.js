const { Router } = require('express');
const router = Router();

const {
  registerUser,
  signinUser,
  getDatosDummy,
  getUsers
} = require('../controllers/user.controller');

router.route('/registerUser')
  .post(registerUser);

router.route('/signinUser')
  .post(signinUser);

router.route('/getDatosDummy')
  .get(getDatosDummy);

router.route('/getUsers')
  .get(getUsers);

module.exports = router;