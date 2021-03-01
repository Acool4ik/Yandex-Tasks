import {SET_NEW_STATE} from './actions'
import {defaultState} from './defaultState'


export const rootReduser = (state = defaultState, action = {}) => {
    switch(action.type) {
        case SET_NEW_STATE: return {...action.payload}

        default: return {...state}
    }
}