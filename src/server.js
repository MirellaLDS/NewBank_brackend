"use strict";

require("dotenv").config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const { Client } = require('discord.js');

const client = new Client();

const routes = require('./routers/routes');

const server = express();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.on('ready', () => {
    console.log('I am ready!');

    // const attachment = new Attachment('https://42oahg400ufw3vfyws2k38y6-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/meme.jpg', 'name'); // name is optional

    client.channels.find(channel => channel.name === 'test').send("i'm here!", {
        files: [
            "./src/images/opa.jpg"
        ]
    });

    // client.channels.find(channel => channel.name === 'geral').send("The server is running!", {
    //     files: [
    //         "./src/images/tenor.gif"
    //     ]
    // });

    // client.channels.find(channel => channel.name === 'test').send('Hey there', attachment).catch(console.error);;

    client.user.setPresence({
        status: 'online'
    });

    // setInterval('');
});

client.on('message', message => {

    var mensagem = message.content;

    if (mensagem === 'ping') {
        message.reply('pong');
    }
    else if (mensagem.includes('documentação')
        || mensagem.includes('server')
        || mensagem.includes('api')) {
        message.reply('Toma ai zé mané: https://documenter.getpostman.com/view/472946/T1LPD7FG');
    }
    else if (mensagem.includes('mirella')
        || mensagem.includes('professora')) {
        message.reply('A reunião começa as 18:00', {
            files: [
                "./src/images/aviso.jpg"
            ]
        });
    }
    else if (mensagem.includes('bot')) {
        message.reply("i'm here!", {
            files: [
                "./src/images/opa.jpg"
            ]
        });
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

server.use(cors());
server.use(express.json());
// server.use(favicon(path.join(__dirname, 'images', 'images.png')));
server.use(routes);

server.listen(process.env.PORT || 3333);