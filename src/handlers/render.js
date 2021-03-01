import {store} from '@stateManager/store'
import {parseUrlData} from '@routeManager/parseUrlData'
import {renderTemplate} from '@/index.js'


// helper function, cleans and renews root element, when call the function
export const render = () => {
    const {alias, data} = store.getState()
    const root = document.getElementById('root')
    const {isThemeDark} = parseUrlData()
    document.body.className = isThemeDark ? 'theme_dark' : 'theme_light'

    root.innerHTML = ''
    root.insertAdjacentHTML('afterbegin', renderTemplate(alias, data))
}


// auto-render with change state in store 
store.subscribe(render)