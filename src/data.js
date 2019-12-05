import axios from 'axios'

const LOAD_DATA = "LOAD_DATA"
const LOAD_ALL_DATA = "LOAD_ALL_DATA"
const REHYDRATE = "REHYDRATE"

export const loadDataAction = (data) => {
    return {
        type: LOAD_DATA,
        payload: data
    }
}

export const loadAllDataAction = (data) => {
    return {
        type: LOAD_ALL_DATA,
        payload: data
    }
}


export const loadData = (query, databaseName,
    databaseHostname,
    databaseUser,
    databasePort,
    databasePassword) => {
    return async dispatch => {
        console.log('query is ', query)
        const response = await axios({
            method: 'post',
            url: 'https://englishql-backend.onrender.com/schema/run_query',
            data: {query: query}
        });
        dispatch(loadDataAction(response.data))
    }
}


export const loadAllData = (tableName, databaseName,
    databaseHostname,
    databaseUser,
    databasePort,
    databasePassword) => {
        console.log('ANYTHING')
    return async dispatch => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/schema/run_query',
            data: {query: `SELECT COUNT(*) FROM ${tableName}`}
        });
        dispatch(loadAllDataAction(response.data))
    }
}

const initState = {
    queryData: [],
    rowCount: -1,
}

const dataReducer = (state = initState, action) => {
    Object.freeze(state)
    switch (action.type) {
        case LOAD_DATA:
            return {...state, queryData: action.payload}
        case LOAD_ALL_DATA:
            return {...state, rowCount: action.payload}
        default:
            return state
    }
}

export default dataReducer
