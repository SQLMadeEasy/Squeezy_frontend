import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import chat, {messageMiddleware, logger} from './chat'
import data from './data'


const reducer = combineReducers({
    chat,
    data,
})
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, messageMiddleware, logger)
)
const store = createStore(reducer, middleware)

export default store
export * from './chat'
export * from './data'
