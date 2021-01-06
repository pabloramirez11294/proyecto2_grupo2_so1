const mongodbConnection = require("../controllers/mongodbConnection");
const infectedSchema = require("../controllers/infectedScheme");

exports.obtenerInfectados = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.find({}).then(infectedSchema => {
            res.json(infectedSchema);
        });
    });
});

exports.count = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.countDocuments({}, function (err, c) {
            c = {
                cantidad: c
            }
            res.json(c);
        });
    });
});

exports.groupInfectados = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.aggregate([
            { $match: {} },
            {
                $group: {
                    _id: '$location', status_count: { $sum: 1 }
                }
            },
            { $sort : { status_count : -1 } },
            { $limit: 3 }
        ]).then((infectados) => {
            res.json(infectados);
        })
    });
});


exports.groupAllInfected = ((req, res, nect) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    mongodbConnection.then(db => {
        infectedSchema.aggregate([
            { $match: {} },
            {
                $group: {
                    _id: '$location', status_count: { $sum: 1 }
                }
            },
            { $sort : { status_count : -1 } }
        ]).then((infectados) => {
            res.json(infectados);
        })
    });
});


