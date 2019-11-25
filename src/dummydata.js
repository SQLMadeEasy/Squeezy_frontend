
const INTEGER = "INTEGER";
const STRING = "STRING";

export const tables = {

  users: {
    name: STRING,
    email: STRING,
    age: INTEGER,
    height: INTEGER,
    weight: INTEGER,
    money: INTEGER,
  },

  products: {
    title: STRING,
    description: STRING,
    inventory: INTEGER,
    price: INTEGER,
    amountSold: INTEGER,
  },

  orders: {
    items: STRING,
    status: STRING,
    total: INTEGER,
  }
}




export function isTable(str) {
  if (tables[str]) {
    return true
  }
  return false
}

export function isColumn(table, column) {
  if (tables[table][column] !== undefined) {
    return true
  }
  return false
}
