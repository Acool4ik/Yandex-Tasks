import json from '@assets/json/data'
import {render} from './render'
import {store} from '@stateManager/store'
import {setNewStateAction} from '@stateManager/actionsCreators'
import {parseUrlData} from '@routeManager/parseUrlData'


// handler for changing state and as a consequence re-render template
export const triggerRender = () => {
    const {slide} = parseUrlData()
    if(slide === 0) return render()
    store.dispatch(setNewStateAction(json[slide]))
}