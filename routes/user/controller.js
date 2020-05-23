const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send({ auth: false, msg: err });
      }

      if (!user) {
        res.send({ auth: false, emailError: true, msg: 'Email not found' });
        return;
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400,
          });
          res.status(200).send({ auth: true, token });
          return;
        } else {
          res.send({
            auth: false,
            passError: true,
            msg: 'Password is incorrect',
          });
        }
      });
    });
  },
  register: (req, res) => {
    let newUser = new model({
      forename: req.body.forename,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    });

    newUser
      .save()
      .then((user) => {
        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400,
        });
        res.status(200).send({ auth: true, token });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.send({ auth: false, msg: 'Email already exists...' });
          return;
        } else {
          res.send({
            auth: false,
            msg: 'An internal server error has occurred',
          });
        }
      });
  },
};
