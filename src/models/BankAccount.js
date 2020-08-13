"use strict";
const { Schema, model } = require("mongoose");

const BankAccountSchema = new Schema(
    {
        bank_branch: {
            type: String,
            required: true
          },
          code: {
            type: String,
            required: true
          },
          user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
          },
          account_balance: {
            type: Number,
            required: true
          },
          status: {
            type: Boolean,
            requireq: true
          }
        },
        {
          timestamps: true
        }
  );
  
  module.exports = model("BankAccount", BankAccountSchema);