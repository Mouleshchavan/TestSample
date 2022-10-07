const mongoose = require("mongoose")


const connect = () => {
    return mongoose.connect("mongodb+srv://Mouleshchavan:YpmtEPmAjBeUCOGG@cluster0.r5obc.mongodb.net/Mouleshchavan-db");
}

module.exports = connect; 



  