import {isTable, isColumn, tables, STRING, INTEGER} from './dummydata'


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
          goToNextAndInitialize(this, promptTree.allOrSomePrompt)
          promptTree.column = response

        }
   },
   nextPrompt: ""
   }

   this.allOrSomePrompt = {
     initialize() {
       this.prompt = `Do you want all the ${promptTree.table} or just some of the ${promptTree.table}?`
       this.choices = ['all', 'some']
     },
     respond: function (response) {
       if (this.choices.includes(response)) {
         switch (response) {
           case 'all':
             goToNextAndInitialize(this, promptTree.resultPrompt)
             break
           case 'some':
             goToNextAndInitialize(this, promptTree.constraints)
             break
           default:
             break;
         }
       }
     }
   }

    this.constraints = {
      initialize() {
        this.prompt = `What do you want to constrain your results by?`
        this.choices = Object.keys(tables[promptTree.table])
      },
      respond: function (response) {
        if (this.choices.includes(response)) {
          switch (tables[promptTree.table][response]) {
            case INTEGER:
              goToNextAndInitialize(this, promptTree.resultPrompt)
              break
            case STRING:
              goToNextAndInitialize(this, promptTree.resultPrompt)
              break
            default:
              break;
          }
        }
      }
    }
   this.resultPrompt = {
     initialize () {
       this.prompt = `SELECT ${promptTree.column} FROM ${promptTree.table};`
       this.nextPrompt = this
     },
     respond: function () {

     },
    nextPrompt: {}
   }
  }
}


function goToNextAndInitialize(currPrompt, nextPrompt) {
  nextPrompt.initialize()
  currPrompt.nextPrompt = nextPrompt
}
