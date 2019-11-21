import {ApiAiClient} from 'api-ai-javascript'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import {tables} from './dummydata'
import {PromptTree} from './questionTree'
import { send } from 'q'

const promptTree = new PromptTree()

const accessToken = '1113c174971d4174bf4ed8778835ba8b'
const client = new ApiAiClient({accessToken})


//ACTION TYPE
const ON_MESSAGE = "ON_MESSAGE"


//ACTION CREATOR
export const sendMessage = (text, sender="user") => {
  return {
    type: ON_MESSAGE,
    payload: {text, sender, choices:[]},
  }
}


//GRABBING RESPONSE FROM TEXT REQUEST
const messageMiddleware = () => next => action => {
  if (action.type === ON_MESSAGE) { 
    const { text } = action.payload

    // client.textRequest(text)
    //   .then( onSuccess )

    //   function onSuccess (response) {
    //     const {result: {fulfillment }} = response
        // next(sendMessage(fulfillment.speech, 'bot'))
        promptTree.curNode.respond(text)
        promptTree.curNode = promptTree.curNode.nextPrompt
        next(sendMessage())
      }
  }




const logger = createLogger({
  predicate: (getState, action) => {
      // Use the next line to disable specific actions from being logged.
      // return ![ACTION_TYPE_ONE, ACTION_TYPE_TWO, ...].includes(action.type);
    //  return ![].includes(action.type);
      // Return false if you don't want to log anything.
       return true;
  }
});

const initState = [
  {
    text: promptTree.curNode,
    choices: promptTree.curNode.choices
  }
]

const messageReducer = (state=initState, action) => {
  switch (action.type){
    case ON_MESSAGE:
      return [...state, action.payload]
    default:
      return state
  }
}


export const Store = createStore(messageReducer, applyMiddleware(messageMiddleware, logger))
