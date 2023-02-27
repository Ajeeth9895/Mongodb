
const mongodb = require('mongodb')
const dbName = `b38wet`
const  dbUrl = `mongodb+srv://ajeeth:Ajee12345@cluster0.gprm31v.mongodb.net/${dbName}`;
const MongoClient = mongodb.MongoClient;

module.exports = {mongodb,dbName,dbUrl,MongoClient};