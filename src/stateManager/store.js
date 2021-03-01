import {rootReduser} from './rootReduser'
import {SET_NEW_STATE} from './actions'
import {defaultState} from './defaultState'


// castom state manager 
const createStore = () => {
    let state = rootReduser(defaultState, {type: SET_NEW_STATE, payload: defaultState})
    let subscribers = []

    return {
        dispatch(action) {
            state = rootReduser(state, action)
            subscribers.forEach(callback => callback())
        },

        subscribe(callback) {
            subscribers.push(callback)
        },

        getState() {
            return state
        }
    }
}


export const store = createStore()