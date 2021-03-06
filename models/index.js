const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const PortfolioModel = require('./portfolio');
const bcrypt = require('bcrypt');


const db = new Sequelize((process.env.DATABASE_URL || 'postgres://localhost:5432/stocks_portfolio_db'),{
    database: 'stocks_portfolio_db',
    dialect: 'postgres'
});

const User = UserModel(db, Sequelize);

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )

    user.password = hashedPassword
})

module.exports = {
    db,
    User
}