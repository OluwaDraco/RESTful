const Sequelize = require("sequelize");

module.exports = (sequelize) =>{
    class Course extends Sequelize.Model {}
    Course.init({
        title:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
            msg:' Please provide a "title" ',},
            notEmpty:{
                msg:"provide a title "
            }
        }
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false,
        validate:{
            notNull:{
            msg:' Please provide a "Description" ',},
            notEmpty:{
                msg:"provide a description "
            }
        }
    },
    estimatedTime:{
        type:Sequelize.STRING,
    },
    materialsNeeded:{
        type:Sequelize.STRING,
    },
    
    },{sequelize});

    Course.associate =(models) =>{
        Course.belongsTo(models.User,{
            foreignKey:{
                fieldName: "userId",
                allowNull: false,
            }
        });
    };


return Course;
};