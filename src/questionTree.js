
const INTEGER = "INTEGER";
const STRING = "STRING";

let tables;

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



export class PromptTree {
  constructor() {

    const promptTree = this;

    this.table = null;
    this.column = null;

    this.tablePrompt = {
      getPrompt: function () {
        return "What data are you interested in?";
      },

      getChoices: function () {
        return Object.keys(tables);
      },

      respond: function (response) {
        if (isTable(response)) {
          setNextPrompt(this, promptTree.columnPrompt);
          promptTree.table = response;
        } else {
          promptTree.runIsInvalidReponse(this, response);
        }
      },
    }

    this.startNode = this.tablePrompt;
    this.curNode = this.tablePrompt;


    this.columnPrompt = {
      getPrompt() {
        return `What about ${promptTree.table} are you interested in?`;
      },

      getChoices() {
        return Object.keys(tables[promptTree.table]);
      },


      respond: function (response) {
        if (isColumn(promptTree.table, response)) {
          setNextPrompt(this, promptTree.allOrSomePrompt)
          promptTree.column = response
        } else {
          promptTree.runIsInvalidReponse(this, response);
        }
      }
    }

    this.allOrSomePrompt = {
      getPrompt: function () {
        return `Do you want all the ${promptTree.table} or just some of the ${promptTree.table}?`;
      },

      getChoices: function () {
        return this.choices = ['all', 'some'];
      },

      respond: function (response) {
        if (this.choices.includes(response)) {
          switch (response) {
            case 'all':
              setNextPrompt(this, promptTree.resultPrompt)
              break
            case 'some':
              setNextPrompt(this, promptTree.constraintsPromt)
              break
            default:
              break;
          }
        } else {
          promptTree.runIsInvalidReponse(this, response);
        }
      }
    }

    this.constraintsPromt = {
      getPrompt: function () {
        return `Which of of the following, do you wish to constrain by?`;
      },

      getChoices: function () {
        return Object.keys(tables[promptTree.table]);
      },

      respond(response) {
        promptTree.constraintColumns = response.split(", ");
        promptTree.constraintIndex = 0;
        promptTree.constraintRanges = [];
        if (tables[promptTree.table][promptTree.constraintColumns[promptTree.constraintIndex]] === INTEGER) {
          setNextPrompt(this, promptTree.constrainByIntRange);
        } else {
          setNextPrompt(this, promptTree.constrainByStrRange);
        }
      }
    }


    this.constrainByIntRange = {
      getPrompt: function () {
        return `What range do you wish to constrain ${promptTree.constraintColumns[promptTree.constraintIndex]} by?`;
      },

      getChoices: function () {
        return [];
      },

      respond(response) {
        // reponse = reponse.split(" ").join(",");
        // const numbers = [""];
        // let numberIndex = 0;
        // let lastWasANumber = false;
        // for (let i = 0; i < reponse.length; i++) {
        //   if (i === 0) {
        //     if (!isNaN(reponse[0])) {
        //       numbers[0] += reponse[0];
        //       lastWasANumber = true;
        //     }
        //   } else {
        //     if (!isNaN(reponse[i])) {
        //       if (lastWasANumber) {
        //         numbers[numberIndex] += reponse[i];
        //       } else {
        //         numbers[numberIndex] += reponse[i];
        //         lastWasANumber = true;
        //       }
        //     } else {
        //       if (lastWasANumber) {
        //         numberIndex++;
        //         numbers[numberIndex] = "";
        //       }
        //       lastWasANumber = false;
        //     }
        //   }
        // }

        // for (let i = 0; i < numbers.length; i++) {
        //   numbers[i] = Number(numbers[i]);
        // }                "20 - 40"
        // let numbers;
        // if (response[0] === "-") {
        //   numbers = []
        //   numbers[1] = response.split("-")[1];
        //   console.log(numbers)
        // } else {

        // }
        let numbers = response.split("-");

        promptTree.constraintRanges[promptTree.constraintIndex] = { min: numbers[0], max: numbers[1] };
        console.log({ min: numbers[0], max: numbers[1] })

        if (promptTree.constraintIndex < promptTree.constraintColumns.length - 1) {
          promptTree.constraintIndex++;
          if (tables[promptTree.table][promptTree.constraintColumns[promptTree.constraintIndex]] === INTEGER) {
            setNextPrompt(this, promptTree.constrainByIntRange);
          } else {
            setNextPrompt(this, promptTree.constrainByStrRange);
          }
        } else {
          setNextPrompt(this, promptTree.resultPrompt);
        }
      }
    }

    this.constrainByStrRange = {
      getPrompt: function () {
        return `What text do you wish to constrain ${promptTree.constraintColumns[promptTree.constraintIndex]} by?`;
      },

      getChoices: function () {
        return [`${promptTree.constraintColumns[promptTree.constraintIndex]} should be TEXT`,
        `${promptTree.constraintColumns[promptTree.constraintIndex]} should include TEXT`];
      },

      respond: function (response) {
        if (response.includes("include")) {
          promptTree.constraintRanges[promptTree.constraintIndex] = { constraint: `CONTAINS ${response}` };
        } else {
          promptTree.constraintRanges[promptTree.constraintIndex] = { constraint: `= ${response}` };
        }

        if (promptTree.constraintIndex < promptTree.constraintColumns.length - 1) {
          promptTree.constraintIndex++;
          if (tables[promptTree.table][promptTree.constraintColumns[promptTree.constraintIndex]] === INTEGER) {
            setNextPrompt(this, promptTree.constrainByIntRange);
          } else {
            setNextPrompt(this, promptTree.constrainByStrRange);
          }
        } else {
          setNextPrompt(this, promptTree.resultPrompt);
        }
      }
    }

    this.resultPrompt = {
      getPrompt: function () {
        if (!promptTree.constraintColumns || !promptTree.constraintColumns.length) {
          return `SELECT ${promptTree.column} FROM ${promptTree.table};`
        } else {
          return `SELECT ${promptTree.column} FROM ${promptTree.table} WHERE ${promptTree.constraintColumns.map((col, index) => {
            if (tables[promptTree.table][promptTree.constraintColumns[index]] === INTEGER) {
              if (promptTree.constraintRanges[index].min) {
                if (promptTree.constraintRanges[index].max) {
                  return `${col} BETWEEN ${promptTree.constraintRanges[index].min} AND ${promptTree.constraintRanges[index].max} `;
                } else {
                  return `${col} GREATER THAN ${promptTree.constraintRanges[index].min}`;
                }
              } else {
                return `${col} LESS THAN ${promptTree.constraintRanges[index].max}`;
              }
              // return `${col} BETWEEN ${promptTree.constraintRanges[index].min} AND ${promptTree.constraintRanges[index].max} `;
            } else {
              return `${col} ${promptTree.constraintRanges[index].constraint} `;
            }
          }).join(" AND ")};`
        }
      },

      getChoices: function () {
        return [];
      },

      respond: function () {
        setNextPrompt(this, this);
      }
    };


    this.invalidPrompt = {
      redirect: true,

      getPrompt: function () {
        return this.prompt;
      },
      getChoices: function () {
        return [];
      },

      initialize(prompt, previousResponse) {
        this.nextPrompt = prompt
        this.prompt = `${previousResponse} is not a valid response. Please try again.`;
      }
    }

    this.runIsInvalidReponse = function (currentPrompt, invalidResponse) {
      currentPrompt.nextPrompt = promptTree.invalidPrompt;
      promptTree.invalidPrompt.initialize(currentPrompt, invalidResponse)
    }
  }

  setupTables(t) {
    tables = t;
  }
}


function setNextPrompt(currPrompt, nextPrompt, args = []) {
  currPrompt.nextPrompt = nextPrompt;
  nextPrompt.previousPrompt = currPrompt;
}
