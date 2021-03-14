import styles from './Chart.module.css'
import {ChartResultItem} from './ChartResultItem/ChartResultItem'
import {PeopleItem} from './PeopleItem/PeopleItem'


export const Chart = (props) => {
    const {users, values, isVertical, isThemeDark} = props
    const {chartResultContainer, chartPeopleContainer, sectionContainer} = styles
    const quantityPeoples = isVertical ? users.length : 2
    const _IDresultElement = 'resultElement'

    let maxValue = 0
    values.forEach(({value}) => (value > maxValue) && (maxValue = value))
    !isVertical && addScrollEventToResultElement(_IDresultElement)

    const generateStylesDependingOnOrientation = () => {
        const isScroll = isVertical ? 'scroll' : 'hidden'
        let dinamicStyles = `
            overflow-y: ${isScroll};
            overflow-x: ${!isScroll};
            display: flex;
            flex-direction: ${isVertical ? 'column' : 'row'};
        `

        if(!isVertical) 
        {
            dinamicStyles += 'justify-content: space-around;'
        }

        return dinamicStyles.replace(/\s\s+/g, "")
    }


    return `
    <section class="${sectionContainer}">
        <div class="${chartResultContainer}" id="${_IDresultElement}">

            ${values
                .map(value => ChartResultItem({...value, maxValue, isVertical, isThemeDark}))
                .join(' ')
            }
            
        </div>
    
        <ul class="${chartPeopleContainer}" style="${generateStylesDependingOnOrientation()}">
            ${users
                .map((user, index) => (index < quantityPeoples) ? PeopleItem({
                    ...user, 
                    isVertical, 
                    isThemeDark,
                    isLast: index === quantityPeoples - 1
                }) : '')
                .join('')
            }
        </ul>
    </section>
    `
}


// below located Private module for the component
function addScrollEventToResultElement(id = '') {
    setTimeout(() => {
        const target = document.getElementById(id)
        if(!target) return;

        target.onwheel = event => target.scrollLeft = event.wheelDelta >= 0 
            ? target.scrollLeft + 15
            : target.scrollLeft - 15
    }, 150)
}