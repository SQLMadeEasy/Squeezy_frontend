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
        //this.nextPrompt = this;
        this.nextPrompt = promptTree.invalidPrompt
        //Redirects to invalid prompt and invalid prompt will redirect back to the original question
        promptTree.invalidPrompt.initialize(this, response)
      }
    },
    nextPrompt: "",
   }

   this.invalidPrompt = {
    redirect: true, 
    prompt: ``,
    choices: [],

    initialize(prompt, previousResponse) {
      this.nextPrompt = prompt
      this.prompt = `${previousResponse} is not a valid response. Please try again.`
    }
 
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
   respond: function (response) {
        // if (isTable(response)) {
        //   this.nextPrompt = "columnPrompt";
        // } 
        // Helper Function to see if a column     exists 
      

        if (isColumn(promptTree.table, response)) {
          console.log('JNDFJKSDNF')
          this.nextPrompt = promptTree.resultPrompt
          promptTree.column = response
          promptTree.resultPrompt.initialize()

        }
   },
   nextPrompt: ""
   }
   this.resultPrompt = {
     initialize () {
       this.prompt = `SELECT ${promptTree.column} FROM ${promptTree.table};`
     },
     respond: function () {

     },
    nextPrompt: this
   }
  }
}

