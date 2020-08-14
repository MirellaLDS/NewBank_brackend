const User = require('../models/User');

  exports.getUser = async (cpf, pws) => {
    if (!cpf || !pws){
      throw new Error('Os campos "cpf" e "pws" são obrigatórios, verifique e tente novamente!');
    }

    const user = await User.findOne({ cpf: cpf });

    if(!user || user.pws != pws) {
      throw new Error('Credenciais inválidas');
    }

    return user;
  }
