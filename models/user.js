const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    class User extends Model{}
    User.init({
        firstName:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"need firstname"
                },
                notEmpty:{
                    msg:"required"
                }
            }
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                msg: 'Please provide a Last Name '
            },
            notEmpty:{
                msg:"Enter a last name"
            }
        }
        },
        emailAddress:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                msg:' An Email is required'
            },
                isEmail:{
                    msg: 'Please enter a valid Email'
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                msg:'A Password required'
                },
                notEmpty:{
                        msg: 'Please enter a Password '
                }
            }
        }
},{sequelize});

    User.associate = (model) =>{
        User.hasMany(model.Course,{
            foreignKey:{
                fieldName: "userId",
                allowNull:false,
            }
        }
            
            );
    }

    return User;
};