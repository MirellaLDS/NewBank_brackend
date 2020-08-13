const axios = require("axios");
const User = require("../models/User");
const Boleto = require('@mrmgomes/boleto-utils');

module.exports = {
    async pay(req, res) {
        console.log("Pagamento");
    },
    async gerarBoleto(req, res) {
        //https://www.npmjs.com/package/@mrmgomes/boleto-utils
       var result = Boleto.geraCodBarras('23790448095616862379336011058009740430000124020');
        console.log("Resposta");
        return res.json(result);
    }
};