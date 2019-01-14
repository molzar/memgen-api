const express = require('express');
const router = express.Router();
const helper = require('./utils/helper.js');

router.post('/', (req, res, next) => {
    console.log(req.query.url);
    const query ={
        text : 'insert into posts(url, id_user) values($1, $2) returning *',
        values : [req.query.url, req.query.id_user]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.put('/:id', (req, res, next) => {
    const query = {
        text: 'update posts set url = $1 where id = $2 returning *',
        values: [req.query.url, req.params.id]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.get('/', (req, res, next) => {
    const query ={
        text : 'select * from posts order by id desc'
    };
    return helper.genericHandlerCallDB(query, res);
});

router.get('/:idUser', (req, res, next) => {
    const query ={
        text : 'select * from posts where id_user = $1',
        values : [req.params.idUser]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.get('/:idUser/:id', (req, res, next) => {
    const query ={
        text : 'select * from posts where id_user = $1 and id = $2',
        values : [req.params.idUser, req.params.id]
    };
    return helper.genericHandlerCallDB(query, res);
});

router.delete('/:id', (req, res, next) => {
    const query ={
        text : 'delete from posts where id = $1',
        values : [req.params.id]
    };
    return helper.genericHandlerCallDB(query, res);
});


module.exports = router;