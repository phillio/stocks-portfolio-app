module.exports = (db, Sequelize) => {
    return db.define('portfolio', {
        portfolio: Sequelize.Decimal,
        data: Sequelize.json 
    })
}