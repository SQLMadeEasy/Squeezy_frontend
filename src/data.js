import axios from 'axios'

const LOAD_DATA = "LOAD_DATA"
const REHYDRATE = "REHYDRATE"

const loadDataAction = (data) => {
    return {
        type: LOAD_DATA,
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
            url: 'http://localhost:8080/schema/run_query',
            data: {query: query}
        });
        dispatch(loadDataAction(response.data))
    }
}

const initState = {
    queryData: []
}

const dataReducer = (state = initState, action) => {
    Object.freeze(state)
    switch (action.type) {
        case LOAD_DATA:
            return {...state, queryData: action.payload}
        case REHYDRATE:
            // retrive stored data for reducer callApi
            const savedData = action.payload.callApi || initState;

            return {
                ...state, ...savedData
            };
        default:
            return state
    }
}

export default dataReducer
