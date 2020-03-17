const express = require('express')
const appRouter = express.Router()
const { passport } = require('../auth')
const { db, User } = require('../models');

// appRouter.get('/protected', passport.authenticate('jwt', { session: false } ), 
//     async (req, res) => {
//         res.json({ user: req.user, message: 'authenticated'})
//     }
// )

appRouter.get('/profile', passport.authenticate('jwt', { session: false } ), 
    async (req, res) => {
        res.json({ user: req.user, message: 'authenticated'})
    }
)

appRouter.put('/transactions/:id', passport.authenticate('jwt', { session: false } ),
    async (req, res) => {
        const id = req.params.id
        const findUser = await User.findOne({where: {id: id}})
        if (findUser) {
            await findUser.update({money: req.body.money, portfolio: req.body.portfolio, transactions: req.body.transactions})
        }
        res.json({ user: findUser.dataValues, message: 'update possible?'})
    }
)

module.exports = appRouter
