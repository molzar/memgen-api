const pg = require('pg');
const getConfig = require('../../configs.js');

function Helper() {}

Helper.genericCallDB = function(query) {
    const config = getConfig.DB();
    const pool = new pg.Pool(config);
    return new Promise(function(resolve, reject) {
        pool.connect(function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
                return {success: false, data: err};
            }
            client.query(query)
                .then(result => {
                    done();
                    resolve({success: true, data: result.rows});
                })
                .catch(e => {
                    done();
                    reject({success: false, data: e.message});
                });
        });
        pool.end();
    }) ;
};


Helper.genericHandlerCallDB = function(query, res){

    Helper.genericCallDB(query)
        .then(result => {
            return res.json(result.data);
        })
        .catch(reject => {
            return res.status(500).json({success: false, data: reject.data});
        });
}


module.exports = Helper;