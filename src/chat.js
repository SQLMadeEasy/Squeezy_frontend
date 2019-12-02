import { ApiAiClient } from 'api-ai-javascript'
import { createLogger } from 'redux-logger'
import { PromptTree } from './questionTree'
import axios from 'axios'


const promptTree = new PromptTree()

const accessToken = '1113c174971d4174bf4ed8778835ba8b'
const client = new ApiAiClient({ accessToken })


//ACTION TYPE
const ON_MESSAGE = "ON_MESSAGE"
const INITIAL_STATE = "INITIAL_STATE"
const REHYDRATE = "REHYDRATE"




//ACTION CREATOR
export const sendMessage = (text, choices = [], speaker) => {
  return {
    type: ON_MESSAGE,
    payload: {
      text,
      choices,
      speaker
    },
  }
}



//GRABBING RESPONSE FROM TEXT REQUEST
export const messageMiddleware = () => next => action => {
  if (action.type === ON_MESSAGE) {
    let { text } = action.payload
    // text = text.toLowerCase();

    next(sendMessage(text, [], 'user'))
    // client.textRequest(text)
    //   .then( onSuccess )

    //   function onSuccess (response) {
    //     const {result: {fulfillment }} = response
    // next(sendMessage(fulfillment.speech, 'bot'))
    //debugger;

    console.log("current node: ", promptTree.curNode)
    console.log("next prompt", promptTree.curNode.nextPrompt)

    promptTree.curNode.respond(text)
    promptTree.curNode = promptTree.curNode.nextPrompt


    while (promptTree.curNode.redirect) {
      next(sendMessage(promptTree.curNode.getPrompt(), promptTree.curNode.getChoices()))

      promptTree.curNode =
        promptTree.curNode.nextPrompt

    }

    next(sendMessage(promptTree.curNode.getPrompt(), promptTree.curNode.getChoices()))
  } else {
    next(action)
  }
}




export const logger = createLogger({
  predicate: (getState, action) => {
    //  return ![].includes(action.type);
    // Return false if you don't want to log anything.
    return true;
  }
});

const initState = [
  {
    // text: promptTree.curNode.getPrompt(),
    // choices: promptTree.curNode.getChoices(),
    // speaker: 'chatBot'
    text: "",
    choices: [],
    speaker: "chatBot",
    placeholder: ''
  }
]



export const setUpInitialState = (tables) => {
  console.log("we ran")
  promptTree.setupTables(tables)
  return {
    type: INITIAL_STATE,
    payload: {
      text: promptTree.curNode.getPrompt(),
      choices: promptTree.curNode.getChoices(),
      speaker: 'chatBot'
    },
  }
}

const messageReducer = (state = initState, action) => {
  console.log('before the switch', state, action)
  switch (action.type) {
    case INITIAL_STATE:
      return [action.payload]
    case ON_MESSAGE:
      return [...state, action.payload]
    case REHYDRATE:
      // retrive stored data for reducer callApi
      const savedData = action.payload.callApi || initState;

      return {
        ...state, ...savedData
      };
    default:
      console.log('default is hit')
      return state
  }
}

export default messageReducer


