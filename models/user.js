module.exports = (db, Sequelize) => {
    return db.define('user', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        money: {
            type: Sequelize.DECIMAL(10,2),
            defaultValue: 5000.00
        },
        portfolio: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        transactions: {
            type: Sequelize.JSON,
            defaultValue: []
            // ,
            // get() {
            //     return (
            //       JSON.parse(this.getDataValue(transactions))
            //     )
            //   },
            //   set(value) {
            //     this.setDataValue(transactions, JSON.stringify(value))
            //   }
        }
    })
}