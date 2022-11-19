
module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("User", {
        firstName : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastname : {
            type:  DataTypes.STRING,
            allowNull: false,
          }
    })

    return User;
}