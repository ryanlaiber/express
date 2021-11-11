function checkEmail(req, res, next) {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;
  const checkEmail = (email && reEmail.test(email));
  if(!checkEmail) {
    return res.status(400).json({ message: 'email invalido' });
  }
  next();
};

function checkName(req, res, next) {
  const { username } = req.body;
  const checkName = (username && username.length > 3);
  if(!checkName) {
    return res.status(400).json({ message: 'username invalido' });
  };
  next();
};

function checkPassword(req, res, next) {
  const { password } = req.body;
  const checkPassword = (password && (password.length >= 4 && password.length <= 8));
  if(!checkPassword) {
    return res.status(400).json({ message: 'password invalido' }); 
  };
  next();
};

module.exports = {
  checkEmail,
  checkName,
  checkPassword,
};
