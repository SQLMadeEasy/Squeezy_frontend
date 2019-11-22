export const STRING = 'string'
export const INTEGER = 'integer'


export const tables = {
  
  users: {
    name: STRING,
    age: INTEGER
  },
  products: {},
  orders: {}

}


export function isTable (str) {
  if(tables[str]){
    return true 
  } 
  return false
}

export function isColumn (table, column) {
  if (tables[table][column] !== undefined) {
    return true
  }
  return false
}
