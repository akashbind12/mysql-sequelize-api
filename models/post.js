
module.exports = (Sequelize, DataTypes) => {
    const Post = Sequelize.define("Post", {
        name : {
            type: DataTypes.STRING,
        },
        title : {
            type: DataTypes.STRING,
        },
        content : {
            type: DataTypes.STRING,
        },
        user_id : {
            type: DataTypes.INTEGER,
        },
   
    })

    Post.associate = (models) => {
        Post.belongsToMany(models.Tag,{
            through: 'post_tag',
          });
    }

   
    return  Post;
}