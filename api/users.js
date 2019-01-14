const express = require('express');
const router = express.Router();
const pg = require('pg');
const helper = require('./utils/helper.js');

router.post('/', (req, res, next) => {
    const query ={
        text : 'insert into users(username, password, email, description, avatarurl, age) values($1, $2, $3, $4, $5, $6) returning *',
        values : [req.query.username, req.query.password, req.query.email, req.query.description, req.query.avatarurl, req.query.age]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.put('/:id', (req, res, next) => {
    const query = {
        text: 'update users set username = $1, password = $2, email = $3, description = $4, avatarurl = $5, age = $6 where id = $7 returning *',
        values: [req.query.username, req.query.password, req.query.email, req.query.description, req.query.avatarurl, req.query.age, req.params.id]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.get('/', (req, res, next) => {
    const query ={
        text : 'select * from users order by id desc'
    };
    return helper.genericHandlerCallDB(query, res);
});

router.get('/:username&:pwd', (req, res, next) => {
    const query ={
        text : 'select * from users where username = $1 and password = $2',
        values : [req.params.username, req.params.pwd]
    };
    helper.genericCallDB(query)
        .then(result => {
            if(result.data[0]){
                return res.json({success: true, data: result.data});
            }
            
            return res.json({success: false, data : "The User Name or Password is Incorrect"});
        })
        .catch(reject => {
            return res.status(500).json({success: false, data: reject.data});
        });
});

router.delete('/:id', (req, res, next) => {
    const query ={
        text : 'delete from users where id = $1',
        values : [req.params.id]
    };
    return helper.genericHandlerCallDB(query, res);
});


module.exports = router;