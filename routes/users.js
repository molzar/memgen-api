const express = require('express');
const router = express.Router();
const users = require('../api/users');
const usersEntity = require('../model/users');

router.post('/', (req, res, next) => {
    const user = usersEntity.build({
        username: req.query.username, 
        password: req.query.password, 
        email : req.query.email,
        description : (req.query.description) ? req.query.description : null,
        avatarurl : (req.query.avatarurl) ? req.query.avatarurl : null,
        age : (req.query.age) ? req.query.age : null });
    users.insert(user)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});

router.put('/:id', (req, res, next) => {
    console.log(req.query.age);

    const user = usersEntity.build({
        id : req.params.id,
        username: req.query.username, 
        password: req.query.password, 
        email : req.query.email,
        description : (req.query.description) ? req.query.description : null,
        avatarurl : (req.query.avatarurl) ? req.query.avatarurl : null,
        age : (req.query.age) ? req.query.age : null });

    users.update(user)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});

router.get('/', (req, res, next) => {
    users.findAllUsers()
        .then(resolve => {
            return res.json(resolve.data);
        })
        .catch(reject => {
            return res.status(500).json(reject.data);
        });
});

router.get('/:username&:pwd', (req, res, next) => {
    //TODO : do better, find better way to load params from req
    const values = {username : req.params.username, pwd: req.params.pwd};

    users.findByUserPass(values.username, values.pwd)
        .then(result => {
            console.log(result.data);
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
    users.deleteById(req.params.id)
        .then(resolve => {
            return res.json(resolve);
        })
        .catch(reject => {
            return res.status(500).json(reject);
        });
});


module.exports = router;