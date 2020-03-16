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
            // console.log('-----')
            // console.log(findUser)
            // console.log('-----')
        }
        res.json({ user: findUser.dataValues, message: 'update possible?'})


        // const id = req.params.id
        // const findUser = await User.update({user: {transactions: req.body.transactions}},{where: {id: id}})
        // res.json({ user: req.user, message: 'updated?'})



        // const userId = req.params.id
        // const updateUser = await User.findByPk(userId)
        // if(!updateUser) throw Error('user not found')

        // res.json({user: req.user, message: 'TRANSACTIONS'})





        // const transactions = req.body.transactions
        // db.users.find({
        //     where: {id: userId}
        // })
        // .then(user => {
        //     return user.updateAttributes(transactions)
        //   })
        //   .then(updatedOwner => {
        //     res.json(updatedOwner);
        //   });

        // const updateUser = await findUser.updateAttributes(updates)
        // res.json({ user: updateUser, message: updateUser})
    }
)

module.exports = appRouter













// const express = require('express')
// const appRouter = express.Router()
// const { passport } = require('../auth')
// const { db, User } = require('../models');

// const util = require("util");

// // appRouter.get('/protected', passport.authenticate('jwt', { session: false } ), 
// //     async (req, res) => {
// //         res.json({ user: req.user, message: 'authenticated'})
// //     }
// // )

// appRouter.get('/profile', passport.authenticate('jwt', { session: false } ), 
//     async (req, res) => {
//         res.json({ user: req.user, message: 'authenticated'})
//     }
// )

// appRouter.put('/transactions/:id', passport.authenticate('jwt', { session: false } ),
//     async (req, res) => {
//         const id = req.params.id
//         const findUser = await User.findOne({where: {id: id}})
//         console.log('-----')
//         console.log('-----')
//         console.log('-----')
//         console.log('-----')
//         console.log('-----')
//         console.log(findUser)
//         if (findUser) {
//             // const updateUser = await findUser.update({portfolio: req.body.portfolio, transactions: req.body.transactions})
//             await findUser.update({transactions: req.body.transactions})
//             await findUser.update({portfolio: req.body.portfolio})
//             // const transactionsUser = await 
//             // await findUser.update({portfolio:})


//             // console.log('-----')
//             // console.log(util.inspect(findUserAgain, false, null, true));
//             // console.log('-----')
//             // return findUserAgain
//             // console.log(updateUser)
//             return updateUser
//         }
//         // res.json({ user: findUserAgain, message: 'update possible?'})
//         const findUserAgain = await User.findOne({where: {id: id}})
//         res.json({ user: findUserAgain, message: 'update possible?'})


//         // const id = req.params.id
//         // const findUser = await User.update({user: {transactions: req.body.transactions}},{where: {id: id}})
//         // res.json({ user: req.user, message: 'updated?'})



//         // const userId = req.params.id
//         // const updateUser = await User.findByPk(userId)
//         // if(!updateUser) throw Error('user not found')

//         // res.json({user: req.user, message: 'TRANSACTIONS'})





//         // const transactions = req.body.transactions
//         // db.users.find({
//         //     where: {id: userId}
//         // })
//         // .then(user => {
//         //     return user.updateAttributes(transactions)
//         //   })
//         //   .then(updatedOwner => {
//         //     res.json(updatedOwner);
//         //   });

//         // const updateUser = await findUser.updateAttributes(updates)
//         // res.json({ user: updateUser, message: updateUser})
//     }
// )

// module.exports = appRouter