"use strict";
const { Schema, model } = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      BankTransaction:
 *        type: object
 *        required:
 *          - source_transaction
 *          - bank_account
 *          - amount
 *        properties:
 *          source_transaction:
 *            type: number
 *            description: Tipos de transação [0] - transferencia | [1] - Deposito | [2] - Pagamento | [3] - Cancelamento
 *          bank_account:
 *            type: array
 *            summary: Array que leva as duas contas envolvidas na transação
 *            items:
 *              type: string
 *          amount:
 *            type: number
 *            description: Valor da transação
 *        example:
 *           source_transaction: 2
 *           bank_account: ["12345", "01234"]
 *           amount: 100
 */
const BankTransactionSchema = new Schema(
    {
        source_transaction: {
            type: Number,
            required: true
        },
        bank_account: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "BankAccount"
            }
        ],
        amount: {
            type: Number,
            required: true
        }     
    },
    {
      timestamps: true
    }
  );
  
  module.exports = model("BankTransaction", BankTransactionSchema);