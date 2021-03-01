import json from '@assets/json/data'
import {store} from '@stateManager/store'
import {setNewStateAction} from '@stateManager/actionsCreators'
import {parseUrlData} from '@routeManager/parseUrlData'


// auto-render renderTemplate with change hash url, via subscribe(render), path='./render.js'
export const autoRender = () => {
    if ("onhashchange" in window) 
    {
        let prevData = parseUrlData()
    
        window.onhashchange = () => {
            const {slide, isThemeDark} = parseUrlData()
            if(slide !== prevData.slide || isThemeDark !== prevData.isThemeDark)
            {
                // with state change ==> trigger render function
                prevData = {slide, isThemeDark}
                store.dispatch(setNewStateAction(json[slide]))
            }
        }
    }
    else  // case when "onhashchange" absent in winwow
    { 
        let prevData = parseUrlData()
        let storedHash = window.location.hash
    
        window.setInterval(() => {
            if (window.location.hash != storedHash) 
            {
                storedHash = window.location.hash
    
                // the same module change state as above, line: [12; 20]
                const {slide, isThemeDark} = parseUrlData()
                if(slide !== prevData.slide || isThemeDark !== prevData.isThemeDark)
                {
                    // with state change ==> trigger render function
                    prevData = {slide, isThemeDark}
                    store.dispatch(setNewStateAction(json[slide]))
                }
            }
        }, 60)
    }
}

