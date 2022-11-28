
module.exports = (Sequelize, DataTypes) => {
    const Tag = Sequelize.define("Tag", {
        name : {
            type: DataTypes.STRING,
        },
   
    })

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Post,{
            through: 'post_tag',
          });
    }

   
    return Tag;
}