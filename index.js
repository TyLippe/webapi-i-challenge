const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Working on Challenge!');
});

//read
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//add
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    Users.insert(userInfo)
        .then(users => { 
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

//delete
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => { 
            if(deleted) {
                res.status(204).end();
        }   else {
            res.status(404).json({ message: 'Cannot find that user!'})
        }})
        .catch(err => {
            res.status(500).json(err);
        });
})

//update
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body

    Users.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).end();
        }   else {
            res.status(404).json({ message: 'Cannot find that user!'})
        }})
        .catch(err => {
            res.status(500).json(err);
    });
})

const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`));