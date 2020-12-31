const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const url = "mongodb+srv://sopes1user:sopes1pass@cluster0.oqfrs.mongodb.net/bd-sopes1-proy2?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true });
module.exports = connect;