// dtos/IncomeDTO.js

class CreateIncomeDTO {
  constructor({ amount, source, date }) {
    this.amount = amount;
    this.source = source;
    this.date = date;
  }
}

class UpdateIncomeDTO {
  constructor({ amount, source, date }) {
    this.amount = amount;
    this.source = source;
    this.date = date;
  }
}

export { CreateIncomeDTO, UpdateIncomeDTO };
