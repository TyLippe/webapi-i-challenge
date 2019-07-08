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
            res.status(500).json({
                error: 'The users information could not be retrieved.'
            });
        });
});

//by ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            }   else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."});
            }})
        .catch(err => {
            res.status(500).json({ error: 'The user information could not be retrived.' })
    })
})


//add
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    if (userInfo.name && userInfo.bio) {
        Users.insert(userInfo)
            .then(users => {
                res.status(201).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
    }
})

//delete
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The user could not be removed.' });
        });
})

//update
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body

    if (changes.name && changes.bio) {
    Users.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(changes).end();
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'The user information could not be modified.'
            });
        });
    } else {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
        })
    }
})

const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`));