const SAVE_CREDENTIALS = "SAVE_CREDENTIALS"


export const saveCredentials = (credentials) => {
    return {
        type: SAVE_CREDENTIALS,
        credentials,
    }
}

const initState = {
    databaseUser: '',
    databasePassword: '', 
    databaseName: '',
    databaseHostname: '', 
    databasePort: '',
}


const credentialsReducer = (state = initState, action) => {
    Object.freeze(state)
    switch (action.type) {
        case SAVE_CREDENTIALS:
            return { ...state, ...action.credentials}
        default:
            return state
    }
}

export default credentialsReducer