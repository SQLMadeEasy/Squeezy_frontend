import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import chat, {messageMiddleware, logger, promptTree} from './chat'
import data from './data'
import credentials from './credentials'
import persistState from 'redux-localstorage'

const enhancer = compose(
    persistState('data')
)


const reducer = combineReducers({
    chat,
    data,
    credentials,
})
const enhancers = composeWithDevTools(
    applyMiddleware(thunkMiddleware, messageMiddleware, logger),
    enhancer
)

const store = createStore(reducer, enhancers)
promptTree.store = store

export default store

export * from './chat'
export * from './data'
