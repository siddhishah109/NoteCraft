require('dotenv').config();
const Sequelize =require('sequelize');
const dbName='noteCraft';
const dbUser='root';
const dbPassword= process.env.DB_PASSWORD;
const dbHost='localhost';
const dbPort=3306;
const dbDialect='mysql';
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect
});

const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;


// tables
db.user=require('./src/models/userModel')(sequelize,Sequelize);
db.note=require('./src/models/notesModel')(sequelize,Sequelize);

// relations
db.note.belongsTo(db.user);
db.user.hasMany(db.note);

module.exports=db;
