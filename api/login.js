const express = require("express");
const router = express.Router();
const Users = require('../models/User');
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




router.post("/login", body("username"), body("password"), (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Users.findOne({username: req.body.username}, (err, user) => {
      if(user){
          bcrypt.compare(req.body.password, user.password, function(err, result) {
              if(err) return next(err);
              if(result){
                  const token = jwt.sign(
                      {user_id: user._id, username: user.username},
                      process.env.SECRET,
                      {
                        expiresIn: "1h",
                      }
                  );
                  if(err) return next(err);
                  return res.json({success: true, token});
              } else {return res.json({success: false});}
          });
      }
      else {
          res.json({success: false});
      }

  });
});


module.exports = router;
