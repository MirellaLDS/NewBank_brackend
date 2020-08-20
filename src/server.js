"use strict";

require("dotenv").config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const Discord = require('discord.js');

const client = new Discord.Client();

const routes = require('./routers/routes');

const server = express();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.on('ready', () => {
    console.log('I am ready!');

    client.channels.find(channel => channel.name === 'test').send("i'm here!", {
        files: [
            "./images/ry5enok9.bmp"
        ]
    }); // for discord v11
    // client.channels.cache.find(channel => channel.name === 'test').send("i'm here!", {
    //     files: [
    //         "./images/ry5enok9.bmp"
    //     ]
    // }); // for discord v12

    client.user.setPresence({
        status: 'online'
    })
});

client.on('message', message => {

    if (message.content === 'ping') {
        message.reply('pong');
    }
    var lastMessage = message.first();

    if (lastMessage.author.bot) {
        message.reply('A new version has been generated!');
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

server.use(cors());
server.use(express.json());
server.use(favicon(path.join(__dirname, 'images', 'images.png')))
server.use(routes);

server.listen(process.env.PORT || 3333);