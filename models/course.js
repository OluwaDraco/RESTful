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

    