const express = require('express');
const authRouter = express.Router();
const { passport, jwtSign } = require('../auth');

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err) {
                console.log('HERE')
                const error = new Error(`An Error Occurred: ${JSON.stringify(info)}`)
                return next(error)
            }

            if(!user) {
                console.log('HERE')
                let error = new Error(info.message || 'An error occurred during login')
                error.status = 400
                return next(error)
            }

            // req.login(user, { session: false }, async (error) => {
            //     if (error) return next(error)
            //     return res.json({user})
            // })
            // above is where "single signup" would occur with a "true" and a lot more work elsewhere

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    console.log('HERE')
                    return next(error)
                } 
                const { email, id } = user
                const payload = { email, id }
                const token = jwtSign(payload)
                return res.json({ user, token })
            })

        } catch (e) {
            console.error(e)
            return next(e)
        }
    }) (req, res, next)
})

authRouter.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        try {
            if (err) {
                const error = new Error(err)
                return next(error)
            }

            if(!user) {
                let error = new Error(info.message || 'An error occurred during signup')
                error.status = 400
                return next(error)
            }
            
            const { name, email, id } = user
            const payload = { name, email, id }

            // const { email, id } = user
            // const payload = { email, id }

            const token = jwtSign(payload)
            return res.json({user, token, message: info.message })
        } catch (e) {
            return next(e)
        }
    }) (req, res, next)
})

module.exports = authRouter