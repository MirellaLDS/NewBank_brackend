const UserService = require('./UserService');
const Account = require('../models/BankAccount');

exports.getAccount = async (cpf, pws) => {
  const user = await UserService.getUser(cpf, pws);

  const account = await Account.findOne({user});

  return account;  
}

exports.getAccountById = async (id) => {
  const account = await Account.findOne({_id: id});

  return account;  
}