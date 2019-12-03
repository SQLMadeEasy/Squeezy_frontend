import axios from 'axios'
const INTEGER = "integer";
const STRING = "string";

export const getTables = async () => await axios.post('http://localhost:8080/schema')

export const tables = getTables();

export const defaultTables = {

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




