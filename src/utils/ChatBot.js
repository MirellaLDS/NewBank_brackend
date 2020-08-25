
var botStatus = 0;

exports.intervalo = (client) => {

    if (botStatus > 0 && process.env.IS_SERVER == "true") {
        var horaAgendada = new Date('August 20, 2020 17:45:00');
        var hours = horaAgendada.getHours();

        var currentdate = new Date();

        if (currentdate.getHours() == hours) {
            client.channels.find(channel => channel.name === 'test').send('Faltam 15 min');
        } else if (currentdate.getHours() < hours) {
            client.channels.find(channel => channel.name === 'test').send('Reunião começa as 18h');
        } else {
            client.channels.find(channel => channel.name === 'test').send('Not yet!');
        }
    }
}

exports.botCall = (message) => {
    if (botStatus > 0) {
        message.reply("i'm here!", {
            files: [
                "./src/images/bot/opa.jpg"
            ]
        });
    }
}

exports.botOff = (message, client) => {
    message.reply("Okay, I'm going! But you'll miss me.", {
        files: [
            "./src/images/bot/bot_debochado.png"
        ]
    });

    client.user.setPresence({
        status: 'offline'
    });

    this.botStatus = -1;
}

exports.botOn = (message, client) => {
    message.reply("Mas já? Mas já quer que eu volte...", {
        files: [
            "./src/images/bot/bot_ligar.jpg"
        ]
    });

    client.user.setPresence({
        status: 'online'
    });

    botStatus = 1;
}

exports.getCurrentDateAndTime = () => {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + ' - ' + time;
}

exports.loginHeroku = () => {

    // heroku login -i

}