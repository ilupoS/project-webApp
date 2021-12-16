const passport = require('passport');
const Users = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Adding options to strategy where JWT is checked
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

//In this we check if we can find user with same _id that is in token
const strategy = new JwtStrategy(opts, function(payload, done){

    Users.findOne({_id: payload.user_id}, function(err, user){
        if(err){            
            return done(err, false);
        }
        if(user){
            return done(null, user);
        } 
        else{
            return done(null, false);
        }
    });
});

module.exports = (passport) => {
    passport.use(strategy);
}