import {ApiAiClient} from 'api-ai-javascript'
import { createStore, applyMiddleware } from 'redux'


const accessToken = '1113c174971d4174bf4ed8778835ba8b'
const client = new ApiAiClient({accessToken})


//ACTION TYPE
const ON_MESSAGE = "ON_MESSAGE"


//ACTION CREATOR
export const sendMessage = (text, sender="user") => {
  return {
    type: ON_MESSAGE,
    payload: {text, sender}
  }
}


//GRABBING RESPONSE FROM TEXT REQUEST
const messageMiddleware = () => next => action => {
  if (action.type === ON_MESSAGE){ 
    const { text } = action.payload

    client.textRequest(text)
      .then( onSuccess )

      function onSuccess (response) {
        const {result: {fulfillment }} = response
        next(sendMessage(fulfillment.speech, 'bot'))
      }
  }
}

const initState = [
  {
    text: 'Hi, How can I help you today?'
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


export const Store = createStore(messageReducer, applyMiddleware(messageMiddleware))
