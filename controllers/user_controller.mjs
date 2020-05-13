import mongoose from 'mongoose';
import {
  userSchema
} from "../models/user.mjs"
import express from "express";
var router = express.Router();

const authenticateUser = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/profile', authenticateUser, async function (req, res) {
  //const id = req.params.id;
  /* try {
  const User = mongoose.model('user', userSchema);
  var query = User.find();
  const results = await query.exec();
  res.send(results);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error)
  } */


  res.send(req.user.username + " is now logged in. Ah yeah");
});

router.post('/create', async function (req, res) {
  try {
    const body = req.body;

    var User = mongoose.model('user', userSchema);
    var doc = new User({
      name: body.name,
      surname: body.surname,
      cellNumber: body.cellNumber,
      email: body.email,
      username: body.username,
      password: body.password
    });

    var saved = await doc.save();
    res.status(200)
    res.send(saved);

  } catch (error) {
    res.status(500);
    res.send("500 - Internal Server Error");
    console.log(error);
  }
});

router.put('/update/:id', function (req, res) {
  const id = req.params.id;
  res.send("updating user id : " + id);
});

router.delete('/delete/:id', function (req, res) {
  const id = req.params.id;
  res.send("deleted user id : " + id);
})
export default router;