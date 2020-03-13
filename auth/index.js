const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config()
// const SECRET = 'super long string;'


const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

passport.use(new JWTStrategy({
    secretOrKey: process.env['SECRET'],
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        const user = await User.findByPk(token.id)

        if (user) {
            done(null, user)
        }
        else {
            done(null, false)
        }
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return done(null, false, { message: 'User not found' })
        }

        const validate = await bcrypt.compare(password, user.password)

        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user, { message: 'Logged in successfully' })

    } catch (e) {
        console.error(e)
        return done(e)
    }
}))

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const { body: { name } } = req

        const user = await User.create({
            name: name,
            email: email,
            password: password
        })

        if (!user) {
            return done(null, false, { message: 'Unable to sign up user' })
        }
        done(null, user, { message: 'User successfully created' })
    } catch (e) {
        done(e)
    }
}))

// const authorized = (req, res)

/**
 * middleware for checking authorization with jwt
 * source: https://github.com/mikenicholson/passport-jwt/issues/153#issuecomment-419627512
 */
const authorized = (req, res, next) => {
    // if session is false, they have to send token with every request
    // (user has to provide token in the code with every request, not login with every request)
    // if session is true, they have to send token just once
    passport.authenticate('jwt', { session: false }, async (error, user) => {
        if (error || !user) {
            // response.status(401).json({ message: 'Unauthorized' });
            let err = new Error('No access allowed')
            err.status = 401
            return next(err)
        }

        req.user = user
        return next()
    })(req, res, next)
}

module.exports = { passport, jwtSign, authorized } 