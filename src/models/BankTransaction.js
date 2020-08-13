"use strict";
const { Schema, model } = require("mongoose");

const BankTransactionSchema = new Schema(
    {
        source_transaction: {
            type: Number,
            required: true
        },
        bank_account: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "BankAccount"
        },
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