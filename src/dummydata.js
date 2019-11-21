export const tables = {
  
  users: {
    name: "",
    age: ""
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
  if (tables[table][column]) {
    return true
  }
  return false
}
