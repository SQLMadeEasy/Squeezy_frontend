import {isTable, isColumn, tables} from './dummydata'


export class PromptTree {
  constructor() {
    const promptTree = this
    
    this.table = null
    this.column = null 
    
    this.tablePrompt = { 
    prompt: "What data are you interested in?",
    choices: Object.keys(tables),
    respond: function (response) {
      //debugger;
      if (isTable(response)) {
        //If table is chosen set next Prompt to column Prompt
        this.nextPrompt = promptTree.columnPrompt;
        //set this.table to reponse
        promptTree.table = response
        promptTree.columnPrompt.initialize()
        
      } else {
        //else stay at curent Prompt
        this.nextPrompt = this;
      }
    },
    nextPrompt: "",
   
   }

   this.curNode = this.tablePrompt

   this.columnPrompt = {
   initialize () {
     this.prompt = `What about ${promptTree.table} are you interested in?`
    this.choices = Object.keys(tables[promptTree.table])
   },
   prompt: '',
   //this.table needs equal to
   choices: [],
   respond: response => {
        // if (isTable(response)) {
        //   this.nextPrompt = "columnPrompt";
        // } 
        // Helper Function to see if a column     exists 

        if (isColumn(this.table, response)) {
    
          this.nextPrompt = promptTree.resultPrompt

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

