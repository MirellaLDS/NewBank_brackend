const UserService = require('./UserService');
const AccountService = require('./BankAccountService');
const Transaction = require('../models/BankTransaction');
const Boleto = require('@mrmgomes/boleto-utils');

const self = this;

    exports.getBoleto = async (cpf, pws, amount) => {
        // const user = await UserService.getUser(cpf, pws);

        // const account = await AccountService.getAccount(cpf, pws);

        // Guardar boleto gerado

        const barCode = await gerarBoleto();

        await self.saveTransaction(cpf, pws, 1, amount);

        return barCode;  
    }

    exports.saveTransaction = async (cpf, pws, type, amount, destino = "000") => {        
        const account = await AccountService.getAccount(cpf, pws);

        const transaction = await Transaction.create({
            source_transaction: type,
            bank_account: [account._id, destino],            
            amount
        });

        return transaction;
    }

    gerarBoleto = () => {
        //https://www.npmjs.com/package/@mrmgomes/boleto-utils
        var result = Boleto.geraCodBarras('23790448095616862379336011058009740430000124020');
        return result;
    }