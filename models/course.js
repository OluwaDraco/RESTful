const Sequelize = require("sequelize");

module.exports = (sequelize) =>{
    class Course extends Sequelize.Model {}
    Course.init({
        title:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
            msg:' Please provide a Title '},
            notEmpty:{
                msg:" Title can not be empty  "
            },
            
        }
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false,
        validate:{
            notNull:{
            msg:' Description can not be Null '},
            notEmpty:{
                msg:"you cant  submit a empty description "
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