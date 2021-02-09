const {Model,Sequelize,DataTypes} =require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const RepositoryModel=sequelize.define('Repository',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name:DataTypes.STRING,
    description:DataTypes.STRING,
    url:DataTypes.STRING,
    language:DataTypes.STRING
})

module.exports=RepositoryModel;


