import axios from 'axios'

const LOAD_DATA = "LOAD_DATA"

const loadDataAction = (data) => {
    return {
        type: LOAD_DATA,
        payload: data
    }
}

export const loadData = (query) => {
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
    queryData: {}
}

const dataReducer = (state = initState, action) => {
    Object.freeze(state)
    switch (action.type) {
        case LOAD_DATA:
            return {...state, queryData: action.payload}
        default:
            return state
    }
}

export default dataReducer
