// dtos/ExpenseDTO.js

class CreateExpenseDTO {
  constructor({ amount, category, date }) {
    this.amount = amount;
    this.category = category;
    this.date = date;
  }
}

class UpdateExpenseDTO {
  constructor({ amount, category, date }) {
    this.amount = amount;
    this.category = category;
    this.date = date;
  }
}

export { CreateExpenseDTO, UpdateExpenseDTO };
