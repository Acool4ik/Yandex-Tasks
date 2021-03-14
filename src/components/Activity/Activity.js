import styles from './Activity.module.css'
import {Slider} from './Slider/Slider'


export const Activity = (props) => {
    const {data, isVertical, isThemeDark} = props
    const {container, heatMapHorisontal, heatMapVertical} = styles
 
    const dinamicStylesContainer = () => {
        let padding = 58
        const defaultPadding = 24
        
        if(isVertical && window.innerWidth <= 450) padding = defaultPadding 
        if(isVertical && window.innerWidth <= 350) padding = defaultPadding / 2 

        if(!isVertical && window.innerWidth < 850) padding = defaultPadding
        if(!isVertical && window.innerWidth < 600) padding = defaultPadding / 2
        
        if(window.innerWidth > 1000) padding = defaultPadding + 0.03 * window.innerWidth


        return `padding-bottom: ${padding}px`
    }


    return `
    <section class="${container}" style="${dinamicStylesContainer()}"> 
        <div class="${isVertical ? heatMapVertical : heatMapHorisontal}" >
            test heat map 
        </div>

        ${Slider({isThemeDark, isVertical})}
    </section>
    `
}