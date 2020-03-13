const { User } = require('../models');
require('dotenv').config()
const saltRounds = process.env.SALT_ROUNDS
const passwordEnv = process.env['SECRET']
const bcrypt = require('bcrypt');

const seedDb = async () => {
    try {
        await User.destroy({
            where: {}
        });

        // const encryptedPassword = async password => {
        //     const encrypted = await bcrypt.hash(
        //         password, 
        //         saltRounds, 
        //         function(err, hash) {
        //     });
        //     return encrypted;
        // }

        await User.create({
            name: 'tester',
            email: 'tester@gmail.com',
            password: 'tester'
        })
        
    } catch (e) {
        console.error(e)
    }
    // finally {
    //     process.exit();
    // }
}

const run = async() => {
    try {
        await seedDb()
    } catch (e) {
        console.error(e)
    } finally {
        process.exit();
    }
}

run();