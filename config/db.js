const {Sequelize}=require('sequelize');
 
    const db = new Sequelize('proyecto','root','1234',{
        host: 'localhost',
        port:'3306',
        dialect:'mysql',
        define:{
            timestamps:false
        },
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
        operatorAliases:false
    
    });
module.exports ={
    db
};