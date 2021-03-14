// denotes the root element
document.body.id = 'root'

// Cors imports
import './index.css'
import {autoRender} from './handlers/autoRender'
import {triggerRender} from './handlers/triggerRender'

// Castom components
import {Header} from './components/Header/Header'
import {Leaders} from './components/Leaders/Leaders'
import {Chart} from './components/Chart/Chart'
import {Diagram} from './components/Diagram/Diagram'
import {Vote} from './components/Vote/Vote'
import {Activity} from './components/Activity/Activity'
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
    

    return `
    <section class="container">
        ${Header(supplementedState)}

        ${aleas === 'leaders' ? Leaders(supplementedState) : noop()}
        ${aleas === 'vote' ? Vote(supplementedState) : noop()}
        ${aleas === 'chart' ? Chart(supplementedState) : noop()}
        ${aleas === 'diagram' ? Diagram(supplementedState) : noop()}
        ${aleas === 'activity' ? Activity(supplementedState) : noop()}
    </section>
    `
}


// render template with first load
window.addEventListener('DOMContentLoaded', () => triggerRender())

// render template when change size of window or rotate device
window.onresize = () => triggerRender()

// with change URL or change state will be happen re-render template
autoRender()

// add in global scope
window.renderTemplate = renderTemplate







