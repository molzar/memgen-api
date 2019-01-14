const express = require('express');
const router = express.Router();
const getConfig = require('../configs.js');

//TODO : Do better here !
// router.get('*', function(req, res, next) {
//     console.log("a mers");
//     if (req.headers.token && req.headers.token === 'OK'){
//         //next();
//         //res.send(req.params);
//         console.log("ajunge dinamic");
//         console.log(getConfig.item("realRoutes").toString());
//         console.log(req.originalUrl);
//         if (getConfig.item("realRoutes").includes(req.originalUrl)){
//             //next();
//             res.redirect(req.originalUrl);
//         }
//         res.status(404).send();
//     }
//     //Forbidden
//     res.status(403).send();
// });
router.get('/', function(req, res, next) {
    res.send(getConfig.item("someRandomWelcomeMessage"));
});



module.exports = router;
