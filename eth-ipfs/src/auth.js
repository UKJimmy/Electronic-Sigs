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

app.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {


    if (req.metaAuth.recovered) {


        //Signature matches the cache address/challenge

        //authentication is valid, assign JWT, etc.

        res.send(req.metaAuth.recovered);
    } else {

        //Sig did not match, invalid authentication

        res.status(500).send();
    };
});
