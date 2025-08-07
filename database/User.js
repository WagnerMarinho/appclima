const Sequelize = require("sequelize");
const connect =  require("./configs/connect");

const Users = connect.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.TEXT, allowNull: false},
  password: {type: Sequelize.TEXT, allowNull: false},
  locale: {type: Sequelize.STRING, allowNull: false}
});

Users.Sync({force: false})
     .then(()=>{
      console.log("Tabela sincronizada com sucesso");
     }).catch(err =>{
      console.log("ERRO ao sincronizar Model com o banco de dados");
     })