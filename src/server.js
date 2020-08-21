"use strict";

require("dotenv").config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const ChatBot = require('./utils/ChatBot');

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

    if (process.env.IS_SERVER == "true") {
        client.channels.find(channel => channel.name === 'test').send(`i'm here! ${ChatBot.getCurrentDateAndTime()}`, {
            files: [
                "./src/images/bot/opa.jpg"
            ]
        });

        console.log("botStatus:OK " + process.env.IS_SERVER);

        client.channels.find(channel => channel.name === 'geral').send(`The server is running! After being updated ${ChatBot.getCurrentDateAndTime()}`, {
            files: [
                "./src/images/tenor.gif"
            ]
        });
    } else {
        console.log("botStatus: " + process.env.IS_SERVER);
        client.channels.find(channel => channel.name === 'test').send(`i'm here! ${ChatBot.getCurrentDateAndTime()}`);
    }

    client.user.setPresence({
        status: 'online'
    });
});

client.on('message', message => {

    var mensagem = message.content;

    if (mensagem === 'ping') {
        message.reply('pong');
    }
    else if (mensagem.includes('documentação')
        || mensagem.includes('api')) {
        message.reply('Toma ai zé mané: https://documenter.getpostman.com/view/472946/T1LPD7FG');
    }
    else if (mensagem.includes('mirella')
        || mensagem.includes('professora')) {
        ChatBot.intervalo(client);
    }
    else if (mensagem.includes('bot desligar')) {
        ChatBot.botOff(message, client);
    }
    else if (mensagem.includes('bot ligar')) {
        ChatBot.botOn(message, client);
    }
    else if (mensagem.includes('bot')) {
        ChatBot.botCall(message);
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

server.use(cors());
server.use(express.json());
// server.use(favicon(path.join(__dirname, 'images', 'images.png')));
server.use(routes);

server.listen(process.env.PORT || 3333);