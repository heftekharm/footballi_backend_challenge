const {Model,Sequelize,DataTypes,QueryTypes} =require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

//sequelize.query("SELECT * FROM `tags`", { type: QueryTypes.SELECT }).then(v=>console.log(v));


const TagModel=sequelize.define('Tag',{
    repositoryId:{
        type:DataTypes.STRING,
        primaryKey:true,
        references:{
            model:'Repositories',
            key:'id'
        }
    },
    username:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    tag:{
        type:DataTypes.STRING,
        primaryKey:true
    },
})

module.exports=TagModel;


