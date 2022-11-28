
module.exports = (Sequelize, DataTypes) => {
    const Department = Sequelize.define("Department", {
        Name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    Department.associate = (models) => {
        Department.hasMany(models.User,{
            foreignKey: 'department_id'
          });
    }


    return Department;
}