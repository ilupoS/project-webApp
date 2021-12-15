var express = require('express');
var router = express.Router();
const Items = require('../models/Items');
const Comments = require('../models/Comments');
const passport = require("passport");



router.get('/all', function(req, res, next) {
    Items.find({}, function(err, items) {
        res.send({'items': items});
     });
});

router.get('/post/:postId', function(req, res, next) {
    Items.findOne({_id: req.params.postId}, function(err, items) {
        res.send({'items': items});
     });
});

router.get('/comments/:postId', function(req, res, next) {
    Comments.find({item: req.params.postId}, function(err, items) {
        res.send({'items': items});
     });
});

router.post('/addpost', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        Items.create({
            item: req.body.items,
            user: req.user._id,
            username: req.user.username
        })
        res.send(req.body);
});

router.post('/addcomment', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        Comments.create({
            comment: req.body.comment,
            item: req.body.postId,
            user: req.user._id,
            username: req.user.username
        })
        res.send(req.body);
});

module.exports = router;