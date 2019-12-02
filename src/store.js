import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import chat, {messageMiddleware, logger} from './chat'
import data from './data'
import persistState from 'redux-localstorage'

const enhancer = compose(
    persistState()
)


const reducer = combineReducers({
    chat,
    data,
})
const enhancers = composeWithDevTools(
    applyMiddleware(thunkMiddleware, messageMiddleware, logger),
    enhancer
)

const store = createStore(reducer, enhancers)

export default store

export * from './chat'
export * from './data'
