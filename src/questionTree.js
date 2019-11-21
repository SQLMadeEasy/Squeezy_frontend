import {isTable, isColumn, tables} from './dummydata'


export class PromptTree {
  constructor() {
    const promptTree = this
    this.table = null
    this.column = null 
    
    this.tablePrompt = { 
    prompt: "What data are you interested in?",
    choices: Object.keys(tables),
    respond: response => {
      if (isTable(response)) {
        //If table is chosen set next Prompt to column Prompt
        this.tablePrompt.nextPrompt = this.columnPrompt;
        //set this.table to reponse
        this.table = response
      } else {
        //else stay at curent Prompt
        this.tablePrompt.nextPrompt = this.tablePrompt;
      }
    },
    nextPrompt: ""
   }

   this.curNode = this.tablePrompt

   this.columnPrompt = {
   prompt: `What about ${this.table} are you interested in?`,
   choices: Object.keys(tables[promptTree.table]),
   respond: response => {
        // if (isTable(response)) {
        //   this.nextPrompt = "columnPrompt";
        // } 
        // Helper Function to see if a column     exists 
        if (isColumn(this.table, response)) {
          this.columnPrompt.nextPrompt = this.resultPrompt

          this.column = response
        }
   },
   nextPrompt: ""
   }
   this.resultPrompt = {
    prompt: `SELECT ${this.column} FROM ${this.table};`
   }
  }
}

