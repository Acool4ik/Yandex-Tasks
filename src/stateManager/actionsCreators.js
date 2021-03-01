import {SET_NEW_STATE} from './actions'

// All actionsCreators of the app
export const setNewStateAction = (payload) => ({
    type: SET_NEW_STATE,
    payload
})