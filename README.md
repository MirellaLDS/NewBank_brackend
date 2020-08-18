# NewBank_brackend
O servidor em questão fornecerá informações sobre uma conta bancária vinculada ao usuário proprietário do dispositivo.

> [!IMPORTANT]
> Você precisa ter instalado nodejs

**Rodar projeto**
- Local: yarn dev
- Produção: yarn start


**Public API:** 
> https://newbank-backend.herokuapp.com/
> <br/><br/>
> **GET Logs**
> <br/>
> Install Heroku client to see server logs
> <br/>
> `heroku logs --app newbank-backend --tail`

**Documentação**
> https://documenter.getpostman.com/view/472946/T1LPD7FG

**Requisitos**
> [!CAUTION]
> O servidor em questão fornecerá informações sobre uma conta bancária vinculada ao usuário proprietário do dispositivo.
> 
> Informações da conta:
> - Agência;
> - Conta corrente;
> - Proprietário da conta;
> - Saldo;
> - Status (Ativa, cancelada)
> 
> Movimentações:
> - Transação origem;
> - Data;
> - Valor;
> - Conta afetada;
> 
> Transações:
> - Transferências;
> - Depósitos (Por boleto, um código aleatório será gerado);
> - Pagamentos;
> - Cancelamento de conta;
