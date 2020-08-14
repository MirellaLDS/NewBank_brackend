"use strict";

require("dotenv").config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routers/routes');

const server = express();

mongoose.connect('mongodb+srv://mlds:321456@cluster0-acv5q.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(cors());
server.use(express.json());
server.use(favicon(path.join(__dirname, 'images', 'images.png')))
server.use(routes);

server.listen(process.env.PORT || 3333);