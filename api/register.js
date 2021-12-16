const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/User');
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");


router.post("/register", body("username"), body("password").isLength({ min: 8 }), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    Users.findOne({username: req.body.username}, (err, user) => {
        if(err) return next(err);
        if(user){
            return res.status(403).json({"errors":[{"param":"username"}]});
        }
        else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err) return next(err);
                    Users.create(
                      {
                        username: req.body.username,
                        password: hash
                      });
                    if(err) return next(err);
                    return res.json({  });
                });
            });
        }
    });
});

module.exports = router;