const express = require('express');

const MetaAuth = require('meta-auth');

const app = express();

const MetaAuth = MetaAuth();

const metaAuth = require('meta-auth')({

    message: 'msg',
    signature: 'sig',
    address: 'address'
});

app.get('/auth/:MetaAddress', metaAuth, (req, res) => {
    // Request a message from the server

    res.send(req.metaAuth.challenge)
});