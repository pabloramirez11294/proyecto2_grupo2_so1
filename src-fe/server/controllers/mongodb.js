const mongodbConnection = require("../controllers/mongodbConnection");
const infectedSchema = require("../controllers/infectedScheme");

exports.obtenerInfectados = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.find({}).then(infectedSchema =>{
            res.json(infectedSchema);
        });
    });
});

exports.count = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.countDocuments({}, function(err, c){
            c = {
                cantidad: c
            }
            res.json(c);
        });
    });
});



