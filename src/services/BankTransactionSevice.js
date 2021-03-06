const UserService = require('./UserService');
const AccountService = require('./BankAccountService');
const Transaction = require('../models/BankTransaction');
const Boleto = require('@mrmgomes/boleto-utils');

const self = this;

    exports.getBoleto = async (cpf, pws, amount) => {

        const barCode = await gerarBoleto();

        return barCode;  
    }

    exports.saveTransaction = async (cpf, pws, type, amount, destino = "000") => {        
        const account = await AccountService.getAccount(cpf, pws);

        var dest = destino == "000" ? "5f36bbf43b109377b0a9611d" : destino;

        const transaction = await Transaction.create({
            source_transaction: type,
            bank_account: [account._id, dest],            
            amount
        });

        return transaction;
    }

    gerarBoleto = () => {
        //https://www.npmjs.com/package/@mrmgomes/boleto-utils
        var result = Boleto.geraCodBarras('23790448095616862379336011058009740430000124020');
        return result;
    }