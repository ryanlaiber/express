const router = require('express').Router();
const {
  checkEmail,
  checkPassword,
  checkName,
} = require('../../midlewares/validations');

router.post('/register', checkName, checkEmail, checkPassword, (_req,res) => {
  return res.status(201).json({ message: 'user created' });
});

router.post('/login', checkEmail, checkPassword, (_req, res) => {
  return res.status(200).json({ token: '86567349784e' });
})

module.exports = router;