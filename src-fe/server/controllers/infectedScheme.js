const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infectedSchema = new Schema({
    name: {
        type: String
    },
    message: {
        type: String
    },
    location: {
        type: String
    },
    age: {
        type: Number
    },
    infected_type: {
        type: String
    },
    state: {
        type: String
    }
});

let Infected = mongoose.model("infectados", infectedSchema);

module.exports = Infected;