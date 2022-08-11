const Sequelize = require("sequelize");

module.exports = (sequelize) =>{
    class Course extends Sequelize.Model {}
    Course.init({
        title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    estimatedTime:{
        type:Sequelize.STRING,
        allowNull:false
    },
    materialsNeeded:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    
    },{sequelize});

    Course.associate =(models) =>{
        Course.belongsTo(models.User,{
            foreignKey:{
                fieldName: "userId",
                allowNull: false,
            }
        })
    }


return Course;
};

    