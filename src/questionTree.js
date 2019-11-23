import { isTable, isColumn, tables } from './dummydata'


export class PromptTree {
  constructor() {
    const promptTree = this

    this.table = null
    this.column = null

    this.tablePrompt = {
      prompt: "What data are you interested in?",
      choices: Object.keys(tables),
      respond: function (response) {
        if (isTable(response)) {
          this.nextPrompt = promptTree.columnPrompt;
          promptTree.table = response
          promptTree.columnPrompt.initialize()

        } else {
          this.nextPrompt = promptTree.invalidPrompt
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
      initialize() {
        this.prompt = `What about ${promptTree.table} are you interested in?`
        this.choices = Object.keys(tables[promptTree.table])
      },
      prompt: '',
      choices: [],
      respond: function (response) {
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
              goToNextAndInitialize(this, promptTree.constraintsPromt)
              break
            default:
              break;
          }
        }
      }
    }

    this.constraintsPromt = {
      initialize() {
        this.prompt = `Which of of the following, do you wish to constrain by?`
        this.choices = Object.keys(tables[promptTree.table])
      },

      respond(response) {
        promptTree.constraintColumns = response.split(", ");
        promptTree.constraintIndex = 0;
        promptTree.constraintRanges = [];
        goToNextAndInitialize(this, promptTree.constrainByRange)
      }
    }

    this.constrainByRange = {
      initialize() {
        this.prompt = `What range do you wish to constrain ${promptTree.constraintColumns[promptTree.constraintIndex]} by?`
      },

      respond(reponse) {
        const range = reponse.split(", ")
        promptTree.constraintRanges[promptTree.constraintIndex] = { min: range[0], max: range[1] };
        if (promptTree.constraintIndex < promptTree.constraintColumns.length - 1) {
          promptTree.constraintIndex++;
          goToNextAndInitialize(this, this)
        } else {
          goToNextAndInitialize(this, promptTree.resultPrompt)
        }
      }
    }

    this.resultPrompt = {
      initialize() {
        if (!promptTree.constraintColumns || !promptTree.constraintColumns.length) {
          this.prompt = `SELECT ${promptTree.column} FROM ${promptTree.table};`
        } else {
          this.prompt = `SELECT ${promptTree.column} FROM ${promptTree.table} WHERE ${promptTree.constraintColumns.map((col, index) => {
            return `${col} is between ${promptTree.constraintRanges[index].min} and ${promptTree.constraintRanges[index].max} `
          }).join(" and ")};`
        }

        this.nextPrompt = this
      },
      respond: function () {

      },
      nextPrompt: {}
    }
  }
}


function goToNextAndInitialize(currPrompt, nextPrompt, args = []) {
  nextPrompt.initialize(...args)
  currPrompt.nextPrompt = nextPrompt
}
