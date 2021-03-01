// Cors imports
import './index.css'
import {autoRender} from './handlers/autoRender'
import {triggerRender} from './handlers/triggerRender'


// Castom components
import {Header} from './components/Header/Header'
import {Leaders} from './components/Leaders/Leaders'
import {noop} from './components/noop'


// main finction, return string template with HTML
export const renderTemplate = (aleas, data) => {
    const isThemeDark = !document.body.classList.contains('theme_light')
    const isVertical = !(window.innerWidth > window.innerHeight)

    const supplementedState = {
        ...data,
        isVertical, 
        isThemeDark
    }

    // console.log('Current alias:_', aleas);
    // console.log('All aliases:_', aliases);
    console.log('All state:_', supplementedState);

    

    return `
    <section class="container">
        ${Header(supplementedState)}

        ${aleas === 'leaders' && Leaders(supplementedState)}
        ${aleas === 'vote' && noop()}
        ${aleas === 'chart' && noop()}
        ${aleas === 'diagram' && noop()}
        ${aleas === 'activity' && noop()}
    </section>
    `
}


// render template with first load
window.addEventListener('DOMContentLoaded', () => triggerRender())

// render template when change size of window or rotate device
window.onresize = () => triggerRender()

// with change URL or change state will be happen re-render template
autoRender()







